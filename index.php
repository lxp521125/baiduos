<?php

require 'vendor/autoload.php';

class index extends Baidu\Duer\Botsdk\Bot
{
    public function __construct($postData = [], $privateKey = '')
    {
        parent::__construct($postData, $privateKey);
            /* DuerOS和技能之间通讯需要进行签名验证，PHP需要开启open ssl扩展*/
            $this->certificate->enableVerifyRequestSign();
            $this->addIntentHandler('caishuzi', 'caishuzi');
            $this->addLaunchHandler(function(){
                return [
                    'outputSpeech' => '<speak>'.$this->session_id.'欢迎使用，已经为你生成0-100一个随机数</speak>' 
                ];
            });
    }

    
}
new index();