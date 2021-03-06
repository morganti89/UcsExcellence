<div class="main_content">
    <div class="cabecalho_enade">
        <button id="btn_enade_modal" class="btn_normal">NOVO COMPONENTE</button>
        <button id="file_enade" class="btn_normal browser_file">IMPORTAR PLANILHA</button>
        <form>            
                <input type="file" class="file_selector" id="fileUpload">
            </form>
        <select class="sel_curso"></select>
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
            <label>Área do Conhecimento</label>
            <select id="curso_area">
                <option value=""></option>
                <option value="1">Ciências Exatas</option>
            </select>
            <button id="btn_cad_area">Cadastrar novo Área</button>
        </div>
        <div class="inputs">            
            <input type="submit" id="gravar_curso">
        </div>        
    </div>
</div>

<div id="curso_modal" class="modal">
    <div class="modal_content">
        <span class="close">&times;</span>
    </div>
</div>