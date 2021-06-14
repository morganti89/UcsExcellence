<?php

namespace Source\classes;

class RenderLayout {

    private $dir;
    private $title;
    private $description;
    private $keywords;
    private $path;

    public function getDescription() { return $this->description;}
    public function setDescription($description) { $this->description = $description; return $this; }
    public function getTitle() { return $this->title; }
    public function setTitle($title) { $this->title = $title; return $this; }
    public function getDir() { return $this->dir; }
    public function setDir($dir){ $this->dir = $dir; return $this; }
    public function getKeywords() { return $this->keywords; }
    public function setKeywords($keywords) { $this->keywords = $keywords; return $this;}

    public function getPath($path) {
        return DIR_REQ . "app/view/{$this->getDir()}/{$path}.php";
    }

    private function getStandartPath($path){
        return DIR_REQ . "app/view/dashboard/dashboard.{$path}.php";
    }

    public function renderLayout(){
        require_once(DIR_REQ."/app/view/Layout.php");
    }

    public function addHead() {
        if(file_exists($this->getPath("{$this->getDir()}.head"))){
            try{
                require_once($this->getPath("{$this->getDir()}.head"));
            } catch (\Exception $e) {
                echo $e->getMessage();
            }
        }
    }

    public function addHeader() {
        if(file_exists($this->getPath("{$this->getDir()}.header"))){
            require_once($this->getPath("{$this->getDir()}.header"));
        } else {
            require_once($this->getStandartPath("header"));
        }
    }

    public function addMain() {        
        if(file_exists($this->getPath("{$this->getDir()}.main"))){
            require_once($this->getPath("{$this->getDir()}.main"));
        }else {
            require_once($this->getStandartPath("main"));
        }

    }

    public function addFooter() {
        #D:/www/projeto/projeto/app/view/home/usuario.footer.php
        if(file_exists($this->getPath("{$this->getDir()}.footer"))){
            require_once($this->getPath("{$this->getDir()}.footer"));
        } else {
            require_once($this->getStandartPath("footer"));
        }
    }

}