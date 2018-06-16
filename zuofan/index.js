/* 
* 如果需要使用监控统计功能，请将PUBLIC KEY 复制到DuerOS DBP平台
* 文档参考：https://dueros.baidu.com/didp/doc/dueros-bot-platform/dbp-deploy/authentication_markdown
	
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDVPdiMEqV33JKKdEC4zD6EzSuF
TwfoL/1XGq+QNygEDF2ZM9J43TdzsISU2Jl8IPDwvBT1Lm5EZQMQBxG32TKQY+uV
VFqHtrdqKASk4W/rOXiq/T1zlzSuZXd7zPj5/xIDXpGat49c1nF98NWtpcwmwKSt
SqxcBypJ7fdXPZVjrQIDAQAB
-----END PUBLIC KEY-----

*/
const ZuofanBot = require("./app/ZuofanBot.js").ZuofanBot
const Bot = require('bot-sdk');
const privateKey = require("./rsaKeys.js").privateKey;

const express = require('express');

// const Bot = require('./Bot');
var app = express();

// 探活请求
// DuerOS会定期发送探活请求到你的服务，确保你的服务正常运转，[详情请参考](http://TODO)
app.head('/', (req, res) => {
    res.sendStatus(204);
});

// 监听post请求，DuerOS以http POST的方式来请求你的服务，[具体协议请参考](http://TODO)
app.post('/', (req, res) => {
    req.rawBody = '';

    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
        req.rawBody += chunk;
    });

    req.on('end', function() {
        var b = new ZuofanBot(JSON.parse(req.rawBody));
        // 开启签名认证
        // 为了避免你的服务被非法请求，建议你验证请求是否来自于DuerOS
        // b.initCertificate(req.headers, req.rawBody).enableVerifyRequestSign();
        // 不需要监控
        // b.run() 返回一个Promise的实例
        b.run().then(function(result){
            res.send(result);
        });
    });

        
}).listen(8014);
console.log("listen:" + 8014);
// exports.handler = function(event, context, callback) {
//     try {
//         // let b = new InquiryBot(event);
//         let b = new ZuofanBot(event);
//         // 0: debug  1: online
//         b.botMonitor.setEnvironmentInfo(privateKey, 0);
//         b.run().then(function(result) {
//             callback(null, result);
//         }).catch(callback);
//     } catch (e) {
//         callback(e);
//     }
// }
