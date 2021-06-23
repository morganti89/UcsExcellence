
var modal_save = document.getElementById("cursos_modal_save");
var modal_curso = document.getElementById("curso_modal");
var btn = document.getElementById("btn_cursos_modal");
var span = document.getElementsByClassName("close");
 
$(document).ready(function() {
  createPaginationButtons();
  makePagination(1); //primeira página
  $('.pages').on('click', function(e){
    var pageNumber = Number.parseInt(e.target.innerHTML);
    if(pageNumber){
      let page = e.target.innerHTML;
      makePagination(page);
    }
  });
});

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
        $('<tr>', {'nome':this.nome}).append(
          $('<td>', {'class':'list_td'}).append(
            $('<a>', {'href':"#", 'text': this.nome})            
          )
        )
      );
  });
}

//construir o modal a partir da resposta
function buildModal(data) {
  $(".curso_modal").append('<div>',{'class': 'modal_content'});
  $("#text_curso").val(data[0].nome);
  modal_curso.style.display = "block";
  $(".modal_content").append(
    $('<div>', {'class': 'div_content'}).append(
      $('<h3> ', {'id':'curso_titulo', 'class': 'titulo_modal','text': data[0].nome}),
      $('<div>', {'class': 'div_modal'}).append(
        $('<label>', {'text':'Disciplina'}),
        $('<select>', {'class':'sel_dis inputs_select'}),
        $('<label>', {'text':'Componente ENADE'}),
        $('<select>', {'class':'sel_enade inputs_select'}),
        $('<label>', {'text':'Componente DCN'}),
        $('<select>', {'class':'sel_dcn inputs_select'})        
      )
    )    
  );

  $.ajax({
    url: "enade/fetchListByCurso",
    method: "POST",
    data: {'curso': data[0].nome},
    datatype: "json",
    success: function(json) {
      updateSelectEnade(json);
    }
  });

  $.ajax({
    url: "dcn/fetchListByCurso",
    method: "POST",
    data: {'curso': data[0].nome},
    datatype: "json",
    success: function(json) {
      updateSelectDcn(json);
    }
  });

}

function updateSelectEnade(json) {
  res = JSON.parse(json);
  $.each(res, function(){   
    $('.sel_enade').append(
      $('<option>', {'value': this.conteudo, 'text': this.conteudo},'</option>')
    );
  }); 
}

function updateSelectDcn(json) {
  res = JSON.parse(json);
  console.log(res);
  $.each(res, function(){   
    $('.sel_dcn').append(
      $('<option>', {'value': this.conteudo, 'text': this.conteudo},'</option>')
    );
  }); 
}


function createPaginationButtons(){

  $.ajax({
    url: "cursos/getCount",
    datatype: "json",
    success: function(json) {
      let totalPages = Math.ceil(json/20);
        for (let index = 1; index <= totalPages; index++) {
          $(".pages").append(
            $('<div>', {'class':'btn_page page_div'}).append(
              $('<a>', {'href':"#", 'text': index})
            )
          )
        }
    }
  });


  
}

function makePagination(page) {
  $('#lista tbody tr').remove();
  $.ajax({
    url: "cursos/fetchListPage",
    method: "POST",
    data:{'page': page},
    datatype: "json",
    success : function (json) {
      processRespose(json);
    }
  });
}

const deleteButton = () => {
  let curso;
  const setCurso = (data) => {
    this.curso = data
  }

  const getCurso = () => {
    return this.curso;
  }
};

//////////////////////////////////////////
////////FUNÇÕES DO JQUERY/////////////////
//////////////////////////////////////////

//chamar o controller para gravar os dados
$("#gravar_curso").on("click",function(){
  var curso_nome = $("#curso_nome").val();
  $.ajax({
      url: "cursos/gravaCurso",
      method: "POST",
      context: document.body,
      data: {'cursoNome': curso_nome},
      success : function () {
        alert("Nova inserção realizada com sucesso!");
        location.reload();
      }
  });
});

$("#btn_delete_curso").on('click', function(){
  let curso = $('#text_curso').val();
  $.ajax({
    url: "cursos/deletaCurso",
    method: "POST",
    context: document.body,
    data: {'curso': curso},
    success : function (e) {
      alert("Exclusão realizada com sucesso!");
      location.reload();
    }
  });
});

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

