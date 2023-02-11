import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: ['json', 'default'],
    outputFile: './testResult/test-results.json',
    setupFiles: ['./src/setupTests.ts']
  }
});