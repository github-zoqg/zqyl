if (process.env.NODE_ENV == "development") {
    // development
    module.exports = {
        publicPath: "/",
        devServer: {
            proxy: {
                "/": {
                    target: "/"
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