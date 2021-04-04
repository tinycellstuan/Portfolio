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
            var HTML = "";
            var Groups = Experience.Groups;
            var Organizations = Experience.Organizations;
            var Projects = Experience.Projects;
            var Other = Experience.Other;

            for (var Index in Organizations) {
              var Organization = Groups[Index];
              var Name = Organization.Name;
              var Identifier = Organization.Identifier;
              var Members = Organization.Members;
              var Active = Organization.Active;
              //var DevelopingTag = Active && `<span class="tag is-success">Developing</span>`;
              var Element = `
              <div class="column is-5">
                <a href="/elements-colors.html" target="_blank" class="component-box">
                      <div class="component">
                          <img class="light-image-l" src="assets/img/icons/components/colors.svg"alt=""  data-lazy-load>
                          <img class="dark-image-l" src="assets/img/icons/components/colors-dark.svg"alt=""  data-lazy-load>
                      </div>

                      <div class="component-title">${Name}</div>
                      <div class="is-divider"></div>

                      <div class="tags has-addons">
                         <span class="tag is-primary">Members</span>
                         <span class="tag">${Members}</span>

                         ${DevelopingTag}
                      </div>
                  </a>
              </div>`

              //$('#demo-elements').append(Element);
            }
        }
    });
})
