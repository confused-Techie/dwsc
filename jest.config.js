module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: ["text"],
  coveragePathIgnorePatterns: [
    "<rootDir>/test/*"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/test/helpers/expect_extension.js"
  ],
  testMatch: [
    "<rootDir>/test/*.test.js"
  ]
};
