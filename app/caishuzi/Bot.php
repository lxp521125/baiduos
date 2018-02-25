<?php
use \Baidu\Duer\Botsdk\Card\TextCard;

class Bot extends Baidu\Duer\Botsdk\Bot
{

    /**
     * @param null
     * @return null
     **/
    public function __construct($postData = [])
    {
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
        $this->addLaunchHandler(function () {
            $this->iniData();
            $this->waitAnswer();
            return [
                'outputSpeech' => '<speak>欢迎使用猜数字游戏，已经为你生成了0到100中随机一个数字，开始猜数字吧</speak>'
            ];
        });
        $this->addIntentHandler('start', function () {
            $this->iniData();
            $this->waitAnswer();
            return [
                'outputSpeech' => '<speak>已经为你生成了0到100中随机一个数字，开始猜数字吧</speak>'
            ];
        });
        $this->addIntentHandler('over', function () {
            return [
                'outputSpeech' => '<speak>欢迎使用猜数字游戏，期待下一次</speak>'
            ];
        });
        $this->addIntentHandler('fanwei', function () {
            if (!$this->getSlot('sys.number')) {
                $this->nlu->ask('sys.number');
                $this->waitAnswer();
                return [
                    'card' => new TextCard('你得给我个数字。大胆猜一个吧。')
                ];
            }
            $userCaiNum = $this->getSlot('sys.number');
            $card = $this->handleDataMsg($userCaiNum);
            $this->waitAnswer();
            return [
                'card' => new TextCard($card)
            ];
        });
    }

    public function iniData()
    {
        $this->setSessionAttribute('session_max_num', 100);
        $this->setSessionAttribute('session_min_num', 0);
        $this->setSessionAttribute('session_cai_num', rand(0, 100));
    }

    public function handleDataMsg($userCaiNum)
    {
        if (empty($userCaiNum)) {
            return '你得给我个数字。大胆猜一个吧。';
        }
        $maxNum = $this->getSessionAttribute('session_max_num');
        $minNum = $this->getSessionAttribute('session_min_num');
        $caiNum = $this->getSessionAttribute('session_cai_num');
        
        if ($userCaiNum > $maxNum || $userCaiNum < $minNum) {
            return '猜的数字超出范围，你只能猜'.$minNum.'到'.$maxNum.'，游戏继续';
        }
        if ($caiNum == $userCaiNum) {
            return '祝贺你，就是'.$caiNum;
        }
        if ($caiNum > $userCaiNum) {
            $this->setSessionAttribute('session_min_num', $userCaiNum);
            $minNum = $userCaiNum;
        }
        if ($caiNum < $userCaiNum) {
            $this->setSessionAttribute('session_max_num', $userCaiNum);
            $maxNum = $userCaiNum;
        }
        return '现在猜的范围是'.$minNum.'到'.$maxNum.'，游戏继续';
    }
}
