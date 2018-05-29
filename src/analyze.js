// Analyze the data given
import moment from "moment";

// process the data first
// namely the date
function proccessData(data) {
    data.matches = data.matches.map((match)=> {
        // 2018-05-26 10:30:44 GMT
        // moment doesnt know what GMT represents
        match.time = moment(match.time.split(" ").slice(0,-1).join(" "));
    });
}

// get user data(kills, deaths, etc) given the steamID
function getUserData(userID, data) {
    function inTeam(team, id) {
        return team.players.filter((a) => a.steamID === id).length > 0;
    }
    function playerTeam(match) {
        if(inTeam(match.teams.team1, userID)) return "team1";
        if(inTeam(match.teams.team2, userID)) return "team2";
        return;
    }
    return data.matches.filter(playerTeam).map((match)=> {
        return match.teams[playerTeam(match)].players.filter((player) => player.steamID === userID)[0];
    });

}

function getStats(data) {

}

function rating(kills, deaths) {
    // http://sixteenzero.net/blog/2017/09/20/exploring-problems-counter-strike-rating-systems/
    // they approximated using regression
    // should be good enough
    // close to rating 2.0, Correlation Coefficient88%
    // we are limited because we have limited data
    // so the eq
    // rating 2.0 approx = 1.038115 + 0.457674*K -0.442967*d
    return 1.038115 + 0.0457674 * kills -0.0442967 * deaths;
}

