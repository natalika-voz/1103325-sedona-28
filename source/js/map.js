ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
          center: [34.869500, -111.760190],
          zoom: 9
      }, {
          searchControlProvider: 'yandex#search'
      }),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: '/img/svg/map-marker.svg',
        // Размеры метки.
        iconImageSize: [27, 27],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-14, -14]
    });

    myMap.geoObjects.add(myPlacemark);
});
