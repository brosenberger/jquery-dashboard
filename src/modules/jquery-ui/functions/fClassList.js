
(function ($) {
    $.fn.extend({
        classList: function (prefix) {
            var list = this[0].className.split(/\s+/);
            if (prefix) {
                var prefixed = [];
                $.each(list, function (index, item) {
                    if (item.startsWith(prefix)) {
                        prefixed[index] = item;
                    }
                });
                return prefixed;
            } else {
                return list;
            }
        }
    });
}(jQuery));