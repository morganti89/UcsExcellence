<?php 

namespace app\controller;

use App\model\DcnModel;
use Source\classes\Persistent;
use Source\classes\RenderLayout;

class DcnController extends RenderLayout{

    private $dados = [];
    private $persistent = null;
    private $listCurses = [];
    private $curseCount;
    private $model = null;

    public function __construct(){
        $this->setTitle("DCN");
        $this->setDir('dcn');        
        $this->model = new DcnModel(); 
        $this->persistent = new Persistent();
        $this->persistent->setTable('componente_dcn');
        $this->persistent->setColumns('conteudo', 'curso');
    }

    public function render() {
        $this->renderLayout();
    }

    public function saveDataBySpreadsheet($rows){

        foreach ($rows as $key => $row){            
            $this->dados = [                    
                'conteudo' => $row['dcn'],
                'curso' => $row['curso'],
            ];
            $this->persistent->setFields($this->dados);
            $this->persistent->saveData();
        } 
    }
}