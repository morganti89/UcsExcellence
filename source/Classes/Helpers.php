<?php

namespace Source\Classes;

class Helpers {
    static public function parseURL(){
        return explode("/", rtrim($_GET['url']), FILTER_SANITIZE_URL);
    }
}