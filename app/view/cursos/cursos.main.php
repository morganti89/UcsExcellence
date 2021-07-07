<div class="main_content">
    <div>
        <button id="btn_cursos_modal" class="btn_normal">NOVO CURSO</button>
        <button id="file_curso" class="btn_normal browser_file">IMPORTAR PLANILHA</button>
    </div>
    <table id="lista">
        <tbody></tbody>
    </table>
    <div class="pagination">
        <div class="pages"></div>
    </div>
</div>

<div id="cursos_modal_save" class="modal">
    <div class="modal_content">
        <span class="close">&times;</span>
        <h3>Cadastrar novo curso</h3>
        <div class="inputs">
            <label>Nome do Curso</label>
            <input type="text" id="curso_nome">
        </div>
        <div class="inputs">            
            <input type="submit" id="gravar_curso">
        </div>        
    </div>
</div>

<div id="curso_modal" class="modal">
    <div class="modal_content">
        <input id="text_curso" type="text" hidden>
        <span class="close">&times;</span>
            <button id="btn_delete_curso" class="btn_delete">EXCLUIR</button>
        </div>
    </div>
</div>