/*! landing.js | Huro | Css Ninja. 2020-2021 */

/* ==========================================================================
Landing page js
========================================================================== */

"use strict";

$(document).ready(function(){

    const el = document.querySelectorAll('[data-lazy-load]');
    const observer = lozad(el, {
        loaded: function(el) {
            // Custom implementation on a loaded element
            el.parentNode.classList.add('loaded');
        }
    });
    observer.observe();

    $(window).on('scroll', function () {
        var height = $(window).scrollTop();
        if (height > 60) {
            $('.landing-page-wrapper .navbar').removeClass('is-docked');
        } else {
            $('.landing-page-wrapper .navbar').addClass('is-docked');
        }
    });

    $('#night-toggle--daynight, #navbar-night-toggle--daynight').on('change', function () {
        $('.landing-page-wrapper').toggleClass('is-dark');
        if ($(this).attr('id') === 'night-toggle--daynight') {
            if ($(this).prop('checked') === true) {
                $('#navbar-night-toggle--daynight').prop('checked', false);
            } else {
                $('#navbar-night-toggle--daynight').prop('checked', true);
            }

        } else {
            if ($(this).prop('checked') === true) {
                $('#night-toggle--daynight').prop('checked', false);
            } else {
                $('#night-toggle--daynight').prop('checked', true);
            }
        }
    });

    // if mobile menu (navbar-menu) is open on resize (bigger) then close it
    if ("matchMedia" in window) {
        var mql = window.matchMedia('(min-width: 1024px)');
        mql.addEventListener("change", function (e) {
            if (e.matches) {
                if ($('.landing-page-wrapper .navbar-menu').hasClass("is-active")) {
                    $('.landing-page-wrapper .navbar-burger').trigger("click");
                }
            }
        });
    }

    $(".landing-page-wrapper .navbar .nav-link").on("click", function () {
        $('.landing-page-wrapper .navbar .nav-link').removeClass('is-active');
        $(this).addClass('is-active');
        if ($(this).hasClass('is-scroll-to-top')) {
          $('html, body').animate({
              scrollTop: 0
          }, 500);
          return false;
        }
        if ($(this).hasClass('is-scroll')) {
            var fromTop = 50;
            var href = $(this).attr('href');
            if (href !== undefined) {

                if (href.indexOf("#") !== -1) {
                    var str = href;
                    var res = str.split("#");
                    console.log(res);

                    var $target = $("#" + res[1]);

                    if ($target.length) {
                        $('html, body').animate({ scrollTop: $target.offset().top - fromTop });
                    }
                }

            }
        }
        if ($('.landing-page-wrapper .navbar-menu').hasClass("is-active")) {
            $('.landing-page-wrapper .navbar-burger').trigger("click");
        }
    });

    $('.landing-page-wrapper .navbar-burger').on('click', function(){
        if ($('.landing-page-wrapper .navbar-menu').hasClass('is-active')) {
            $('.landing-page-wrapper .navbar').removeClass('is-solid');
        } else {
            $('.landing-page-wrapper .navbar').addClass('is-solid');
        }
        $('.landing-page-wrapper .navbar-menu').toggleClass('is-active');
    });

    initBackToTop();

    // Load experience from configuration
    $.ajax({
        url: 'assets/data/experience.json',
        dataType: 'json',
        success: function (Experience) {
            for (var Section in Experience) {
              var SectionName = Section;
              var SectionComponents = Experience[Section];
              var SectionElement = $(`#${SectionName}`);
              var SectionColumns = $(`#${SectionName} .columns`);
              var SectionComponentBoilerplate = `
            <div class="column is-12">
              <a href="DATA_URL" target="_blank" class="component-box">
                  <div class="avatar-container">
                      <img src="DATA_IMAGE" alt="">
                  </div>
                  <div class="header">
                      <div class="title-wrap">
                        <div class="title">
                          <h3>
                              <span>DATA_NAME</span>
                              FEATURED_ICON
                          </h3>
                          <span>DATA_POSITION</span>
                        </div>
                      </div>

                      <div class="description-wrap">
                          <p>DATA_DESC</p>
                      </div>
                  </div>
                </a>
            </div>`

              if (SectionElement && SectionColumns) {
                for (var ComponentIndex in SectionComponents) {
                  var ComponentInfo = SectionComponents[ComponentIndex];
                  var Identifier = ComponentInfo.Identifier;
                  var Name = ComponentInfo.Name;
                  var Image = ComponentInfo.Image;
                  var Description = ComponentInfo.Description;
                  var Position = ComponentInfo.Position;
                  var Featured = ComponentInfo.Featured;
                  var Component = SectionComponentBoilerplate;

                  Component = Component.replace('DATA_NAME', Name);
                  Component = Component.replace('DATA_IMAGE', Image);
                  Component = Component.replace('DATA_POSITION', Position);
                  Component = Component.replace('DATA_DESC', Description);
                  Component = Component.replace('DATA_TYPE', SectionName);
                  Component = Component.replace('DATA_URL', `/experience.html?Type=${SectionName}&Id=${Identifier}`);

                  if (Featured && Featured == 'true') {
                    Component = Component.replace('component-box', 'component-box featured');
                    Component = Component.replace('FEATURED_ICON', '<i class="fas fa-award"></i>');
                  } else {
                    Component = Component.replace('FEATURED_ICON', '');
                  }

                  SectionColumns.append(Component);
                }

                console.log(`Successfully loaded experience section ${SectionName}`);
              }
            }
        }
    });
})
