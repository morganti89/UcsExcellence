<?php
namespace app\model;
use PDO;

use Source\classes\Persistent;

class DcnModel extends Persistent{
    public function listaEnadeByCurso($curso) {
        $conn = $this->conn->getConn();
        $sql = "SELECT `conteudo` FROM componente_dcn WHERE curso='{$curso}'";
        $statment = $conn->prepare($sql);
        $statment->execute();
        $result = $statment->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }
}