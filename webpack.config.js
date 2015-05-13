module.exports = {
  output: {
    filename: 'bundle.js'
  },
  devtool: 'source-map',

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.styl$/, loader: 'style!css!stylus' }
    ]
  }
};
