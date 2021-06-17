<?php 

namespace app\controller;

use Source\classes\RenderLayout;
use Source\classes\Persistent;
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
        $this->persistent->setTable('curso');
        $this->persistent->setColumns('nome');
    }
    public function render() {
        $this->renderLayout();
    }

    public function processAjax(){
        $this->dados = [
            'nome' => $_POST['cursoNome']          
        ];
        $this->persistent->setFields($this->dados);
        $this->persistent->saveData();
    }

    public function saveDataBySpreadsheet($rows) {
               
        $array = [];        
        foreach ($rows as $key => $row){
            if(!in_array($row['Curso'], $array)) {
            $array[] = $row['Curso'];
                $disciplina = $this->model->buscaPorNome($row['Curso']);
                if(empty($disciplina)){
                    $this->dados = [ 
                        'nome' => $row['Curso'],
                    ];
                    $this->persistent->setFields($this->dados);
                    $this->persistent->saveData();
                }
            }
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

    public function fetchList(){
        $response = $this->model->listaCursos();
        echo(json_encode($response));
    }

    public function getCount(){   
        if(empty($listCurses)) {            
            $this->listCurses = $this->model->listaCursos();
        }
        echo count($this->listCurses);
    }


    //##############################
    //#COLOCAR NO CONTROLLER DEVIDO#
    //##############################
    public function teste() {

        $this->persistent->setTable('relatorio');
        $this->persistent->setColumns('curso', 'ano', 'questao', 'enade');

        $this->dados = [
            'curso' => $_POST['curso'],
            'ano' => $_POST['ano'],
            'questao' => $_POST['questao'],
            'enade' => $_POST['enade'],
        ];

        var_dump($this->dados);

        $this->persistent->setFields($this->dados);
        $this->persistent->saveData();



    }
}