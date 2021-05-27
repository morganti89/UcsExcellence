<?php 

namespace app\controller;

use Source\Classes\RenderLayout;

class CadastrosController extends RenderLayout{

    public function __construct(){
        $this->setTitle("Cadastros");
        $this->setDir('cadastros');
    }

    public function render() {
        $this->renderLayout();
    }
}