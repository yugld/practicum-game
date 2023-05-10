import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  setupFiles: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|jpg|svg|png)$': 'identity-obj-proxy',
  },
}
