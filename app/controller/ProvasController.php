<?php 

namespace app\controller;

use Source\Classes\RenderLayout;

class ProvasController extends RenderLayout{

    public function __construct(){
        $this->setTitle("Provas");
        $this->setDir('provas');
    }

    public function render() {
        $this->renderLayout();
    }
}