<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">
    <meta name="description" content="<?php echo $this->getDescription(); ?>">
    <title><?php echo $this->title?></title>    
    <link rel="stylesheet" href=<?php echo DIR_CSS."/style.css" ?>>
</head>
<body>
<div class="site">
    <header class="header">
        <?php echo $this->addHeader(); ?>
    </header>    
    <div class="main">
        <div class="sidenav">
            <nav>
                <ul>
                    <li><i class="fa fa-dashboard" aria-hidden="true"></i><a href="dashboard">Dasboard</a></li>
                    <li><a href="cursos">Cursos</a></li>
                    <li><a href="provas">Provas</a></li>
                    <li><a href="cadastros">Cadastros</a></li>
                    <li><a href="enade">Enade</a></li>
                    <li><a href="dcn">DCN</a></li>
                </ul>
            </nav>
        </div>

        <?php echo $this->addMain(); ?>
    </div>

    <div class="footer">
        <?php echo $this->addFooter(); ?>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/xlsx.full.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/jszip.js"></script>
<?php echo $this->addHead(); ?>

</body>
</html>