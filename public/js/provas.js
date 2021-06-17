  var anos = ['2010','2011','2012','2013','2014','2015','2016','2017','2018', '2019','2020'];
  var questoes = ['D1','D2','D3','D4','D5','D6','D7','D8','D9'];
  
  $(document).ready(function() {

    createSelectProva();
    createSelectComponente();
    
//    createIFrame(); 
    $(".sel_curso").on('change', function(e){
      let curso = this.value;      
      $.ajax({
        url: "enade/fetchListByCurso",
        method: "POST",
        data: {'curso': curso},
        datatype: "json",
        success: function(json) {
          updateSelectComponente(json);
        }
      });
    });
  });

  $.ajax({
    url: "cursos/fetchList",
    datatype: "json",
    success: function(json) {
      updateSelectProva(json);
    }
  });

  function createSelectProva() {
    
    $("#inputs_provas").append(
        $('<div>', {'class':'cabecalho_curso'}).append(
            $('<label>', {'text':'Curso'}),
            $('<div>', {'class':'cabecalho_curso'}).append(
              $('<select>', {'class':'sel_curso'}),
              
            ),
            $('<label>', {'text':'Ano'}),
            $('<div>', {'class':'cabecalho_curso'}).append(
              $('<select>', {'class':'sel_ano'}),
              
            ),
        ),
        $('<button>', {onclick:'buscaProva()','id':"pes_prova", 'class':"btn_normal", 'text':"BUSCAR PROVA"})
    );
  }

  function updateSelectProva(json) {
    res = JSON.parse(json);    

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
            $('<select>', {'class':'sel_questoes'}),
            
          ),
          $('<label>', {'text':'Componente ENADE'}),
          $('<div>', {'class':'cabecalho_curso'}).append(
            $('<select>', {'class':'sel_enade'}),
            
          ),
      ),
      $('<button>', {onclick:'GravarProvaComponente()','id':"gravar_quest", 'class':"btn_normal", 'text':"GRAVAR"})
  );
  }

  function updateSelectComponente(json) {
    res = JSON.parse(json);
    console.log(res);
    $('.sel_questoes').empty();
    $('.sel_enade').empty();

    $.each(questoes, function(){
      $('.sel_questoes').append(
        $('<option>', {'value': this, 'text': this},'</option>')
      );
    });

    $.each(res, function(){   
      $('.sel_enade').append(
        $('<option>', {'value': this.conteudo, 'text': this.conteudo},'</option>')
      );
    }); 
  }

  function GravarProvaComponente(){
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

    console.log('https://download.inep.gov.br/educacao_superior/enade/provas/'+ano+'/'+normalizedCurso+'.pdf');

    $('#box_prova').remove();
    $(".main_content").append(
      $('<div>', {'id':'box_prova', style: 'height: 800px'}).append(            
        $('<iframe>', {'src':'https://download.inep.gov.br/educacao_superior/enade/provas/'+ano+'/'+normalizedCurso+'.pdf', style:'height: 100%; width:100%'})
      )
    );
  }

  function normalizeChar(curso) {
    curso = curso.replace(/[ÀÁÂÃÄÅàáâãäå]/g,"a");
    curso = curso.replace(/[ÈÉÊËéèê]/g,"e");
    curso = curso.replace(/[Çç]/g,"c");
    return curso.toLowerCase();
  }
