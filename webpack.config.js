import path from 'path';
import webpack from 'webpack';
import config from './config';

const url = config.client.replace(/\/+$/, "");
const port = config.clientPort;

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?'+url+':'+port,
    'webpack/hot/only-dev-server',
    './src/client'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: url+':'+port+'/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
		{ 
      test: /\.jsx?$/, 
      exclude: /(node_modules|bower_components)/, 
      loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0,plugins[]=transform-runtime']
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
