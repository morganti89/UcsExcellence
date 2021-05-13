<?php

namespace App;

use Source\Classes\Helpers;
use Source\Classes\Router;

class Dispatcher extends Router{

    private $method = null;
    private $obj;
    private $controller;
    private $params = [];

    public function __construct(){
       $this->addController();
    }

    /*GETTERS - SETTERS*/
    protected function getMethod(){
        return $this->method;
    }
    protected function setMethod($method){
        $this->method = $method;
    }
    protected function getParams(){
        return $this->params;
    }
    protected function setParams($params){
        $this->params = $params;
    }

    #ADICIONA CONTROLLER A PARTIR DA ROTA
    private function addController(){
        $controller = $this->getCurrentRoute();
        $class = "App\\Controller\\{$controller}";
        $this->obj = new $class;

        if(isset(Helpers::parseURL()[1])){
            $this->addMethod();
        } else {
            $this->obj->render();
        }
    }

    private function addMethod(){
        if(method_exists($this->obj, Helpers::parseURL()[1])){
            $this->setMethod(Helpers::parseURL()[1]);
            $this->addParams();
            call_user_func_array([$this->obj, $this->getMethod()], $this->getParams());
        }
    }

    private function addParams(){
        $countArray = count(Helpers::parseURL());

        if($countArray > 2) {
            foreach (Helpers::parseURL() as $key => $value) {
                if($key > 1){
                    $this->setParams($this->params += [$key => $value]);
                }
            }
        }
    }
}