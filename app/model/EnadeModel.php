<?php
namespace app\model;
use PDO;

use Source\classes\Persistent;

class EnadeModel extends Persistent{

    public function listaEnadeByCurso($curso) {
        $conn = $this->conn->getConn();
        $sql = "SELECT `conteudo` FROM componente_enade WHERE curso='{$curso}'";
        $statment = $conn->prepare($sql);
        $statment->execute();
        $result = $statment->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }
}