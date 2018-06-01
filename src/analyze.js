// Analyze the data given
import moment from "moment";

let API_KEY = "";

const analyzedData = {
  user: {
    name: "",
    id: "",
    average: {
      kills: 0,
      deaths: 0,
      assists: 0,
      rating: 0
    },
    total: {
      kills: 0,
      deaths: 0,
      assists: 0
    }
  },
  matches: [],
  bannedPlayers: []
};

// Bans
let playersBans = [];

function populatePlayers(data) {
  data.matches.forEach(match => {
    const playersTeam1 = match.teams.team1.players.map(
      player => player.steamID
    );
    const playersTeam2 = match.teams.team2.players.map(
      player => player.steamID
    );
    playersBans = [
      ...new Set([...playersBans, ...playersTeam1, ...playersTeam2])
    ];
  });
}

function chunk(arr, chunkSize) {
  let R = [];
  for (let i = 0, len = arr.length; i < len; i += chunkSize)
    R.push(arr.slice(i, i + chunkSize));
  return R;
}

async function getBans(players) {
  const chunked = chunk(players, 90)
    .map(chunk => {
      return chunk.join(",");
    })
    .map(async stringPlayers => {
      return (await (await fetch(
        `https://csgo-cors.herokuapp.com/https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${API_KEY}&steamids=${stringPlayers}`
      )).json()).players;
    });
  return [].concat(...(await Promise.all(chunked)));
}

function _capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Stats
// process the data
function proccessData(data) {
  return data.matches.map(match => {
    // 2018-05-26 10:30:44 GMT
    // moment doesnt know what GMT represents
    match.time = moment(
      match.time
        .split(" ")
        .slice(0, -1)
        .join(" ")
    );
    function getDuration(str) {
      return moment.duration(`00:${str}`);
    }
    match.duration = getDuration(match.duration);
    match.waitTime = getDuration(match.waitTime);
    // mark Banned players
    match.teams.team1.players = match.teams.team1.players.map(markPlayersBans(match));
    match.teams.team2.players = match.teams.team2.players.map(markPlayersBans(match));
    // tags the match
    // win/loss/draw
    // the map
    // has cheater
    match.chips = [];
    if (match.replayLink) match.chips.push("Has Replay");
    const hasCheater =
      match.teams.team1.players.filter(a => a.bans.isBanned).length > 0 ||
      match.teams.team2.players.filter(a => a.bans.isBanned).length > 0;
    if (hasCheater) match.chips.push("Has Banned Players");
    match.chips.push(match.map.split(" ")[1], _capFirstLetter(match.result));
    // player names
    const playerNames = [
      ...match.teams.team1.players.map(a => a.name),
      ...match.teams.team2.players.map(a => a.name)
    ];
    match.tags = [
      match.result,
      match.map.split(" ")[1],
      ...playerNames,
      hasCheater ? "hasBanned" : "noBanned"
    ].map(a => a.toLowerCase());
    return match;
  });
}

function getMatchMapStatistics(data) {
  let matchData = {
    totalWins: 0,
    totalLosses: 0,
    totalDraws: 0,
    winStreaks: 0,
    lossStreaks: 0,
    longestMatch: data.matches[0].duration,
    shortestMatch: data.matches[0].duration,
    totalMatch: 0
  };
  let mapData = {
    // inferno: {
    //     win: 0,
    //     loss: 0,
    //     draw: 0,
    //     winRate: 0,
    //     played: 0
    // }
  };
  let winStreak = 0;
  let lossStreak = 0;
  data.matches.forEach(match => {
    const map = match.map.split(" ")[1];
    matchData.totalMatch++;
    if (!mapData[map])
      mapData[map] = { win: 0, loss: 0, draw: 0, winRate: 0, played: 0 };
    mapData[map].played++;
    mapData[map][match.result.toLowerCase()]++;
    if (match.result.toLowerCase() === "win") {
      matchData.totalWins++;
      lossStreak = 0;
      winStreak++;
    }
    if (match.result.toLowerCase() === "loss") {
      matchData.totalLosses++;
      winStreak = 0;
      lossStreak++;
    }
    if (
      match.duration.asMilliseconds() < matchData.shortestMatch.asMilliseconds()
    )
      matchData.shortestMatch = match.duration;
    if (
      match.duration.asMilliseconds() > matchData.longestMatch.asMilliseconds()
    )
      matchData.longestMatch = match.duration;
    if (match.result.toLowerCase() === "draw") matchData.totalDraws++;
    if (winStreak > matchData.winStreaks) matchData.winStreaks = winStreak;
    if (lossStreak > matchData.lossStreaks) matchData.lossStreaks = lossStreak;
  });   
  Object.entries(mapData).forEach(([key, value]) => {
    mapData[key].winRate = Math.round(value.win / value.played * 100);
  });
  return { matchData, mapData };
}

