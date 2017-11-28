const configFile = require("./config.json");

module.exports = key => {
  const env = process.env.NODE_ENV || "development";
  const cfg = configFile[env];
  const val = cfg[key];

  if (!val) {
    throw Error(`Key ${key} not found in ${env} environment configuration!`);
  }

  return val;
};
