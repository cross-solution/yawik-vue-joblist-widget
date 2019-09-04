const Webpack = require('webpack')

module.exports = {
    css: {
        extract: {
            filename: "[name].css"
        }
    },
    productionSourceMap: false,
    filenameHashing: false,
    configureWebpack: {
        plugins: [
            new Webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            })
        ],
        output: {
            filename: "[name].js",
            // // see: https://github.com/vuejs/vue-cli/issues/2443#issuecomment-419158280
            // filename: () => (process.env.VUE_CLI_MODERN_MODE && !process.env.VUE_CLI_MODERN_BUILD) ? 'yawik-job-list-traditional.js' : 'yawik-job-list.js'
        }
    },
    pages: {
        "yawik-job-list": {
            entry: "src/main.js",
            filename: "index.html"
        }
    },
    chainWebpack:
        config => {
            config.optimization.delete('splitChunks')
            config
                .delete("html")
                .delete("prefetch")
                .delete("preload");
        }
}