<?php 

namespace app\controller;

use Source\classes\RenderLayout;
use Source\classes\Persistent;
use App\model\ProvasModel;
use Source\classes\Helpers;

class ProvasController extends RenderLayout{

    public function __construct(){
        $this->setTitle("Provas");
        $this->setDir('provas');
        $this->model = new ProvasModel(); 
        $this->persistent = new Persistent();
        $this->persistent->setTable('provas');
        $this->persistent->setColumns('ano', 'curso', 'link');
    }

    public function render() {
        $this->renderLayout();
    }

    public function saveDataBySpreadsheet($rows) {
        foreach ($rows as $key => $row){
            $prova = $this->model->buscaProvaPorCursoEAno($row['Curso'], $row['Ano']);
            if(empty($prova)) {
                 $this->dados = [                    
                    'ano' => $row['Ano'],
                    'curso' => utf8_decode($row['Curso']),
                    'link' => $row['Link']
                ];
            }
            $this->persistent->setFields($this->dados);
            $this->persistent->saveData();
        }
    }

    public function buscarProva(){
        $data = "";
        $fetchData = $this->model->buscaProvaPorCursoEAno($_POST['curso'], $_POST['ano']);
        if(!empty($fetchData)){
            $data = $fetchData[0]['link'];
        }
        echo(json_encode($data, JSON_UNESCAPED_SLASHES));
    }

    public function buscarAnoProva(){
        $fetchData = $this->model->buscaAnoProva($_POST['curso']);
        if(!empty($fetchData)){
            foreach ($fetchData as $key => $value) {
                $data[] = $value;
            }
        }
        echo(json_encode($data));
    }

    public function buscaSessao(){
        echo(json_encode(Helpers::buscaSessao()));
    }
}