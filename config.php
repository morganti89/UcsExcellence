<?php
#Arquivos diretórios internos

$innerFolder = 'UcsExcellence/';

define ('DIR_PAGE', "http://{$_SERVER['HTTP_HOST']}/{$innerFolder}");
if(substr($_SERVER['DOCUMENT_ROOT'], -1) == '/') {
    define ('DIR_REQ', "{$_SERVER['DOCUMENT_ROOT']}{$innerFolder}");
} else {
    define ('DIR_REQ', "{$_SERVER['DOCUMENT_ROOT']}/{$innerFolder}");
}

define('DIR_IMG',DIR_PAGE."public/img");
define('DIR_CSS',DIR_PAGE."public/css");
define('DIR_JS',DIR_PAGE."public/js");
define('DIR_LIBS',DIR_PAGE."public/libs");

define('HOST', "localhost");
define('DB', "sistema");
define('USER', "root");
define('PASS', "");