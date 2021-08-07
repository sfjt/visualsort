const path = require("path");

module.exports = {
  "roots": [
    path.resolve(__dirname, "./src")
  ],
  "testMatch": [
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}