function markPlayersBans(match) {
  return function(player) {
    const z = analyzedData.banInfo.find(ban => ban.SteamId === player.steamID) || {};
    const isBanned = Object.keys(z).length > 0;
    const banTypes = [];
    console.log(z);
    if (z.CommunityBanned) banTypes.push("Community");
    if (z.VACBanned) banTypes.push("VAC");
    if (z.NumberOfGameBans) banTypes.push("Overwatch");
    const dateBanned = isBanned
      ? moment().subtract(z.DaysSinceLastBan, "days")
      : 0;
      const isReallyBanned = isBanned && dateBanned.isAfter(match.time);
    if (
      isReallyBanned &&
      analyzedData.bannedPlayers.filter(a => a.id === player.steamID).length <=
        0
    ) {
      analyzedData.bannedPlayers.push({
        id: player.steamID,
        name: player.name
      });
    }
    return {
      ...player,
      isMain: player.steamID === analyzedData.user.id,
      bans: {
        isBanned: isReallyBanned,
        banTypes,
        dateBanned
      }
    };
  };
}

// get user data(kills, deaths, etc) given the steamID
function getUserData(userID, data) {
  function inTeam(team, id) {
    return team.players.filter(a => a.steamID === id).length > 0;
  }
  function playerTeam(match) {
    if (inTeam(match.teams.team1, userID)) return "team1";
    if (inTeam(match.teams.team2, userID)) return "team2";
    return;
  }
  return data.matches.map(match => {
    const z = match.teams[playerTeam(match)].players.filter(
      player => player.steamID === userID
    )[0];
    return { ...z, matchID: match.id };
  });
}

function getBanStats() {
  const z = analyzedData.matches.filter((match)=> match.tags.includes("hasbanned"));
  // winrate vs cheater
  let withCheater = {
    matches: 0,
    wins: 0,
  };
  let againstCheater = {
    matches: 0,
    wins: 0,
  };
  console.log(z);
  z.forEach((match)=> {
    function inTeam(team, id) {
      return team.players.filter(a => a.steamID === id).length > 0;
    }
    function playerTeam(match, id) {
      if (inTeam(match.teams.team1, id)) return "team1";
      if (inTeam(match.teams.team2, id)) return "team2";
      return;
    }
    const inWhichTeam = playerTeam(match, analyzedData.user.id);
    const opposingTeam = inWhichTeam === "team1" ? "team2" : "team1";
    const playWithCheater = match.teams[inWhichTeam].players.find((player)=> player.bans.isBanned);
    const playAgainstCheater = match.teams[opposingTeam].players.find((player)=> player.bans.isBanned);
    if(playWithCheater) {
      if(match.result.toLowerCase() === "win") withCheater.wins++;
      withCheater.matches++;
    }
    if(playAgainstCheater) {
      if(match.result.toLowerCase() === "win") againstCheater.wins++;
      againstCheater.matches++;
    }
  });
  // winrate with cheater
  // match with cheaters
  const numMatchWithCheaters = z.length;
  // number of cheaters encountered
  const cheaterEncountered = analyzedData.banInfo.length;
  return {
    withCheater,
    againstCheater,
    numMatchWithCheaters,
    cheaterEncountered
  };
}

