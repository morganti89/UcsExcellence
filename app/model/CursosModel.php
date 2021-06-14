<?php

namespace app\model;
use PDO;

use Source\classes\Persistent;

class CursosModel extends Persistent{

    public function listaCursos() {
        $conn = $this->conn->getConn();
        $sql = "SELECT DISTINCT `curso` FROM curriculo ORDER BY curso";
        $statment = $conn->prepare($sql);
        $statment->execute();
        $result = $statment->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }

    public function buscaCursoPorId($id) {
        $conn = $this->conn->getConn();
        $sql = "SELECT * FROM curriculo WHERE id={$id} ORDER BY nome ASC";
        $statment = $conn->prepare($sql);
        $statment->execute();
        $result = $statment->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }
 
    public function buscarPorCodigoEDisciplina($code, $curso){
        $conn = $this->conn->getConn();
        $sql = "SELECT * FROM curriculo WHERE codigo='{$code}' AND curso ='{$curso}'";
        $statment = $conn->prepare($sql);
        $statment->execute();
        $result = $statment->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }

    public function buscaPorNome($nome) {
        $conn = $this->conn->getConn();
        $sql = "SELECT * FROM curriculo WHERE curso='{$nome}'";
        $statment = $conn->prepare($sql);
        $statment->execute();
        $result = $statment->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }
}