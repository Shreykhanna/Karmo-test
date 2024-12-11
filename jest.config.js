module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest', // Ensure ts-jest handles both JS/TS files
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // Handle all file types
  preset: 'ts-jest/presets/default', // If you're using TypeScript
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'], // Treat these extensions as ESM
};
