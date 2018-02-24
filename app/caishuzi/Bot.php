<?php
use \Baidu\Duer\Botsdk\Card\TextCard;

class Bot extends Baidu\Duer\Botsdk\Bot{
    /**
     * @param null
     * @return null
     **/
    public function __construct($postData = []) {
        parent::__construct($postData);

        $this->log = new Baidu\Duer\Botsdk\Log([
            //日志存储路径
            'path' => 'log/',
            //日志打印最低输出级别
            'level' => Baidu\Duer\Botsdk\Log::NOTICE,
        ]);

        //test fatal log，你可以这样来输出一个fatal日志
        //$this->log->fatal("this is a fatal log");

        //log 一个字段
        $this->log->setField('query', $this->request->getQuery());
        // $this->log->setField('name', $this->request->getQuery());
        $this->log->setField('session.status', $this->getSessionAttribute('status'));
        //你可以这样来添加一个插件
        //$this->addIntercept(new Baidu\Duer\Botsdk\Plugins\DuerSessionIntercept());
        $this->addLaunchHandler(function(){
            $this->setSessionAttribute('session_num', rand(0,100));
            $this->waitAnswer();
            return [
                'outputSpeech' => '<speak>欢迎使用猜数字游戏，已经为你生成了0到100中随机一个数字，开始猜数字吧</speak>' 
            ];
        });
        $this->addIntentHandler('fanwei', function(){
            if(!$this->getSlot('sys.number')) {
                $this->nlu->ask('sys.number');
                $this->waitAnswer();
                return [
                    'card' => new TextCard('你得给我个数字。大胆猜一个吧。')
                ];
            }
            
            if($this->getSessionAttribute('session_num') == $this->getSlot('sys.number')) {
                $card = new TextCard('爆炸了');
                return [
                    'card' => $card 
                ]; 
            }else{
                $card = new TextCard('数字是：'.$this->getSessionAttribute('session_num'));
                $this->waitAnswer();
                return [
                    'card' => $card 
                ];
            }
        });


    }
}
