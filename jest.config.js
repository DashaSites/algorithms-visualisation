module.exports = {
  preset: 'ts-jest',
  "moduleNameMapper": {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  },
  "transform": {
    "^.+\\.svg$": "<rootDir>/svgTransform.js",
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
 },
 "testEnvironment": "jsdom"
}