<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit21a6518e8dfb3333c84852ae7030f3f3
{
    public static $prefixLengthsPsr4 = array (
        'B' => 
        array (
            'Baidu\\Duer\\Botsdk\\' => 18,
            'Baidu\\Apm\\BotMonitorsdk\\' => 24,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Baidu\\Duer\\Botsdk\\' => 
        array (
            0 => __DIR__ . '/..' . '/dueros/bot-sdk/src',
        ),
        'Baidu\\Apm\\BotMonitorsdk\\' => 
        array (
            0 => __DIR__ . '/..' . '/monitor/bot-monitor/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit21a6518e8dfb3333c84852ae7030f3f3::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit21a6518e8dfb3333c84852ae7030f3f3::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
