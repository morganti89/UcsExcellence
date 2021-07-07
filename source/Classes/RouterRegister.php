<?php

namespace source\classes;

class RouterRegister {

    private $routes = [];

    public function __construct(){
        $this->addRoutes();
    }

    private function addRoutes(){
        $this->routes = [
            '' => 'dashboard',
            'login' => 'login',
            'dashboard' => 'dashboard',
            'curriculo' => 'curriculo',
            'cursos' => 'cursos',
            'provas' => 'provas',
            'cadastros' => 'cadastros',
            'enade' => 'enade',
            'dcn' => 'dcn'
        ];
    }

    public function getRoutes(){
        return $this->routes;
    }

}