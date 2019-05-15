$('.cors-it').submit(function() {

  // var domain = "whatsapp://send?text=$.ajax({url:'https://crossorig.in/"+$("#corsit-content").val()+"',method: 'GET',success: function (data) {console.log("Look mom! I've fixed CORS");console.log(data);}});";
  var domain = '#';
  $("#your-domain").text($("#corsit-content").val());
  $(".btn-whatsapp").attr('href', domain);

  $('.main-section').addClass('bye');
  $('.how-it-works').addClass('hello');
  $('.how-it-works').removeClass('see-ya');
  
  $('.solid-text, .shadow-text').text('Loading');
  $('.example-title').addClass('off');
  return false;

});

function CopyToClipboard(containerid) {
  if (document.selection) { 
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerid));
      range.select().createTextRange();
      document.execCommand("Copy");
      copybtn(); 

  } else if (window.getSelection) {
      var range = document.createRange();
       range.selectNode(document.getElementById(containerid));
       window.getSelection().addRange(range);
       document.execCommand("Copy");
       copybtn();
  }
} 

$(".btn-how-it-works").on('click', function(){
  $('.main-section').addClass('bye');
  $('.how-it-works').addClass('hello');
  $('.how-it-works').removeClass('see-ya');
  $('.solid-text, .shadow-text').text('How it works');
})


var $flag = false;
function copybtn() {
  $flag = true;

  if($flag){
    $('.btn-copy').addClass('copied');
    setTimeout(function(){
      $('.btn-copy').removeClass('copied');
    }, 1000)
  }
}

$('.go-back').on('click', function(){
  $('.how-it-works').addClass('see-ya');
  setTimeout(function(){
    $('.main-section').removeClass('bye');
    $('.how-it-works').removeClass('hello');
  }, 500)
})