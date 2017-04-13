(function ($) {
    $.fn.extend({
        listGroupFilter: function (listToFilter) {
            var that = this;
            that.on('keyup', function () {
                var li;
                var filterValue = that.val().toUpperCase();
                var listItems = $(listToFilter).find('.list-group-item-heading, .list-group-item-text');
                listItems.filter(function () {
                    return $(this).text().toUpperCase().indexOf(filterValue) > -1;
                }).parent('.list-group-item').show().attr('data-search', filterValue);
                listItems.parent('.list-group-item:not([data-search=\'' + filterValue + '\'])').hide();
            });
            return this;
        }
    });
})(jQuery);