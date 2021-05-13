<?php

namespace app\model;
use PDO;

use Source\Classes\Persistent;

class CursosModel extends Persistent{

    public function listaCursos() {
        $conn = $this->conn->getConn();
        $sql = "SELECT * FROM cursos ORDER BY nome ASC";

        $statment = $conn->prepare($sql);
        $statment->execute();
        $result = $statment->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }
}