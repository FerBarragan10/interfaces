$(document).ready(function(){
    $('button').click(function(){
      $('button').parent().addClass('active');
      setTimeout(function(){
        $('button').addClass('success');
      }, 3400);
      setTimeout(function(){
        alert("Your file uploaded successfully!");
        $('button').parent().removeClass('active');
        $('button').removeClass('success');
      }, 4200);
    });
  });