<?php 

namespace app\controller;

use App\model\LoginModel; 
use Source\classes\Helpers;
use Source\classes\Persistent;
use Source\classes\RenderLayout;

class LoginController extends RenderLayout{

    public function __construct(){
        $this->setTitle("Login");
        $this->setDir('login');
        $this->model = new LoginModel(); 
        $this->persistent = new Persistent();
        $this->persistent->setTable('usuario');
        $this->persistent->setColumns('nome', 'email', 'senha', 'tipo', 'curso');
    }

    public function render() {
        $this->renderLayout();
    }

    public function makeLogin() {
        $response = $this->model->buscaUsuarioPorEmailESenha($_POST['email'], $_POST['senha']);
        if($response[0]['id'] > 0) {            
            $_SESSION['login'] = true;
            $_SESSION['tipo'] = $response[0]['tipo'];
            $_SESSION['curso'] = $response[0]['curso'];
            
        }
        echo(json_encode($response[0]));
    }

    public function buscaSessao(){        
        if(!isset($_SESSION['login'])){
            echo(json_encode(['login' => false]));
        } else {
            echo(json_encode(['login' => true]));
        }
    }

    public function buscaCursoSessao(){
        
        $array = [
            'tipo' => $_SESSION['tipo'],
            'curso' => $_SESSION['curso']
        ];
        echo(json_encode($array));
    }
}
