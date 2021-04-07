/*! lifestyle-1.js | Huro | Css ninja 2020-2021 */

"use strict";

$(document).ready(function () {
        const el = document.querySelectorAll('[data-lazy-load]');
        const observer = lozad(el, {
            loaded: function(el) {
                // Custom implementation on a loaded element
                el.parentNode.classList.add('loaded');
            }
        });
        observer.observe();

        const Window = window;
        const Search = Window.location.search;
        const Modifiers = new URLSearchParams(Search);
        const Type = Modifiers.get('Type');
        const Identifier = Modifiers.get('Id');
        const Sections = {
          "Name": document.getElementById('DATA_NAME'),
          "Image": document.getElementById('DATA_IMAGE'),
          "Description": document.getElementById('DATA_DESC'),
          "Position": document.getElementById('DATA_POSITION'),
          "Tags": document.getElementById('DATA_TAGS'),
          "Badges": document.getElementById('DATA_BADGES'),
          "Stacks": document.getElementById('DATA_STACKS'),
          "Links": document.getElementById('DATA_LINKS'),
          "Members": document.getElementById('DATA_MEMBERS'),
          "Visits": document.getElementById('DATA_VISITS'),
          "Revenue": document.getElementById('DATA_REVENUE'),
          "Gallery": document.getElementById('DATA_GALLERY')
        };

        $.ajax({
            url: 'assets/data/experience.json',
            dataType: 'json',
            success: function (Experience) {
              var DisplayError = false;

              if (Type && Identifier) {
                var ExperienceSection = Experience[Type];
                var ExperienceData = null;

                for (var ExperienceIndex in ExperienceSection) {
                  if (ExperienceSection[ExperienceIndex].Identifier && ExperienceSection[ExperienceIndex].Identifier == Identifier) {
                    ExperienceData = ExperienceSection[ExperienceIndex];
                  }
                }

                if (ExperienceData) {
                  var Name = ExperienceData.Name;
                  var Image = ExperienceData.Image;
                  var Description = ExperienceData.Description;
                  var Position = ExperienceData.Position;
                  var Featured = ExperienceData.Featured;
                  var Active = ExperienceData.Active;
                  var Stacks = ExperienceData.Stacks;
                  var Links = ExperienceData.Links;
                  var Members = ExperienceData.Members;
                  var Visits = ExperienceData.Visits;
                  var Revenue = ExperienceData.Revenue;
                  var Showcase = ExperienceData.Showcase;

                  Sections.Image.src = Image;
                  Sections.Name.innerHTML = Name;
                  Sections.Position.innerHTML = Position;
                  Sections.Description.innerHTML = Description;
                  Sections.Members.innerHTML = Members;
                  Sections.Visits.innerHTML = Visits;
                  Sections.Revenue.innerHTML = Revenue;
                } else {
                  DisplayError = true;
                }
              } else {
                DisplayError = true;
              }

              if (DisplayError) {
                Window.location.href = "/error.html";
              }
            }
          })
})
