module.exports = {
  verbose: true,
  testEnvironment: 'node', 
  rootDir: '../',
  testMatch: ['<rootDir>/test/**/*.test.js'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: true,
  coverageDirectory: '../coverage',
  coverageReporters: ['text', 'lcov'], 
};
