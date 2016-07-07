import webpack from 'webpack';
import config from '../config';
import webpackConfig from '../webpack.config';
import WebpackDevServer from 'webpack-dev-server';

const port = config.clientPort;
const url = config.client.replace(/.*?:\/\//g, "");


new WebpackDevServer(webpack(webpackConfig), {
	
	publicPath: webpackConfig.output.publicPath,
	hot: true,
	historyApiFallback: true
	
}).listen(port, url, function (err, result) {
	
	if (err) {
		
		return console.log(err);
		
	}
	
	console.log('Client listening at '+url+':'+port);
	
});

