module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(axios)/)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};
