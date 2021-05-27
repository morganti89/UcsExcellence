<?php 

namespace app\controller;

use Source\Classes\RenderLayout;

class DCNController extends RenderLayout{

    public function __construct(){
        $this->setTitle("DCN");
        $this->setDir('dcn');
    }

    public function render() {
        $this->renderLayout();
    }
}