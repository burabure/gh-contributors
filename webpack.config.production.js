var path = require('path');

module.exports = {
    entry: [
      './src/index.jsx'
    ],
    output: {
      path      : path.join(__dirname, 'build'),
      filename  : 'bundle.js',
      publicPath: '/'
    },
    module: {
        loaders: [
            {
              test   : /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loaders: ['react-hot', 'babel']
            }
        ]
    }
};
