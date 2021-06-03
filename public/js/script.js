$(document).ready(function(){
  loadJsonWithJs();
  $('.carousel').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true
  });
});

function loadJsonWithJs() {
  $.ajax({
    dataType: "json", 
    type: "GET",
    url: "json/data.json", 
    success: function(response_data) {
      parseJSON(response_data);
    },
    error : function(result, status, error) {
      console.log(error);
    }
  });
}

function parseJSON(json) {
  let gallery = json.gallery;
  let portfolio = json.portfolio;
  let formUrl = json.form[0].action;

  for (let i=0; i < gallery.length; i++) {
    let srcImg = gallery[i].img;
    let idDiv = gallery[i].id;
    $("." + idDiv).append($("<img>",{id: srcImg, src: srcImg}));
  }

  for (let i=0; i < portfolio.length; i++) {
    let srcImg = portfolio[i].img;
    let idDiv = portfolio[i].id;
    $("." + idDiv).append($("<img>",{id: srcImg, src: srcImg}));
  }

  masonry();

  $('#sendBtn').click(function(e) {
    loadFormWithJs("json", formUrl)
  })
};

function loadFormWithJs(type, url) {
  animation();
  $('#loading-icon').removeClass('d-none');
  $.ajax({
    dataType: type, 
    type: "GET",
    data: { email:$('#email').val(), message:$('#message').val()},
    url: url, 
    success: function(response_data) {
      $('#loading-icon').addClass('d-none');
      $('#resp').html('Merci pour votre message !');
    },
    error : function(result, status, error) {
      $('#loading-icon').addClass('d-none');
      $('#resp').html("Oups ! Il y a eu un problème lors de l'envoi de votre formulaire.");
      console.log(error);
    }
  });
}

function masonry() {
  let $container = $('.grid');

  let reMasonry = function() {
    $container.masonry();
  };

  // layout Masonry after each image loads
  $('.grid').imagesLoaded().progress( function() {
    $('.grid').masonry('layout');
  });
  // trigger masonry
  $container.masonry({
    itemSelector: '.grid-item',
    animate: true
  });

  $('.grid-item').click(function(){
    var $this = $(this),
        size = $this.hasClass('large') ?
          { width: "20vw" } :
          { width: "40vw"};
    $this.toggleClass('large').animate( size, reMasonry );
  });
};

function animation() {
  bodymovin.loadAnimation({
  container: document.getElementById('loading-icon'),
  path: '/public/img/loadingV2.json',
  renderer: 'svg',
  loop: true,
  autoplay: true,
  });
}
