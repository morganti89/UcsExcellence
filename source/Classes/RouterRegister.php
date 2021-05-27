<?php

namespace source\Classes;

class RouterRegister {

    private $routes = [];

    public function __construct(){
        $this->addRoutes();
    }

    private function addRoutes(){
        $this->routes = [
            '' => 'dashboard',
            'dashboard' => 'dashboard',
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