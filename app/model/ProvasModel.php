<?php
namespace app\model;
use PDO;

use Source\classes\Persistent;

class ProvasModel extends Persistent{

    public function buscaProvaPorCursoEAno($curso, $ano) {
        $conn = $this->conn->getConn();
        $sql = "SELECT `link` FROM provas WHERE curso='{$curso}' AND ano='{$ano}'";
        $statment = $conn->prepare($sql);
        $statment->execute();
        $result = $statment->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }

    public function buscaAnoProva($curso) {
        $conn = $this->conn->getConn();
        $sql = "SELECT `ano` FROM provas WHERE curso='{$curso}'";
        $statment = $conn->prepare($sql);
        $statment->execute();
        $result = $statment->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }
}