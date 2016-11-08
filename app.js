'use strict'

var Koa = require('koa')
var path = require('path')
var util = require('./libs/util.js')
var wechat = require('./wechat/g')
var wechat_file = path.join(__dirname, './config/wechat.txt')
var config = {
    wechat: {
        appID:'wx759d4dbd14c0b3b1',
        appsecret:'507c2940c22f333612174febb76c16ec',
        token:'rebornchris',
        getAccessToken: function(){
            return util.readFileAsync(wechat_file)
        },
        saveAcessToken: function(data){
            data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file, data)
        }
    }
}

var app = new Koa();

app.use(wechat(config.wechat))

app.listen(1234)

console.log('Listening 1234')
