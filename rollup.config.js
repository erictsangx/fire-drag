export default [
  {
    input: 'src/extension/content.js',
    output: {
      file: 'public/rollup/content_scripts.js',
      format: 'es',
    },
  },
  {
    input: 'src/extension/background.js',
    output: {
      file: 'public/rollup/background_scripts.js',
      format: 'es',
    },
  },
]