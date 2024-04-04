module.exports = {
  preset: 'ts-jest',
  testTimeout: 90000,
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