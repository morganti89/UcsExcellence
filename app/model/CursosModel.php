<?php

namespace app\model;
use PDO;

use Source\classes\Persistent;

class CursosModel extends Persistent{

    public function listaCursos() {
        $conn = $this->conn->getConn();
        $sql = "SELECT `nome` FROM curso ORDER BY nome";
        $statment = $conn->prepare($sql);
        $statment->execute();
        $result = $statment->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }

    public function buscaCursoPorId($id) {
        $conn = $this->conn->getConn();
        $sql = "SELECT * FROM curso WHERE id={$id} ORDER BY nome ASC";
        $statment = $conn->prepare($sql);
        $statment->execute();
        $result = $statment->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }

    public function buscaPorNome($nome) {
        $conn = $this->conn->getConn();
        $sql = "SELECT * FROM curso WHERE nome='{$nome}'";
        $statment = $conn->prepare($sql);
        $statment->execute();
        $result = $statment->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }

    public function excluiCurso($curso) {
        $conn = $this->conn->getConn();        
        $sql = "DELETE FROM curso WHERE nome = :curso";
        var_dump($sql);
        $statment = $conn->prepare($sql);
        $statment->bindParam(':curso', $curso);
        $statment->execute();
    }
}