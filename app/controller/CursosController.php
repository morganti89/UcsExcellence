<?php 

namespace app\controller;

use Source\Classes\RenderLayout;
use Source\Classes\Persistent;
use App\model\CursosModel;

class CursosController extends RenderLayout{

    private $dados = [];
    private $persistent = null;
    private $listCurses = [];
    private $curseCount;
    private $model = null;

    public $hasMethod = false;

    public function __construct(){
        $this->setTitle("Cursos");
        $this->setDir('cursos');
        $this->model = new CursosModel(); 
        $this->persistent = new Persistent();
        $this->persistent->setTable('curriculo');
        $this->persistent->setColumns('codigo', 'disciplina', 'componente_enade', 'componente_dcn', 'carga_horaria', 'curso');
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

    public function saveSpreadsheet() {

        $rows = $_POST['data'];
               
        foreach ($rows as $key => $row){
            $disciplina = $this->model->buscarPorCodigoEDisciplina($row['Codigo'], $row['Curso']);            
            if(!empty($disciplina)){
               continue;
            }
            $this->dados = [                    
                'codigo' => $row['Codigo'],
                'disciplina' => $row['Disciplina'],
                'carga_horaria' => (int)$row['CH'],
                'curso' => $row['Curso'],
            ];
            $this->persistent->setFields($this->dados);
            $this->persistent->saveData();
        } 
    }

    public function fetchById(){        
        $fetchData = $this->model->buscaCursoPorId($_POST['id']);
        echo(json_encode($fetchData));
    }

    public function fetchByName(){        
        $fetchData = $this->model->buscaPorNome($_POST['nome']);
        echo(json_encode($fetchData));
    }

    public function fetchListPage(){

        if(empty($listCurses)) {            
            $this->listCurses = $this->model->listaCursos();
        }
        $page = $_POST['page'] - 1;
        $response = array_chunk($this->listCurses, 20);
        echo(json_encode($response[$page]));
    }

    public function getCount(){   
        if(empty($listCurses)) {            
            $this->listCurses = $this->model->listaCursos();
        }
        echo count($this->listCurses);
    }
}