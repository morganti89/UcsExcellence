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
    $.each(res, function(){    
      $("#lista tbody").append(
          $('<tr>', {'nome':this}).append(
            $('<td>', {'class':'list_td'}).append(
              $('<a>', {'href':"#", 'text': this}) 
            )
          )
        );
    });
}

function limpaLista() {
    $('#lista tbody tr').remove();
}

$(document).on('click', '.list_td a', function(e){
  var nome = e.target.innerHTML;
  $.ajax({
      url: "cursos/fetchByName",
      method: "POST",
      context: document.body,
      data: {'nome': nome},
      success : function (e) {
        buildModal(JSON.parse(e));
      }
  });
});

