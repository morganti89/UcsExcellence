<?php

namespace app\model;
use PDO;

use Source\classes\Persistent;

class LoginModel extends Persistent{
    public function buscaUsuarioPorEmailESenha($email, $senha) {
        $conn = $this->conn->getConn();
        $sql = "SELECT * FROM usuario WHERE email='{$email}' AND senha='{$senha}'";
        $statment = $conn->prepare($sql);
        $statment->execute();
        $result = $statment->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }
  
}