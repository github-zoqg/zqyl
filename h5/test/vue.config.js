module.exports =  {
    lintOnSave: false,
    devServer:{
        port: 80,
        proxy:{
            "/cgi-bin":{
                target:"https://api.weixin.qq.com"
            },
        }
    }
}