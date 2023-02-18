import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: ['json', 'default'],
    outputFile: './test_results/test-results.json',
    setupFiles: ['./src/setup-tests.ts']
  }
});