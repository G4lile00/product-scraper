/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
	setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  setupFilesAfterEnv: ['<rootDir>/test/unit/mocker.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
    }
};
