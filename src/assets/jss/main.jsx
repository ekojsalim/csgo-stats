const containerFluid = {
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  width: "100%"
};
const container = {
"@media (min-width: 320px)": {
    maxWidth: "540px",
    padding: "0 !important",
    },
  "@media (min-width: 576px)": {
    maxWidth: "540px",
    padding: "0 !important",
  },
  "@media (min-width: 768px)": {
    maxWidth: "720px"
  },
  "@media (min-width: 992px)": {
    maxWidth: "960px"
  },
  "@media (min-width: 1200px)": {
    maxWidth: "1140px"
  },
  ...containerFluid,
};

export { container };
