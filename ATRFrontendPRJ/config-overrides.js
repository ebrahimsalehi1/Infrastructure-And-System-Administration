const {useBabelRc, override} = require('customize-cra');
// const rewireUglifyjs = require('react-app-rewire-uglifyjs');

module.exports = override(
    useBabelRc()
);