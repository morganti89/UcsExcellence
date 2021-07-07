<?php
    require_once "../config.php";
    require_once "../vendor/autoload.php";
    
    use App\Dispatcher;
    session_start();
    $d = new Dispatcher();
    