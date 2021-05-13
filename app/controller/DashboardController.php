<?php 

namespace app\controller;

use Source\Classes\RenderLayout;

class DashboardController extends RenderLayout{

    public function __construct(){
        $this->setTitle("Dashboard");
        $this->setDir('dashboard');
    }

    public function render() {
        $this->renderLayout();
    }
}