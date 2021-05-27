/* Slider (work in progress)
 * 03/09/2015 by Andrew Errico
 */
$(function() {

    // slider type
    $t = "slide"; // opitions are fade and slide
    
  	//variables
      $f = 1000,  // fade in/out speed
      $s = 1000,  // slide transition speed (for sliding carousel)
      $d = 5000;  // duration per slide
       
    $n = $('.slide').length; //number of slides
    $w = $('.slide').width(); // slide width
  	$c = $('.container1').width(); // container width
   	$ss = $n * $w; // slideshow width
  
  	
      function timer() {
        $('.timer').animate({"width":$w}, $d);
        $('.timer').animate({"width":0}, 0);
    }

  
  // fading function
    function fadeInOut() {
      timer();
        $i = 0;    
        var setCSS = {
            'position' : 'relative',
            'top' : '0',
            'left' : '0'
        }        
        
        $('.slide').css(setCSS);
        
        //show first item
        $('.slide').eq($i).show();
        

        setInterval(function() {
          timer();
            $('.slide').eq($i).fadeOut($f);
            if ($i == $n - 1) {
                $i = 0;
            } else {
                $i++;
            }
            $('.slide').eq($i).fadeIn($f, function() {
                $('.timer').css({'width' : '0'});
            });

        }, $d);
        
    }
    
    function slide() {
      timer();
        var setSlideCSS = {
            'float' : 'left',
            'display' : 'inline-block',
          	'width' : $c
        }
        var setSlideShowCSS = {
            'width' : $ss // set width of slideshow container
        }
        $('.slide').css(setSlideCSS);
        $('.slideshow').css(setSlideShowCSS); 
        
        
        setInterval(function() {
            timer();
            $('.slideshow').animate({"left": -$w}, $s, function(){
                // to create infinite loop
                $('.slideshow').css('left',0).append( $('.slide:first'));
            });
        }, $d);
        
    }
    
    if ($t == "fade") {
        fadeInOut();
        
    } if ($t == "slide") {
        slide();
        
    } else {
      
    }
          
      $('[data-toggle="counter-up"]').counterUp({
        delay: 120,
        time: 1000
      });


        
      // "use strict";
      // document.addEventListener('DOMContentLoaded', function () {
      //     if (window.hideYTActivated) return;
      //     if (typeof YT === 'undefined') {
      //         let tag = document.createElement('script');
      //         tag.src = "https://www.youtube.com/iframe_api";
      //         let firstScriptTag = document.getElementsByTagName('script')[0];
      //         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      //     }
      //     let onYouTubeIframeAPIReadyCallbacks = [];
      //     for (let playerWrap of document.querySelectorAll(".hytPlayerWrap")) {
      //         let playerFrame = playerWrap.querySelector("iframe");
      //         let onPlayerStateChange = function (event) {
      //             if (event.data == YT.PlayerState.ENDED) {
      //                 playerWrap.classList.add("ended");
      //             }
      //             else if (event.data == YT.PlayerState.PAUSED) {
      //                 playerWrap.classList.add("paused");
      //             }
      //             else if (event.data == YT.PlayerState.PLAYING) {
      //                 playerWrap.classList.remove("ended"); playerWrap.classList.remove("paused");
      //             }
      //         };
      //         let player;
      //         onYouTubeIframeAPIReadyCallbacks.push(function () {
      //             player = new YT.Player(playerFrame, { events: { 'onStateChange': onPlayerStateChange } });
      //         });
      //         playerWrap.addEventListener("click", function () {
      //             let playerState = player.getPlayerState();
      //             if (playerState == YT.PlayerState.ENDED) {
      //                 player.seekTo(0);
      //             }
      //             else if (playerState == YT.PlayerState.PAUSED) {
      //                 player.playVideo();
      //             }
      //         });
      //     }
      //     window.onYouTubeIframeAPIReady = function () {
      //         for (let callback of onYouTubeIframeAPIReadyCallbacks) {
      //             callback();
      //         }
      //     };
      //     window.hideYTActivated = true;
      // });


      var slides = document.querySelectorAll('.slide');
      var btns = document.querySelectorAll('.btn');
      let currentSlide = 1;
      // Javascript for image slider manual navigation
      var manualNav = function (manual) {
          slides.forEach((slide) => {
              slide.classList.remove('active');
              btns.forEach((btn) => {
                  btn.classList.remove('active');
              });
          });
          slides[manual].classList.add('active');
          btns[manual].classList.add('active');
      }
      btns.forEach((btn, i) => {
          btn.addEventListener("click", () => {
              manualNav(i);
              currentSlide = i;
          });
      });

      // Javascript for image slider autoplay navigation

      var repeat = function (activeClass) {
          let active = document.getElementsByClassName('active');
          let i = 1;
          var repeater = () => {
              setTimeout(function () {
                  [...active].forEach((activeSlide) => {
                      activeSlide.classList.remove('active');
                  });
                  if (currentSlide != i) {
                      i = currentSlide;
                      currentSlide = i;
                  }
                  slides[i].classList.add('active');
                  btns[i].classList.add('active');
                  i++;
                  currentSlide++;
                  if (slides.length == i) {
                      i = 0;
                      currentSlide = 0;
                  }
                  if (i >= slides.length) {
                      return;
                  }
                  repeater();
              }, 4000);
          }
          repeater();
      }
      repeat();
        
        
});
