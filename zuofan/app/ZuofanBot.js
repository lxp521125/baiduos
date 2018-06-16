

const Bot = require('bot-sdk');

class ZuofanBot extends Bot {
    constructor(postData) {
        super(postData);

        this.addLaunchHandler(() => {
            this.waitAnswer();
            let card = new Bot.Card.TextCard('你想做哪种美味呢，目前我会西红柿炒鸡蛋，来试试吧!');
            return {
                card: card,
                outputSpeech: '你想做哪种美味呢，目前我会西红柿炒鸡蛋，来试试吧!'
            };
        });
        this.addSessionEndedHandler(() => {
            this.endSession();
            let card = new Bot.Card.TextCard('看来你学会了，划重点：做饭要有爱，做啥都是美味！');
            return {
                card: card,
                outputSpeech: '看来你学会了，划重点：做饭要有爱，做啥都是美味！'
            };
        });
        this.addIntentHandler('choose', () => {
            let card = new Bot.Card.TextCard('西红柿炒鸡蛋');
                // 可以返回异步 Promise
            return Promise.resolve({
                card: card,
                outputSpeech: '西红柿炒鸡蛋'
            });
        });
        this.addIntentHandler('over', () => {
            this.endSession();
            let card = new Bot.Card.TextCard('看来你学会了，划重点：做饭要有爱，做啥都是美味！');
            return {
                card: card,
                outputSpeech: '看来你学会了，划重点：做饭要有爱，做啥都是美味！'
            };
        });
        this.addIntentHandler('leftright', () => {
            this.waitAnswer();            
            let locNum = this.getSlot('sys.number');
            let userDirection = this.getSlot('user_direction');
            if (!locNum) {
                locNum = 1;
            }else{
                locNum = parseInt(locNum)
            }            
            let pageIndex = this.getSessionAttribute("pageIndex", 0);
            pageIndex = parseInt(pageIndex)
            if (userDirection.indexOf("左") > -1 || userDirection.indexOf("上") > -1) {
                pageIndex -= locNum;
            }else{
                pageIndex += locNum;
            }
            if (pageIndex > 7) {
                pageIndex = 7
            }
            if (pageIndex < 0) {
                pageIndex = 0
            }
            this.setSessionAttribute('pageIndex', pageIndex);
            let page = [
                {type:'BodyTemplate1', token:'1',backgroundImage:{"url": 'http://dbp-resource.gz.bcebos.com/9838ae4c-39a7-cddf-fe90-0bcf81f3cfaa/ea885ab6873e11e6a9a10242ac110002_600w_398h.jpg?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2018-06-16T05%3A59%3A10Z%2F-1%2F%2F767d1dc792f39d996774126aa1fb74b4088e44b8937f0cec5c853393d552a221'}, title:'西红柿炒鸡蛋', textContent:{'position':'CENTER',text:'原料准备：番茄，鸡蛋，葱花，盐'}},
                {type:'BodyTemplate1', token:'2',backgroundImage:{"url": 'http://dbp-resource.gz.bcebos.com/9838ae4c-39a7-cddf-fe90-0bcf81f3cfaa/c39afcb595e911e5b2c5c7238edfbf2b.jpg?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2018-06-16T05%3A59%3A07Z%2F-1%2F%2Fd2542176a659a31d0afb13759ef44ce13fa9ee2e00fd3c0783f6d1c9223e1792'}, title:'西红柿炒鸡蛋', textContent:{'position':'CENTER',text:'1. 鸡蛋加盐打匀,番茄切块'}},
                {type:'BodyTemplate1', token:'3',backgroundImage:{"url": 'http://dbp-resource.gz.bcebos.com/9838ae4c-39a7-cddf-fe90-0bcf81f3cfaa/d219e4b8874d11e6b87c0242ac110003_800w_533h.jpg?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2018-06-16T05%3A59%3A07Z%2F-1%2F%2F043c41e65f5122f1207bb005288250edb50a0dcbef21e243bff864f622a14cdf'}, title:'西红柿炒鸡蛋', textContent:{'position':'CENTER',text:'2. 锅内放适量油,待油热,倒入鸡蛋液,翻炒成块'}},
                {type:'BodyTemplate1', token:'4',backgroundImage:{"url": 'http://dbp-resource.gz.bcebos.com/9838ae4c-39a7-cddf-fe90-0bcf81f3cfaa/c6da92175e944d1c90a2ef5a3f0391e4_1280w_959h.jpg?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2018-06-16T05%3A59%3A07Z%2F-1%2F%2F9ca53036668336a03026d53b9b419f8059a8f48911534418872161872cd42643'}, title:'西红柿炒鸡蛋', textContent:{'position':'CENTER',text:'3. 盛出鸡蛋,备用'}},
                {type:'BodyTemplate1', token:'5',backgroundImage:{"url": 'http://dbp-resource.gz.bcebos.com/9838ae4c-39a7-cddf-fe90-0bcf81f3cfaa/101403a8873911e6a9a10242ac110002_600w_450h.jpg?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2018-06-16T05%3A59%3A04Z%2F-1%2F%2F0d915af3392e833b64caefd3be729ed4ac54bd6f8a089541fd393c347d8cbe61'}, title:'西红柿炒鸡蛋', textContent:{'position':'CENTER',text:'4. 锅内加油,油热,倒入番茄,加盐翻炒'}},
                {type:'BodyTemplate1', token:'6',backgroundImage:{"url": 'http://dbp-resource.gz.bcebos.com/9838ae4c-39a7-cddf-fe90-0bcf81f3cfaa/7448cd6d3f4c4af0be0a0f332ad06e09_1080w_1080h.jpg?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2018-06-16T05%3A59%3A04Z%2F-1%2F%2F53fc8c402bef926fbf6570f07ac45bf45829f7e76384d8c9045c640954566946'}, title:'西红柿炒鸡蛋', textContent:{'position':'CENTER',text:'5. 加入炒好的鸡蛋,翻炒均匀即可'}},
                {type:'BodyTemplate1', token:'7',backgroundImage:{"url": 'http://dbp-resource.gz.bcebos.com/9838ae4c-39a7-cddf-fe90-0bcf81f3cfaa/c6ad56e6a52b11e5a23867cf2b13e9bf.jpg?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2018-06-16T05%3A59%3A04Z%2F-1%2F%2F006050712da6c5731650b21950583b69a00aaaee5c12f6fb196df1b2ed65dcb1'}, title:'西红柿炒鸡蛋', textContent:{'position':'CENTER',text:'6. 盛盘撒葱花,结束'}},
                {type:'BodyTemplate1', token:'8',backgroundImage:{"url": 'http://dbp-resource.gz.bcebos.com/9838ae4c-39a7-cddf-fe90-0bcf81f3cfaa/c6ad56e6a52b11e5a23867cf2b13e9bf.jpg?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2018-06-16T05%3A59%3A04Z%2F-1%2F%2F006050712da6c5731650b21950583b69a00aaaee5c12f6fb196df1b2ed65dcb1'}, title:'西红柿炒鸡蛋', textContent:{'position':'CENTER',text:'7. 已经学习结束，是不是已经成功了'}},
            ];
            let directive =  new Bot.Directive.RenderTemplate.Template(page[pageIndex]);
            let card = new Bot.Card.StandardCard(page[pageIndex]['textContent']['text']);
            return {
                "directives": [directive],                
                card: card,
                outputSpeech: page[pageIndex]['textContent']['text']
            };

            return {
                "shouldEndSession" : pageIndex != 7 ? false : true,
                "directives": [directive],
                "card": card,
                "outputSpeech": page[pageIndex]['textContent']['text']
            };
            // let monthlySalary = this.getSlot('number');
            // if (!monthlySalary) {
            //     this.nlu.ask('number');
            //     let card = new Bot.Card.TextCard('你工资多少呢');
            //     // 可以返回异步 Promise
            //     return Promise.resolve({
            //         card: card,
            //         outputSpeech: '你工资多少呢'
            //     });
            // }

            // if (!loc) {
            //     let card = new Bot.Card.TextCard('你在哪呢');
            //     this.nlu.ask('city');
            //     return {
            //         card: card,
            //         outputSpeech: '你在哪呢'
            //     };
            // }

            // if (this.request.isDialogStateCompleted()) {
            //     let card = new Bot.Card.TextCard('你需要缴纳1230元');
            //     return {
            //         card: card,
            //         outputSpeech: '<speak>你需要缴纳<say-as type="number">1230</say-as>元</speak>'
            //     };
            // }
        });
    }
}


module.exports.ZuofanBot = ZuofanBot;
  