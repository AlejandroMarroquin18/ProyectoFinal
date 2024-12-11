/**
 * @file jest.config.js
 * @description Configuración de Jest para realizar pruebas en el proyecto.
 * @see https://jestjs.io/docs/configuration Documentación oficial de configuración de Jest.
 */

module.exports = {
  verbose: true,
  testEnvironment: 'node',
  rootDir: '../',
  testMatch: ['<rootDir>/modules/tests/*.test.js'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};