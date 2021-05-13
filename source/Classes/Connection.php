<?php

namespace Source\Classes;
use PDO;

class Connection {

    private $pdo = null;

    public function __construct(){
        $dsn = 'mysql:dbname=ucs_excellence;host='.HOST;
        $user = USER;
        $password = PASS;

        try {
            $this->pdo = new PDO($dsn, $user, $password);
        } catch (\PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
        }
    }

    public function getConn() {
        return $this->pdo;
    }

}