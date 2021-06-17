<?php 

namespace app\controller;

use Source\classes\RenderLayout;
use Source\classes\Persistent;
use App\model\EnadeModel;

class EnadeController extends RenderLayout{

    public function __construct(){
        $this->setTitle("Enade");
        $this->setDir('enade');        
        $this->model = new EnadeModel(); 
        $this->persistent = new Persistent();
        $this->persistent->setTable('componente_enade');
        $this->persistent->setColumns('conteudo', 'curso');
    }

    public function render() {
        $this->renderLayout();
    }

    public function saveDataBySpreadsheet($rows){

        foreach ($rows as $key => $row){     
            
            if(empty($row['componente_enade']))
                continue;
            
            $this->dados = [                    
                'conteudo' => $row['componente_enade'],
                'curso' => $row['curso'],
            ];
            $this->persistent->setFields($this->dados);
            $this->persistent->saveData();
        } 
    } 

    public function fetchListByCurso(){
        $curso = $_POST['curso'];
        $response = $this->model->listaEnadeByCurso($curso);
        echo(json_encode($response));
    }
}