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
  
  var sendingForm = false;
  
  $("#form-contact").submit(function() {
    if(sendingForm)
      return false;
    sendingForm = true;
    $.ajax({beforeSend: function() { $("#submit").val("Enviando").attr("disabled", "disabled"); }, type: "POST", url: "lib/contact.php", data: {"nome": $("#input-name").val(), "telefone": $("#input-phone").val(), "email": $("#input-email").val(), "mensagem": $("#input-message").val()}}).done(function(message) {
      $("#submit-message").html("<article class=\"message is-info\"><div class=\"message-body\">"+message+"</div></article>");
      $("html, body").animate({
        scrollTop: $("#submit-message").offset().top - 50
      }, 1000);
      $("#submit-message").effect("pulsate", {times: 3}, 1000);
      sendingForm = false;
      $("#submit").val("Enviar").removeAttr("disabled");
    }).error(function(e) {
      alert(e.responseText);
    });
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