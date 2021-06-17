<?php 

namespace app\controller;

use Source\classes\RenderLayout;
use App\controller\DcnController;
use App\controller\EnadeController;
use App\controller\CurriculoController;

class CadastrosController extends RenderLayout{

    public function __construct(){
        $this->setTitle("Cadastros");
        $this->setDir('cadastros');
    }

    public function render() {
        $this->renderLayout();
    }

    public function saveSpreadsheet() {
        
        $rows = $_POST['data'];
        $type = $_POST['type'];
        switch ($type) {
            case 'file_dcn':
                $obj = new DcnController();
                break;
            case 'file_provas':               
                break;
            case 'file_curso':
                $obj = new CurriculoController();
                break;
            case 'file_enade':
                $obj = new EnadeController();
                break;
            default:                
                break;                
        }
        
        $obj->saveDataBySpreadsheet($rows);
    }
}