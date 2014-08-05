module.exports = {
  files: [
    'src/**/*.js'
  ],

  preprocessors: {
    '**/src/**/*.js': ['commonjs']
  },

  browsers: ['PhantomJS']
};