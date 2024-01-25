module.exports = {
  preset: "jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/__test__/**/*.test.js"],
  coveragePathIgnorePatterns: ["<rootDir>/src/__test__/*.test.js"],
  verbose: false,
};
