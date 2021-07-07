var modal_save = document.getElementById("login_modal_save");
var modal_login = document.getElementById("login_modal");
var span = document.getElementsByClassName("close");

$(document).ready(function() {
  modal_login.style.display = "block";
});

$("#login_submit").on('click', function(){
  let email = $("#login_email").val();
  let senha = $("#login_password").val();
  if(!email || !senha){
    alert('EMAIL e/ou SENHA não preenchidos.');
  } else {
    $.ajax({
      url: "login/makeLogin",
      data:{'email':email,'senha':senha},
      method: "POST",      
      datatype: "json",
      success: function(json) {
        res = JSON.parse(json);        
        if(res.id > 0){
          window.location.assign('dashboard');
        } else {
          alert('Usuário não cadastrado no sistema');
        }
      }
    });
  }


  
});
