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

      xhr.open('post', 'index.php');
      xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState == 4) {
          formHolder.classList.add('hidden');
          submitSuccess.classList.remove('hidden');
        }
      });
      xhr.send(data);
    });
  }
})();
