'use strict'

var config = require('./config')
var Wechat = require('./wechat/wechat')
var path = require('path')
var wechatApi = new Wechat(config.wechat)

exports.reply = function* (next){
    var message = this.weixin

    if(message.MsgType ==='event'){
        if(message.Event === 'subscribe'){
            if(message.EventKey){
                console.log('扫二维码进来: ' + message.EventKey + '' +message.ticket)
            }

            this.body = '感谢你关注RebornChris'
            console.log('感谢关注')
        }
        else if(message.Event === 'unsubscribe'){
            console.log('无情取关')
        }
    }
    else if(message.MsgType === 'voice'){
        this.body = '声音很酷'
    }
    else if(message.MsgType === 'image'){
        this.body = '图片很帅'
    }
    else if(message.MsgType === 'text'){
        var content = message.Content
        var reply = '额，你说的 ' + message.Content + ' 太复杂了'

        if(content === '林肖阳'){
            reply = '北理狙击求虐'
        }
        if(content === '李萱娅'){
            var data = yield(wechatApi.uploadMaterial('image',path.join(__dirname, './2.jpg')))
             reply = {
                type: 'image',
                mediaId: data.media_id

            }


        }
        if(content === '我爱你'){
            reply = 'http://rebornchris.coding.me/lixuanya'
        }
        if(content === '晚安'){
            reply = [{
                title: '晚安我的宝宝',
                description: '就只是一个简单的图片啦',
                picUrl: 'https://ooo.0o0.ooo/2016/11/08/5821ddce4f236.jpg',
                url: 'http://rebornchris.coding.me/lixuanya'
            }]
        }

        this.body = reply
    }
    else if(message.MsgType === 'location'){
        this.body = '你当前的经度为' + message.Location_Y + '\n纬度为' + message.Location_X
    }
    else if(message.MsgType === 'click'){
        this.body = '您点击了菜单:' +message.EventKey
    }
    else if(message.Event === 'scan'){
        console.log('关注后扫二维码' + message.EventKey + ' ' + message.ticket )
        this.body = '看到你扫了一下哦'
    }
    else if (message.Event === 'view'){
        this.body = '您点击了菜单里的链接: ' + message.EventKey
    }

    yield next
}
