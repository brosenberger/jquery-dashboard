require('./../functions/fListGroupFilter.js');

(function ($) {
    $.widget('brocode.dashboardWidgetDialog', {
        options: {
            dashboardService: undefined,
            addCallback: function(widgetData) {
                $(document).trigger('widget.added');
            },
            widgetModal: '#widget-add-modal',
            modalTemplate: require('./../handlebars/addWidgetsDialog.handlebars'),
            listItemTemplate: require('./../handlebars/listGroupItem.handlebars')
        },
        _create: function() {
            var that = this;
            var widgetModal = $(this.options.widgetModal);
            if (widgetModal.length===0) {
                $('body').append(this.options.modalTemplate());
            }
            widgetModal = $(this.options.widgetModal);
            widgetModal.find('#widget-search').listGroupFilter('#widget-list');
            widgetModal.on('click', '.list-group-item .fa.fa-plus', function () {
                that.options.dashboardService.createWidgetData($(this).parents('.list-group-item').data('type')).then(function (widgetData) {
                    that.options.addCallback(widgetData);
                });
            });

            this.element.click(function () {
                widgetModal.find('.list-group-item').remove();
                widgetModal.find('#widget-search').val('');
                widgetModal.modal('show');
                var modalList = widgetModal.find('.list-group');
                var widgetList = that.options.dashboardService.findWidgets();
                for (var widgetType in widgetList) {
                    if (widgetList.hasOwnProperty(widgetType)) {
                        modalList.append(that.options.listItemTemplate(widgetList[widgetType]));
                    }
                }
            })
        }
    });
}(jQuery));