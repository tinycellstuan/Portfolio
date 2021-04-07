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
                  var Note = ExperienceData.Note;
                  var Boilerplates = {
                    "Tag": `
                    <span class="tag is-rounded VAR_COLOR">VAR_NAME</span>
                    `,
                    "Badge": `
                    <div class="meta-achievement VAR_COLOR_1" data-toggle="popover" data-pop-mode="hover"
                        data-pop-width="220" data-pop-title="VAR_NAME"
                        data-pop-content="VAR_DESC"
                        data-pop-position="top" data-pop-icon="VAR_ICON"
                        data-pop-iconbg="VAR_COLOR_2"> <i class="VAR_ICON_2"></i> </div>`,

                    "Stack": `
                    <div class="media-flex-center">
                        <div class="h-avatar is-small">
                            <img class="avatar" src="VAR_ICON" data-demo-src="VAR_ICON" alt="">
                        </div>
                        <div class="flex-meta">
                            <span>VAR_NAME</span>
                            <span>VAR_DESC</span>
                        </div>
                    </div>
                    `,

                    "ShowcaseImage": `
                    <a href="VAR_IMAGE">
                        <img src="VAR_IMAGE" alt="">
                    </a>
                    `
                  };

                  Sections.Image.src = Image;
                  Sections.Name.innerHTML = Name;
                  Sections.Position.innerHTML = Position;
                  Sections.Description.innerHTML = Description;
                  Sections.Members.innerHTML = Members;
                  Sections.Visits.innerHTML = Visits;
                  Sections.Revenue.innerHTML = Revenue;

                  if (Featured && Featured == 'true') {
                    var Badge = Boilerplates.Badge;
                    var Tag = Boilerplates.Tag;

                    Tag = Tag.replace('VAR_COLOR', 'is-primary');
                    Tag = Tag.replace('VAR_NAME', 'Featured');

                    Badge = Badge.replace('VAR_NAME', 'Featured');
                    Badge = Badge.replace('VAR_DESC', 'This group or project accurately represents my work-ethic, and skill.');
                    Badge = Badge.replace('VAR_COLOR_1', 'is-primary');
                    Badge = Badge.replace('VAR_COLOR_2', 'primary');
                    Badge = Badge.replace('VAR_ICON', 'fas fa-award');
                    Badge = Badge.replace('VAR_ICON_2', 'fas fa-award');

                    Sections.Tags.innerHTML += Tag;
                    Sections.Badges.insertAdjacentHTML('beforeend', Badge);
                  }

                  if (Active && Active == 'false' || !Active) {
                    var Badge = Boilerplates.Badge;

                    Badge = Badge.replace('VAR_NAME', 'Departed');
                    Badge = Badge.replace('VAR_DESC', 'I am no longer apart of this group or project listed here.');
                    Badge = Badge.replace('VAR_COLOR_1', 'is-danger');
                    Badge = Badge.replace('VAR_COLOR_2', 'red');
                    Badge = Badge.replace('VAR_ICON', 'fas fa-unlink');
                    Badge = Badge.replace('VAR_ICON_2', 'fas fa-unlink');

                    Sections.Badges.innerHTML += Badge;
                  }

                  if (Note && Note !== 'false') {
                    var Badge = Boilerplates.Badge;

                    Badge = Badge.replace('VAR_NAME', 'Note');
                    Badge = Badge.replace('VAR_DESC', Note);
                    Badge = Badge.replace('VAR_COLOR_1', '');
                    Badge = Badge.replace('VAR_COLOR_2', 'dark-sidebar');
                    Badge = Badge.replace('VAR_ICON', 'fas fa-exclamation');
                    Badge = Badge.replace('VAR_ICON_2', 'fas fa-exclamation');

                    Sections.Badges.innerHTML += Badge;
                  }
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
