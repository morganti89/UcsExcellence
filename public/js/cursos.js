
var modal = document.getElementById("cursos_modal");
var btn = document.getElementById("btn_cursos_modal");
var span = document.getElementsByClassName("close")[0];

//busca lista de cursos
$(document).ready(function() {
  $.ajax({
    url: "cursos/carregaLista",
    method: "GET",
    datatype: "json",
    success : function (json) {
      processRespose(json);
    }
  })
});

// Quando o usuário clicar no botão, abrir o modal
btn.onclick = function() {
  modal.style.display = "block";
}

// Quando o usuário clicar no (x), fechar o modal
span.onclick = function() {
  modal.style.display = "none";
}

// Quando o usuário clicar fora do modal, fechar o modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//chamar o controller para gravar os dados
$("#gravar_curso").on("click",function(){
  var curso_nome = $("#curso_nome").val();    
  var curso_area = $("#curso_area").val();
  $.ajax({
      url: "cursos/processAjax",
      method: "POST",
      context: document.body,
      data: {'cursoNome': curso_nome, 'cursoArea': curso_area},
      success : function () {
        alert("Nova inserção realizada com sucesso!");
        location.reload();
      }
  });
});

//processa a resposta do servidor
function processRespose(data) {
  res = JSON.parse(data);  
  $.each(res, function(){    
    $("#lista tbody").append(
        $('<tr>', {'id-curso':this.id}).append(
          $('<td>', {'text':this.nome})
        )
      );
  });
}

$(document).on('click', '#lista tbody tr', function(e){
  console.log($(this).find('id-curso'));
  console.log($(this).find('id-curso').data());
});
