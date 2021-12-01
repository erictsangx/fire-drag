export default [
  {
    input: 'public/content_scripts/injected.js',
    output: {
      file: 'public/rollup/content_scripts.js',
      format: 'es',
    },
  },
  {
    input: 'public/background_scripts/background.js',
    output: {
      file: 'public/rollup/background_scripts.js',
      format: 'es',
    },
  },
]