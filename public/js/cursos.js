
var modal_save = document.getElementById("cursos_modal_save");
var modal_curso = document.getElementById("curso_modal");
var btn = document.getElementById("btn_cursos_modal");
var span = document.getElementsByClassName("close");

//////////////////////////////////////////////
////////FUNÇÕES DO AUXILIARES/////////////////
//////////////////////////////////////////////
// Quando o usuário clicar no botão, abrir o modal
btn.onclick = function() {
  modal_save.style.display = "block";
}

// Quando o usuário clicar no (x), fechar o modal
span[0].onclick = function() {
  modal_save.style.display = "none";
}

span[1].onclick = function() {
  curso_modal.style.display = "none";
  $(".div_content").remove();
}

// Quando o usuário clicar fora do modal, fechar o modal
window.onclick = function(event) {
  if (event.target == modal_save || event.target == modal_curso) {
    modal_save.style.display = "none";  
    curso_modal.style.display = "none";
    $(".div_content").remove();   
  }
}

//////////////////////////////////////
////////FUNÇÕES DO JS/////////////////
//////////////////////////////////////
//processa a resposta do servidor
function processRespose(data) {
  res = JSON.parse(data);  
  $.each(res, function(){    
    $("#lista tbody").append(
        $('<tr>', {'id-curso':this.id}).append(
          $('<td>', {'class':'list_td', 'text':this.nome})
        )
      );
  });
}
//construir o modal a partir da resposta
function buildModal(data) {
  $(".curso_modal").append('<div>',{'class': 'modal_content'});
  disciplinas = [
    "Programação", "Bioética"
  ];

  componenteEnade = [
    "Sociologia"
  ];

  componenteDcn = [
    "Formatação Profissional: Materias"
  ]
  
  modal_curso.style.display = "block";
  $(".modal_content").append(
    $('<div>', {'class': 'div_content'}).append(
      $('<h3> ', {'class': 'titulo_modal','text': data[0].nome}),
      $('<div>', {'class': 'div_modal'}).append(
        $('<label>', {'text':'Disciplina'}),
        $('<select>', {'class':'sel_dis'}),
        $('<label>', {'text':'Componente ENADE'}),
        $('<select>', {'class':'sel_comp_enade'}),
        $('<label>', {'text':'Componente DCN'}),
        $('<select>', {'class':'sel_comp_dcn'}),
      )
    )
  );

  $.each(disciplinas, function(index, value){
    console.log(value);
    $('.sel_dis').append(
      $('<option>', {'value': value, 'text': value},'</option>')
    );
  });

  $.each(componenteEnade, function(index, value){
    console.log(value);
    $('.sel_comp_enade').append(
      $('<option>', {'value': value, 'text': value},'</option>')
    );
  });

  $.each(componenteDcn, function(index, value){
    console.log(value);
    $('.sel_comp_dcn').append(
      $('<option>', {'value': value, 'text': value},'</option>')
    );
  });

  
}

//////////////////////////////////////////
////////FUNÇÕES DO JQUERY/////////////////
//////////////////////////////////////////
//busca lista de cursos
$(document).ready(function() {
  $.ajax({
    url: "cursos/fetchList",
    method: "GET",
    datatype: "json",
    success : function (json) {
      processRespose(json);
    }
  })
});

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

$(document).on('click', '#lista tbody tr', function(e){
  //console.log($(this).find('td:eq(0)').text());  
  //console.log($(this).attr('id-curso'));  
  var id = $(this).attr('id-curso');  
  $.ajax({
      url: "cursos/fetchById",
      method: "POST",
      context: document.body,
      data: {'id': id},
      success : function (e) {
        buildModal(JSON.parse(e));
      }
  });
});


