const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports={
    lintOnSave:false,
    devServer:{
        open:true,
        proxy:'http://localhost:4000' 
        //     配代理。如果你的前端应用和后端 API 服务器没有运行在同一个主机上，
        //     你需要在开发环境下将 API 请求代理到 API 服务器。
        //     这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
        //     devServer.proxy 可以是一个指向开发环境 API 服务器的字符串：
    },
    configureWebpack:{
        resolve: {
            alias: {
                'components': resolve('src/components'),
                'pages': resolve('src/pages')
            }
        }
    }
}