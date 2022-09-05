/* config-overrides.js */
const webpack = require('webpack'); 

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    const fallback = config.resolve.fallback || {}; 
    Object.assign(fallback, { 
        os: require.resolve('os-browserify/browser'),
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
        stream: require.resolve('stream-browserify')
    })
    config.resolve.fallback = fallback; 
    config.plugins = (config.plugins || []).concat([ 
        new webpack.ProvidePlugin({ 
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser'
        }) 
    ]) 
    return config;
}
