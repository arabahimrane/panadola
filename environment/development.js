const path = require("path");

module.exports = {
  dbUrl: "mongodb+srv://arabahimran:78a5zz4ea1ddea@cluster0.gtsbyta.mongodb.net/panadolaDevelopment?retryWrites=true&w=majority",
  cert: path.join(__dirname, "../ssl/local.crt"),
  key: path.join(__dirname, "../ssl/local.key"),
  portHttp: 80,
  portHttps: 443,
};
