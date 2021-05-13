<?php

namespace Source\Classes;
use \Source\Classes\Connection;

class Persistent {
    private $table;
    private $fields = [];
    private $columns;
    protected $conn;

    public function __construct(){
        if($this->conn == null) {
            $this->conn = new Connection();
        }
    }

    public function setColumns($columns){
        $this->columns = $columns;
    }

    public function setTable($table) {
        $this->table = $table;
    }

    public function setFields($fields) {
        $this->fields = $fields;
    }

    public function saveData(){
        $conn = $this->conn->getConn();

        $keys = array_keys($this->fields);
        $stmKeys = implode(',', $keys);

        $keysValues = array_map(function ($value){
            return ":".$value;
        },$keys);
        $alias = implode(',', $keysValues);


        $sql = "INSERT INTO {$this->table} ({$stmKeys}) VALUES ({$alias})";
        $id = $conn->prepare($sql)->execute($this->fields);
        return $id;
    }
}