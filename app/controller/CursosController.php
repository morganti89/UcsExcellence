<?php 

namespace app\controller;

use Source\Classes\RenderLayout;
use Source\Classes\Persistent;
use App\model\CursosModel;

class CursosController extends RenderLayout{

    private $dados = [];
    private $persistent = null;
    public $hasMethod = false;

    public function __construct(){
        $this->setTitle("Cursos");
        $this->setDir('cursos');
        $this->persistent = new Persistent();
        $this->persistent->setTable('cursos');
        $this->persistent->setColumns('nome', 'area');
    }

    public function render() {
        $this->renderLayout();
    }

    public function processAjax(){
        $this->dados = [
            'nome' => $_POST['cursoNome'],
            'area' => $_POST['cursoArea']
        ];
        $this->persistent->setFields($this->dados);
        $this->persistent->saveData();
    }

    public function fetchById(){
        $model = new CursosModel();
        $fetchData = $model->buscaCursoPorId($_POST['id']);
        echo(json_encode($fetchData));
    }

    public function fetchList(){
        $model = new CursosModel();
        $fetchData = $model->listaCursos();
        echo(json_encode($fetchData));
    }
}