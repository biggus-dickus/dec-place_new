// Google map object instance
function initMap() {
  var contentString = '<img class="map__logo" src="img/logos/logo-map.svg" width="242" height="193" alt="DEC place logo">' +
  '<p class="map__address"><strong>Contacts for rent:</strong><br>Larisa Kharchuk<br>+380 50 330 2151, <a href="mailto:Larisa.Kharchuk@dec.ua">Larisa.Kharchuk@dec.ua</a></p>';
  var myCenter = {lat: 50.424999, lng: 30.543397};
  var myMarker = {lat: 50.424002, lng: 30.543470};
  var myStylesArray = [
    {
      featureType: "all",
      stylers: [
        { saturation: -100 },
        { lightness: +10 }
      ]
    }
  ];

  var map = new google.maps.Map(document.getElementById('map'), {
    center: myCenter,
    zoom: 17,
    scrollwheel: false
  });

  var infoWindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: myMarker,
    map: map,
    title: 'Welcome to DEC place!'
  });

  map.setOptions({styles: myStylesArray});
  infoWindow.open(map, marker);
}

// Smooth transition to anchor
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
      || location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
         if (target.length) {
         $('html,body').animate({
           scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });

(function() {
  var formHolder = document.getElementById('form-holder');
  var submitSuccess = document.getElementById('submit-success');
  var form = document.forms['promoform'];
  var name = form['student-name'];
  var phone = form['student-phone'];
  var email = form['student-email'];
  var submitButton = form['promoform-submit'];
  var marker = document.querySelector('.map__holder');

  // Close map marker on click - not needed, since infowindow does it by itself...
  marker.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.id == 'hide-marker') {
      this.classList.add('hidden');
    }
  });

  // Setting the phone mask
  $('#student-phone').mask('+38 000 000 00 00');
  phone.onfocus = function() {
    this.placeholder = '';
    this.classList.add('promoform__number--focused');
  }

  // Form validation
  function enableSubmit() {
    if (
      name.value == '' ||
      phone.value == '' ||
      email.value == ''
    ) {
      submitButton.classList.add('promoform__submit--disabled');
      submitButton.setAttribute('disabled', true);
      return false;
    } else {
      submitButton.classList.remove('promoform__submit--disabled');
      submitButton.removeAttribute('disabled');
      return true;
    }
  }

  // Enabling the submit button only after all required fields are filled in
  window.onload = enableSubmit;
  form.addEventListener('input', enableSubmit);

  // Sending via xhr
  if (!('FormData' in window)) {
  return;
  }

  if (enableSubmit) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      var data = new FormData(form);
      var xhr = new XMLHttpRequest();
      // var time = (new Date()).getTime();

      xhr.open('post', 'index.php');
      xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState == 4) {
          // console.log(xhr.responseText);
          formHolder.classList.add('hidden');
          submitSuccess.classList.remove('hidden');
        }
      });
      xhr.send(data);
    });
  }
})();
