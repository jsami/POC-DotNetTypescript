// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

$(function () {
    // fire input validation event on blur an
    $(document).find('input, textarea, select').on('blur', function (event) {
        $(event.currentTarget).trigger('input-validation-event');
    });

    $(document).find('select').on('change', function (event) {
        $(event.currentTarget).trigger('input-validation-event');
    });
});
