const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
        lintOnSave: false,
        devServer: {
            open: true,
            proxy: {
                //     配代理。如果你的前端应用和后端 API 服务器没有运行在同一个主机上，
                //     你需要在开发环境下将 API 请求代理到 API 服务器。
                //     这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
                //     devServer.proxy 可以是一个指向开发环境 API 服务器的字符串：
                '/4000': {
                    target: 'http://localhost:4000', //目地址 target host
                    //ws: true,//不涉及websoki请求
                    changeOrigin: true, // needed for virtual hosted sites
                    //需要重写路径
                    pathRewrite: {
                        '^/4000': '', // rewrite path,值为空，就不会影响到别的匹配：
                    }
                }
            }
        },
            configureWebpack: {
                resolve: {
                    alias: {
                        'components': resolve('src/components'),
                        'pages': resolve('src/pages')
                    }
                }
            }
        }