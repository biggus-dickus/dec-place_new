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
