var path = require('path')
var webpack = require('webpack')
var config = require('./config')

const url = config.client.replace(/\/+$/, "");
const port = config.clientPort;

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/client'
  ],
  output: {
    path: path.join(__dirname, '/static/dist/'),
    filename: 'bundle.js',
    publicPath: '/static/dist/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
  	new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  	new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings:false
      }
    })
  ],
  module: {
    loaders: [
	{ 
      test: /\.jsx?$/, 
      exclude: /(node_modules|bower_components)/, 
      loader: 'babel',
      query: {
      	presets: ['es2015', 'react', 'stage-0'],
      	plugins: ['transform-runtime']
      }
    },
	{ 
      test: /\.css$/, 
      loader: "style-loader!css-loader"
    },
	{ 
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
      loader: "file" 
    },
	{ 
      test: /\.(woff|woff2)$/, 
      loader:"url?prefix=font/&limit=5000" 
    },
	{ 
      test: /\.(png|jpg|jpeg|gif|ico)$/, 
      loader: 'file?name=images/[name].[hash].[ext]' 
    },
	{ 
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
      loader: "url?limit=10000&mimetype=application/octet-stream" 
    },
	{ 
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
      loader: "url?limit=10000&mimetype=image/svg+xml" 
    },
    {
      test: /\.(mp4|webm)$/,
      loader: "url?limit=10000"
    },    
	{ 
      test: /\.json$/, 
      loader: "json-loader"
    }
	]}
};
