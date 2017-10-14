const AUTOPREFIXER_BROWSERS = [
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'Opera >= 12',
  'Safari >= 4.1',
];

module.exports = {
  plugins: [
    require('autoprefixer')({broswers: AUTOPREFIXER_BROWSERS})
  ]
}