function getMainUserStats(data) {
  const stats = {
    killsArr: [],
    deathsArr: [],
    assistsArr: [],
    mvpsArr: [],
    ratingArr: [],
    matches: []
  };
  const z = getUserData(data.userSteamID, data);
  z.forEach(userMatch => {
    const {
      kills,
      deaths,
      assists,
      mvps,
      ping,
      hsp,
      matchID,
      score
    } = userMatch;
    stats.killsArr.push(kills);
    stats.deathsArr.push(deaths);
    stats.assistsArr.push(assists);
    stats.mvpsArr.push(mvps);
    stats.ratingArr.push(getRating(kills, deaths));
    stats.matches.push({
      matchID,
      hsp,
      ping,
      score,
      rating: _round(getRating(kills, deaths), 2)
    });
  });
  analyzedData.user = {
    name: data.username,
    id: data.userSteamID,
    average: {
      kills: _avg(stats.killsArr),
      deaths: _avg(stats.deathsArr),
      assists: _avg(stats.assistsArr),
      rating: _avg(stats.ratingArr)
    },
    total: {
      kills: _sum(stats.killsArr),
      deaths: _sum(stats.deathsArr),
      assists: _sum(stats.assistsArr),
      mvps: _sum(stats.mvpsArr)
    },
    matches: stats.matches
  };
}

function getRating(kills, deaths) {
  // http://sixteenzero.net/blog/2017/09/20/exploring-problems-counter-strike-rating-systems/
  // they approximated using regression
  // should be good enough
  // close to rating 2.0, Correlation Coefficient88%
  // we are limited because we have limited data
  // so the eq
  // rating 2.0 approx = 1.038115 + 0.457674*K -0.442967*d
  return 1.038115 + 0.0457674 * kills - 0.0442967 * deaths;
}

function _sum(arr) {
  return arr.reduce((a, b) => a + b);
}

function _avg(arr) {
  return _round(_sum(arr) / arr.length, 2);
}

function _round(number, precision) {
  let shift = function(number, exponent) {
    let numArray = ("" + number).split("e");
    return +(
      numArray[0] +
      "e" +
      (numArray[1] ? +numArray[1] + exponent : exponent)
    );
  };
  return shift(Math.round(shift(number, +precision)), -precision);
}

async function analyze(data, key = "47F320969C176F6D60013C76B8D23ED7") {
  API_KEY = key;
  analyzedData.user.id = data.userSteamID;
  populatePlayers(data);
  playersBans = (await getBans(playersBans)).filter(ban => {
    return ban.CommunityBanned || ban.VACBanned || ban.NumberOfGameBans;
  });
  analyzedData.banInfo = playersBans;
  analyzedData.matches = proccessData(data);
  getMainUserStats(data);
  const { mapData, matchData } = getMatchMapStatistics(data);
  analyzedData.mapData = mapData;
  analyzedData.matchData = matchData;
  analyzedData.banStats = getBanStats();
  return analyzedData;
}

export default analyze;

// 1.15 - Rain
// 1.00 - Karrigan
// 1.26 - Niko
// 1.24 - Device
// 1.39 - S1mple
// 1.17 - Magisk
// 1.06 - gla1ve
// 1.14 - flamie
// 1.23 - electronic
// 1.08 - flusha
// 0.96 - Golden
// 1.16 - tarik
// 1.18 - autimatic
// 1.10 - Stewie2k
// 1.28 - coldzera
// 1.20 - Fallen

// kills - Number($$("div.stats-row > span")[1].outerText)
// deaths - Number($$("div.stats-row > span")[5].outerText)
// maps - Number($$("div.stats-row > span")[13].outerText)
