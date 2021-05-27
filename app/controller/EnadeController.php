<?php 

namespace app\controller;

use Source\Classes\RenderLayout;

class EnadeController extends RenderLayout{

    public function __construct(){
        $this->setTitle("Enade");
        $this->setDir('enade');
    }

    public function render() {
        $this->renderLayout();
    }
}