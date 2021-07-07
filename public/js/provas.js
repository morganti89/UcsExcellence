  var cursoSelecionado = [];

  $(document).ready(function() {

    createSelectProva();
    createSelectComponente();    
    createIFrame();
    updateSelectQuestoes();

    
    $.ajax({
      url: "login/buscaCursoSessao",
      method: "GET",      
      datatype: "json",
      success: function(json) {
        res = JSON.parse(json);
        console.log(res);
        if(res.tipo == "admin"){
          $.ajax({
            url: "cursos/fetchList",
            datatype: "json",
            success: function(jsonCurso) {
              updateSelectProva(jsonCurso);              
            }
          });
        } else {
          $('.sel_curso').append(
            $('<option>', {'value': res.curso, 'text': res.curso, 'selected':true},'</option>')            
          );
          cursoSelecionado = $(".sel_curso").val();
          updateSelectAno(cursoSelecionado);
          updateComponentes(cursoSelecionado);
          console.log($(".sel_curso").val());
          console.log($(".sel_ano").val());
        }
      }
    });

    $(".sel_curso").on('change', function(e){
      let curso = this.value;      
      updateComponentes(curso);
    });
  });

  function createSelectProva() {    
    $("#inputs_provas").append(
        $('<div>', {'class':'cabecalho_curso'}).append(
            $('<label>', {'text':'Curso'}),
            $('<div>', {'class':'cabecalho_curso'}).append(
              $('<select>', {'class':'sel_curso inputs_select'}),
              
            ),
            $('<label>', {'text':'Ano'}),
            $('<div>', {'class':'cabecalho_curso'}).append(
              $('<select>', {'class':'sel_ano inputs_select'}),
              
            ),
        ),
        $('<button>', {onclick:'buscaProva()','id':"pes_prova", 'class':"btn_normal", 'text':"BUSCAR PROVA"})
    );
  }

  function updateSelectProva(json) {
    res = JSON.parse(json);    
    anos = ['2010','2011','2012','2013','2014'];
    
    $.each(anos, function(){
      $('.sel_ano').append(
        $('<option>', {'value': this, 'text': this},'</option>')
      );
    });

    $.each(res, function(){    
      $('.sel_curso').append(
        $('<option>', {'value': this.nome, 'text': this.nome},'</option>')
      );
    });    
  }

  function createSelectComponente() {
    $("#inputs_componentes").append(
      $('<div>', {'class':'cabecalho_curso'}).append(
          $('<label>', {'text':'Questão'}),
          $('<div>', {'class':'cabecalho_curso'}).append(
            $('<select>', {'class':'sel_questoes inputs_select'}),
            
          ),
          $('<label>', {'text':'Componente ENADE'}),
          $('<div>', {'class':'cabecalho_curso'}).append(
            $('<select>', {'class':'sel_enade inputs_select'}),
            
          ),
          $('<label>', {'text':'Componente DCN'}),
          $('<div>', {'class':'cabecalho_curso'}).append(
            $('<select>', {'class':'sel_dcn inputs_select'}),            
          ),
      ),
      $('<button>', {onclick:'gravarProvaComponente()','id':"gravar_quest", 'class':"btn_normal", 'text':"GRAVAR"})
    );
  }

  function updateSelectQuestoes(){
    for (let index = 1; index <= 35; index++) {
      $('.sel_questoes').append(
        $('<option>', {'value': 'q_'+index, 'text': 'Questão '+ index},'</option>')
      );
    }
  }

  function updateSelectComponenteEnade(json) {
    res = JSON.parse(json);
    console.log(res);
    $('.sel_enade').empty();
    $.each(res, function(){
      $('.sel_enade').append(
        $('<option>', {'value': this, 'text': this},'</option>')
      );
    }); 
  }

  function updateSelectComponenteDcn(json) {
    res = JSON.parse(json);
    $('.sel_dcn').empty();

    $.each(res, function(){   
      $('.sel_dcn').append(
        $('<option>', {'value': this.conteudo, 'text': this.conteudo},'</option>')
      );
    }); 
  }

  function updateSelectAno(curso) {

    normalizedCurso = normalizeChar(curso);
    
    $.ajax({
      url: "provas/buscarAnoProva",
      method: "POST",
      data: {
        'curso': normalizedCurso        
      },
      datatype: "json",
      success: function(json) {       
        if(json){
          let res = JSON.parse(json);
          let cont = 0;
          $('.sel_ano').empty();          
          $.each(res, function(){
            if(cont == 0) {
              $('.sel_ano').append(
                $('<option>', {'value': this['ano'], 'text': this['ano'], 'selected':true},'</option>')
              );             
            } else {
              $('.sel_ano').append(
                $('<option>', {'value': this['ano'], 'text': this['ano']},'</option>')
              );
            }
            cont++;        
          });
        }
      }
    });
  }

  function updateComponentes(curso){
    $.ajax({
      url: "enade/fetchListByCurso",
      method: "POST",
      data: {'curso': curso},
      datatype: "json",
      success: function(json) {
        updateSelectComponenteEnade(json);
      }
    });

    $.ajax({
      url: "dcn/fetchListByCurso",
      method: "POST",
      data: {'curso': curso},
      datatype: "json",
      success: function(json) {
        updateSelectComponenteDcn(json);
      }
    });
  }

  function gravarProvaComponente(){
    let curso = $(".sel_curso").val();
    let ano = $(".sel_ano").val();
    let enade = $(".sel_enade").val();
    let questao = $(".sel_questoes").val();

    $.ajax({
      url: "cursos/teste",
      method: "POST",
      data: {
        'curso': curso,
        'ano': ano,
        'enade': enade,
        'questao': questao,
      },
      datatype: "json",
      success: function(json) {
        alert("Registro gravado");
      }
    });
  }

  function buscaProva(){
    let curso = $(".sel_curso").val();
    let ano = $(".sel_ano").val();
    updateIframe(ano, curso);
  }

  function createIFrame(){
      $(".main_content").append(
        $('<div>', {'id':'box_prova', style: 'height: 800px'}).append(            
            $('<iframe>', {'src':'https://download.inep.gov.br/educacao_superior/enade/provas/2018/administracao.pdf', style:'height: 100%; width:100%'})
        )
    );
  }

  function updateIframe(ano, curso) {
    let normalizedCurso = normalizeChar(curso);
    $.ajax({
      url: "provas/buscarProva",
      method: "POST",
      data: {
        'curso': normalizedCurso,
        'ano': ano,
      },
      datatype: "json",
      success: function(json) {       
        if(json){
          let data = JSON.parse(json);
          $('#box_prova').remove();
          $(".main_content").append(
            $('<div>', {'id':'box_prova', style: 'height: 800px'}).append(             
             $('<iframe>', {'src':data, style:'height: 100%; width:100%'})
            )
          );
        }
      }
    });




    
    
  }

  function normalizeChar(curso) {
    curso = curso.replace(/[ÀÁÂÃÄÅàáâãäå]/g,"a");
    curso = curso.replace(/[ÈÉÊËéèê]/g,"e");
    curso = curso.replace(/[Çç]/g,"c");
    return curso.toLowerCase();
  }
