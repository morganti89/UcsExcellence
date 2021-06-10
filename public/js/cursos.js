
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
        $('<tr>', {'nome':this.curso}).append(
          $('<td>', {'class':'list_td', 'text':this.curso})
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

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
 function chunkRows(myArray, chunk_size){
  var results = [];
  
  while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
  }
  
  return results;
}

function createPaginationButtons(json){
  let totalPages = Math.ceil(json/20);
  for (let index = 1; index <= totalPages; index++) {
    $(".pages").append(
      $('<div>', {'class':'btn_page page_div'}).append(
        $('<p>', {'text': index}),
      )
    )
  }
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

//////////////////////////////////////////
////////FUNÇÕES DO JQUERY/////////////////
//////////////////////////////////////////
//busca lista de cursos
$(document).ready(function() {
  makePagination(1); //primeira página
  $.ajax({
    url: "cursos/getCount",
    datatype: "json",
    success: function(json) {
      createPaginationButtons(json);
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
  var nome = $(this).attr('nome');
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

$(".browser_file").on('click', function(){
  var file = $(this).parent().find(".file_selector");  
  file.trigger("click");
});

$('input[type="file"]').change(function(event){
  var fileUpload = document.getElementById("fileUpload");
  var reader = new FileReader();
  var excelRows;
  reader.onload = function(event) {    
    var workbook = XLSX.read(event.target.result, {
      type: 'binary'
    });
    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];    
    //Read all rows from First Sheet into an JSON array.
    excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);

    var chunk = chunkRows(excelRows, 500);
    for (let index = 0; index < chunk.length; index++) {
      var element = chunk[index];
        $.ajax({
        url: "cursos/saveSpreadsheet",
        method: "POST",
        context: document.body,
        data: {'data': element}       
      });
    }   
  };

  reader.readAsBinaryString(fileUpload.files[0]);
  
});


$('.pages').on('click', function(e){
  var pageNumber = Number.parseInt(e.target.innerHTML);
  if(pageNumber){
    let page = e.target.innerHTML;
    makePagination(page);
  }
});