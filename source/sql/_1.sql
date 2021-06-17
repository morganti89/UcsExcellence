CREATE TABLE `curriculo` ( `id` int PRIMARY KEY AUTO_INCREMENT, `codigo` varchar(100), `disciplina` varchar(100), `componente_enade` varchar(100), `componente_dcn` varchar(100), `carga_horaria` int, `curso` varchar(100));
CREATE TABLE `componente_dcn` ( `id` int PRIMARY KEY AUTO_INCREMENT, `conteudo` varchar(150), `curso` varchar(100) )
CREATE TABLE `componente_enade` ( `id` int PRIMARY KEY AUTO_INCREMENT, `conteudo` varchar(150), `curso` varchar(100) )
CREATE TABLE `curso` ( `id` int PRIMARY KEY AUTO_INCREMENT, `nome` varchar(150))
CREATE TABLE `relatorio` ( `id` int PRIMARY KEY AUTO_INCREMENT, `curso` varchar(100), `ano` varchar(100), `questao` varchar(100), `enade` varchar(100))
