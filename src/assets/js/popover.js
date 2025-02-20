/*! popover.js | Huro | Css Ninja 2020-2021 */

/* ==========================================================================
Ajax User Popovers
========================================================================== */

"use strict";

$(document).ready(function () {
    const Observer = new MutationObserver(Record => {
      initTextPopovers();
    });

    Observer.observe(document.body, {
      childList: true,
      attributes: true,
      subtree: true,
      characterData: false
    });

    function initTextPopovers() {
        $('*[data-toggle="popover"]').each(function () {
            var mode = $(this).attr('data-pop-mode');
            var title = $(this).attr('data-pop-title');
            var content = $(this).attr('data-pop-content');
            var position = $(this).attr('data-pop-position');
            var width = $(this).attr('data-pop-width');
            var avatar = $(this).attr('data-pop-avatar');
            var icon = $(this).attr('data-pop-icon');
            var iconColor = $(this).attr('data-pop-iconbg');
            var avatarHtml = '';
            var iconHtml = '';

            if (avatar != null && avatar != undefined) {
                avatarHtml = `
                    <div class="h-avatar is-small">
                        <img class="avatar" src="${avatar}" alt="">
                    </div>
                `;
            }

            else if (icon != null && icon != undefined) {
                iconHtml = `
                    <div class="h-icon is-small is-${iconColor}">
                        <i class="${icon}"></i>
                    </div>
                `;
            }

            $(this).webuiPopover({
                trigger: mode,
                width: width,
                animation: 'pop',
                placement: position,
                style: 'default',
                content: function () {
                    var template = `
                        <div class="popover-head">
                            ${avatarHtml}
                            ${iconHtml}
                            <h4 class="dark-inverted">${title}</h4>
                        </div>
                        <div class="popover-body">
                            <p>${content}</p>
                        </div>
                    `;

                    return template;
                }
            });
        })
    }

    initTextPopovers();


    function initUserPopovers() {
        $('*[data-user-popover]').each(function () {
            var e = $(this);
            var userRef = $(this).attr('data-user-popover');

            var mailIcon = feather.icons.mail.toSvg();
            var phoneIcon = feather.icons.phone.toSvg();
            var profileIcon = feather.icons['more-horizontal'].toSvg();


            $.ajax({
                url: 'assets/data/user.json',
                dataType: 'json',
                success: function (data) {
                    e.webuiPopover({
                        trigger: 'hover',
                        placement: 'auto',
                        width: 300,
                        padding: false,
                        offsetLeft: 0,
                        offsetTop: 20,
                        animation: 'pop',
                        style: 'profile',
                        cache: false,
                        content: function () {

                            var destroyLoader = setTimeout(function () {
                                $('.loader-overlay').removeClass('is-active');
                            }, 500);

                            if (data[userRef].pic != null) {
                                var html = `
                                    <div class="profile-popover-block">

                                        <div class="loader-overlay is-active">
                                            <div class="loader is-loading"></div>
                                        </div>

                                        <div class="profile-popover-wrapper">
                                            <div class="popover-avatar">
                                                <img class="avatar" src="${data[userRef].pic}">
                                                <img class="badge" src="${data[userRef].badge}">
                                            </div>
                                            <div class="popover-meta">
                                                <span class="user-meta">
                                                    <span class="username">${data[userRef].name}</span>
                                                    <span class="location">${data[userRef].location}</span>
                                                </span>
                                                <span class="job-title">${data[userRef].position}</span>
                                                <span class="bio">${data[userRef].bio}</span>
                                            </div>
                                        </div>
                                        <div class="popover-actions">
                                            <a class="popover-icon">
                                                ${phoneIcon}
                                            </a>
                                            <a class="popover-icon">
                                                ${mailIcon}
                                            </a>
                                            <a class="popover-icon">
                                                ${profileIcon}
                                            </a>
                                        </div>
                                    </div>
                                `;
                            } else {
                                var classes = new Array('is-danger', 'is-info', 'is-primary', 'is-success', 'is-warning', 'is-h-purple', 'is-h-blue', 'is-h-green', 'is-h-orange', 'is-h-red', 'is-h-green');
                                var length = classes.length;
                                var randomClass = classes[Math.floor(Math.random() * length)];

                                var html = `

                                    <div class="profile-popover-block">

                                        <div class="loader-overlay is-active">
                                            <div class="loader is-loading"></div>
                                        </div>

                                        <div class="profile-popover-wrapper">
                                            <div class="popover-fake-avatar ${randomClass}">
                                                <div class="fake-avatar">
                                                    <span>${data[userRef].initials}</span>
                                                </div>
                                                <img class="badge" src="${data[userRef].badge}">
                                            </div>
                                            <div class="popover-meta">
                                                <span class="user-meta">
                                                    <span class="username">${data[userRef].name}</span>
                                                    <span class="location">${data[userRef].location}</span>
                                                </span>
                                                <span class="job-title">${data[userRef].position}</span>
                                                <span class="bio">${data[userRef].bio}</span>
                                            </div>
                                        </div>
                                        <div class="popover-actions">
                                            <a class="popover-icon">
                                                ${phoneIcon}
                                            </a>
                                            <a class="popover-icon">
                                                ${mailIcon}
                                            </a>
                                            <a class="popover-icon">
                                                ${profileIcon}
                                            </a>
                                        </div>

                                    </div>
                                `;
                            }
                            return html;
                            return destroyLoader;

                        }
                    });
                }
            });
        });
    }

    initUserPopovers();

    /* Users

        0. Alice Carasca
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/7.jpg" alt="" data-user-popover="0">

        1. Anna Baker
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/9.jpg" alt="" data-user-popover="1">

        2. Joshua Spencer
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/12.jpg" alt="" data-user-popover="2">

        3. Erik Kovalsky
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/8.jpg" alt="" data-user-popover="3">

        4. Melany Wallace
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/25.jpg" alt="" data-user-popover="4">

        5. Jimmy Hector
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/22.jpg" alt="" data-user-popover="5">

        6. Tara Svenson
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/13.jpg" alt="" data-user-popover="6">

        7. Esteban Castellanos
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/18.jpg" alt="" data-user-popover="7">

        8. Henry Grobstone
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/10.jpg" alt="" data-user-popover="8">

        9. Mary Lebowski
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/5.jpg" alt="" data-user-popover="9">

        10. Carmen Escudero
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/27.jpg" alt="" data-user-popover="10">

        11. Jeanne Marchand
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/40.jpg" alt="" data-user-popover="11">

        12. Daniel Redbird
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/34.jpg" alt="" data-user-popover="12">

        13. Kelly Marston
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/11.jpg" alt="" data-user-popover="13">

        14. Ryan Brentman
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/14.jpg" alt="" data-user-popover="14">

        15. Hilde Von Strauss
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/15.jpg" alt="" data-user-popover="15">

        16. Jason Guarank
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/16.jpg" alt="" data-user-popover="16">

        17. Greta Kroppfer
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/19.jpg" alt="" data-user-popover="17">

        19. Elizabeth Fisher
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/21.jpg" alt="" data-user-popover="19">

        20. Dwayne Hicks
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/22.jpg" alt="" data-user-popover="20">

        21. Irina Vierbovsky
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/23.jpg" alt="" data-user-popover="21">

        22. Sandrine Coulart
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/24.jpg" alt="" data-user-popover="22">

        23. Courtney Wilson
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/26.jpg" alt="" data-user-popover="23">

        24. Edouard Falant
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/28.jpg" alt="" data-user-popover="24">

        25. Hakeem Calami
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/29.jpg" alt="" data-user-popover="25">

        26. Clément Dufour
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/30.jpg" alt="" data-user-popover="26">

        27. Yasseen Amzi
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/31.jpg" alt="" data-user-popover="27">

        28. Jonathan Krugger
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/32.jpg" alt="" data-user-popover="28">

        29. Harvey Miller
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/33.jpg" alt="" data-user-popover="29">

        30. Benoit Leblanc
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/36.jpg" alt="" data-user-popover="30">

        31. Helmut Fritz
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/37.jpg" alt="" data-user-popover="31">

        32. Christie Dallas
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/38.jpg" alt="" data-user-popover="32">

        33. Alejandro Badajoz
        <img class="avatar" src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/photos/39.jpg" alt="" data-user-popover="33">

        34. John Daniels (no pic)
        data-user-popover="34"

        35. Sara Connor (no pic)
        data-user-popover="35"

        36. Betty Trejo (no pic)
        data-user-popover="36"

        37. Alan Thorne (no pic)
        data-user-popover="37"

        38. Naomi Liversky(no pic)
        data-user-popover="38"
    */

})
