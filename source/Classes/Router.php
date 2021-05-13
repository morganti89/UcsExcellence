<?php

namespace Source\Classes;

class Router {
    public function getCurrentRoute(){
        $current_route = Helpers::parseURL();
        $controller = $current_route[0];

        $rr = new RouterRegister();
        $routerList = $rr->getRoutes();

        if(array_key_exists($controller, $routerList)) {
            $current_route = $this->parseRoute($controller);
            if(file_exists(DIR_REQ. "/app/controller/{$current_route}.php")){
                return $current_route;
            } else {
                return $this->parseRoute('dashboard');
            }
        } else {
            return $this->parseRoute('notFound');
        }
    }

    private function parseRoute($current_route){
        return ucfirst($current_route)."Controller";
    }

}