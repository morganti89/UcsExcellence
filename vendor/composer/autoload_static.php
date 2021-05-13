<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit89f70f9bd7d657150bf625a0754f9e9a
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Source\\' => 7,
        ),
        'A' => 
        array (
            'App\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Source\\' => 
        array (
            0 => __DIR__ . '/../..' . '/source',
        ),
        'App\\' => 
        array (
            0 => __DIR__ . '/../..' . '/app',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit89f70f9bd7d657150bf625a0754f9e9a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit89f70f9bd7d657150bf625a0754f9e9a::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit89f70f9bd7d657150bf625a0754f9e9a::$classMap;

        }, null, ClassLoader::class);
    }
}