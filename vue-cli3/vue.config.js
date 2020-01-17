if (process.env.NODE_ENV == "development") {
    // development
    module.exports = {
        devServer: {
            proxy: {
                "/app/mock/32": {
                    target: "http://rap.corp.yljr.com:8076"
                }
            }
        }
    }
} else {
    // production
    module.exports = {
        publicPath: "/"
    }


}