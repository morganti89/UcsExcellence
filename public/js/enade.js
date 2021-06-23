$(document).ready(function() {
    let curso = "Administração";
    $.ajax({
        url: "enade/fetchListByCurso",
        method: "POST",
        data: {'curso': curso},
        datatype: "json",
        success: function(json) {
        processRespose(json);
        }
    });
});

$.ajax({
    url: "cursos/fetchList",
    datatype: "json",
    success: function(json) {
      updateSelectProva(json);
    }
});

$(".sel_curso").on('change', function(e){
    limpaLista();
    let curso = this.value;  
    $.ajax({
        url: "enade/fetchListByCurso",
        method: "POST",
        data: {'curso': curso},
        datatype: "json",
        success: function(json) {
        processRespose(json);
        }
    }); 
});

function updateSelectProva(json) {
    res = JSON.parse(json);
    $.each(res, function(){    
      $('.sel_curso').append(
        $('<option>', {'value': this.nome, 'text': this.nome},'</option>')
      );
    });    
  }

function processRespose(data) {
    res = JSON.parse(data);
    console.log(res);
    $.each(res, function(){    
      $("#lista tbody").append(
          $('<tr>', {'nome':this.conteudo}).append(
            $('<td>', {'class':'list_td'}).append(
              $('<a>', {'href':"#", 'text': this.conteudo}) 
            )
          )
        );
    });
}

function limpaLista() {
    $('#lista tbody tr').remove();
}
