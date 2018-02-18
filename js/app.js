var app = function() {
  $("nav.nav a").click(function() {
    $("nav.nav a").removeClass("is-active");
    $(this).addClass("is-active");
    var tab = $(this).data("section");
    $(".sections").hide();
    $("#section-" + tab).show("fade", {}, 250);
  });
  
  $("figure.image").backgroundDraggable({axis: 'y' });
  $("#input-phone").mask("(99) 99999-9999", {placeholder: " "});
  
  function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
  
  var sendingForm = false;
  
  /*$("#form-contact").submit(function() {
      if(sendingForm) return false;
      
      if($.trim($("#input-name").val()) == '' || $.trim($("#input-phone").val()) == '' || $.trim($("#input-email").val()) == '' || $.trim($("#input-message").val()) == '') {
        $("#submit-message").html("<article class=\"message is-info\"><div class=\"message-body\">Você precisa preencher todos os campos.</div></article>");
        $("html, body").animate({
          scrollTop: $("#submit-message").offset().top - 50
        }, 1000);
      } else {
        sendingForm = true;
        $.ajax({
          type: "POST",
          dataType: "json",
          url: "https://formspree.io/haroldogondim@hotmail.com",
          beforeSend: function() { 
            $("#submit").val("Enviando").attr("disabled", "disabled"); 
          },
          data: {
            "nome": $("#input-name").val(), 
            "telefone": $("#input-phone").val(), 
            "email": $("#input-email").val(), 
            "mensagem": $("#input-message").val(),
            "_subject": "Novo contato pelo site!"
          }
        }).done(function(message) {
        $("#submit-message").html("<article class=\"message is-info\"><div class=\"message-body\">Eu recebi sua mensagem e em breve respondo, ok? :)</div></article>");
        $("html, body").animate({
          scrollTop: $("#submit-message").offset().top - 50
        }, 1000);
        $("#submit-message").effect("pulsate", {times: 3}, 1000);
        sendingForm = false;
        $("#submit").val("Enviar").removeAttr("disabled");
      }).error(function(e) {
        alert(e.responseText);
      });
    }
  });*/
  
  $("#form-contact").submit(function() {
    if($.trim($("#input-name").val()) == '' || $.trim($("#input-phone").val()) == '' || $.trim($("#input-email").val()) == '' || $.trim($("#input-message").val()) == '') {
      $("#submit-message").html("<article class=\"message is-info\"><div class=\"message-body\">Você precisa preencher todos os campos.</div></article>");
      $("html, body").animate({
        scrollTop: $("#submit-message").offset().top - 50
      }, 1000);
      
      return false;
    } else {
      if(!validateEmail($("#input-email").val())) {
        $("#submit-message").html("<article class=\"message is-info\"><div class=\"message-body\">Digite um e-mail válido.</div></article>");
        $("html, body").animate({
          scrollTop: $("#submit-message").offset().top - 50
        }, 1000);
        
        return false;
      }
    }
  });
  
  $("#input-phone").keydown(function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode == 67 && e.ctrlKey === true) || (e.keyCode == 88 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }
    
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });
};

$(function() {
  app();
});