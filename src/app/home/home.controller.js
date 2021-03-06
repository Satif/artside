(function () {

  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(Data, $timeout, HomeService) {
    var self = this;
    
    self.data = Data[0];

    self.sendMail = sendMail;

    $timeout(function() {
      /* ---------------------------------------------------------------------- */
      /*  Index map
       /* ---------------------------------------------------------------------- */

      var gmapDiv = $("#google-map");
      var gmapMarker = gmapDiv.attr("data-address");

      gmapDiv.gmap3({
        zoom: 16,
        address: gmapMarker,
        oomControl: true,
        navigationControl: true,
        scrollwheel: false,
        styles: [
          {
            "featureType":"all",
            "elementType":"all",
            "stylers":[
              { "saturation":"-70" }
            ]
          }]
      })
        .marker({
          address: gmapMarker,
          icon: "/assets/images/map_pin.png"
        })
        .infowindow({
          content: "ArtSide, Drohobych"
        })
        .then(function (infowindow) {
          var map = this.get(0);
          var marker = this.get(1);
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
        });


      /* Scroll to Top
       -------------------------------------------------------*/

      $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
          $("#back-to-top").addClass("show");
        } else {
          $("#back-to-top").removeClass("show");
        }
      });

      $('a[href="#top"]').on('click', function () {
        $('html, body').animate({scrollTop: 0}, 'slow');
        return false;
      });

      initOnepagenav();

      function initOnepagenav() {
        $('.navigation-overlay .navbar-collapse ul li a, .nav-type-4 .navbar-collapse ul li a').on('click', function () {
          $('.navbar-toggle:visible').click();
        });

        // Smooth Scroll Navigation
        $('.local-scroll-no-offset').localScroll({offset: {top: 0}, duration: 1500, easing: 'easeInOutExpo'});
      }
    }, 0);


    function sendMail() {
      HomeService.sendEmail(self.contactForm).then(function(resp) {
        self.contactForm = null;
      });
    }
  }

})();
