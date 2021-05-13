<div class="main_content">
    <div id="btn_curso">
        <button id="btn_cursos_modal" class="btn_cursos">NOVO CURSO</button>
        <button class="btn_cursos">IMPORTAR CSV</button>
    </div>
    <table id="lista">
        <tbody></tbody>
    </table>
</div>

<div id="cursos_modal" class="modal">
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

