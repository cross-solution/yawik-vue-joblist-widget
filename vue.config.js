const Webpack = require('webpack')

module.exports = {
    css: {
        extract: false
    },
    configureWebpack: {
        plugins: [
            new Webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            })
        ],
        output: {
            // see: https://github.com/vuejs/vue-cli/issues/2443#issuecomment-419158280
            filename: () => (process.env.VUE_CLI_MODERN_MODE && !process.env.VUE_CLI_MODERN_BUILD) ? 'yawik-job-list-traditional.js' : 'yawik-job-list.js'
        }
    },
    chainWebpack:
        config => {
            config.optimization.delete('splitChunks')
        }
}