require('./fClassList.js');

(function ($) {
    $.widget('brocode.dashboard', {
        _grid: undefined,
        _widgets: [],
        options: {
            dashboardService: undefined
        },
        _create: function () {
            this._initDashboard(this.element);
            this._initRefreshAction(this.element);
            this._initRemoveAction(this.element);
            this._initConfigureAction(this.element);
        },
        addWidget: function (widgetData) {
            this._widgets[widgetData.id] = widgetData;
            var widgetElement = this.element.append(widgetData.widgetTemplate(widgetData))
                .sortable('refresh')
                .find('.widget.widget-' + widgetData.id)
                .show(400);
            widgetData.initializeContent(widgetElement);
            this.element.trigger('widget.added', widgetData);
        },
        refresh: function () {
            var that = this;
            this.element.html('');
            this._widgets = [];
            this.options.dashboardService.findWidgetData().then(function (widgets) {
                widgets.forEach(function (w) {
                    that.addWidget(w);
                });
            });

        },
        _initRemoveAction: function (grid) {
            var that = this;
            grid.on('click', '.fa.fa-trash', function () {
                var widget = $(this).parents('.widget');
                widget.hide(400, function () {
                    widget.remove();
                    grid.trigger('widget.removed', that._widgets[widget.data('widgetId')]);
                });
            });
            return this;
        },
        _initRefreshAction: function (grid) {
            var that = this;
            grid.on('click', '.fa.fa-refresh', function () {
                var widgetData = that._widgets[$(this).parents('.widget').data('widgetId')];
                widgetData.refreshContent($(this).parents('.widget'));
                grid.trigger('widget.refreshed', widgetData);
            });
            return this;
        },
        _initConfigureAction: function (grid) {
            var that = this;
            grid.on('click', '.fa.fa-cog', function () {
                var widgetData = that._widgets[$(this).parents('.widget').data('widgetId')];
                bootbox.dialog({
                    title: widgetData.configurationTitle,
                    message: widgetData.configurationTemplate({
                        id: widgetData.id,
                        value: 'ein wert'
                    }),
                    size: 'large',
                    onEscape: true,
                    buttons: {
                        save: {
                            label: 'Speichern',
                            className: 'btn-primary',
                            callback: function (result) {
                                return widgetData.configurationSaveCallback(widgetData, result);
                            }
                        }
                    }
                });
            });
            return this;
        },
        _initDashboard: function (grid) {
            grid.sortable({
                placeholder: {
                    element: function (currentItem) {
                        return '<div class="' + currentItem.classList('col-').join(' ') + ' placee"></div>';
                    },
                    update: function (contianer, p) {
                    }
                },
                scroll: true,
                handle: '.panel-heading',
                tolerance: 'pointer',
                update: function (event, ui) {
                    var startIndex = ui.item.data('startIndex');
                    var endIndex = ui.item.index();

                    grid.trigger('widget.sorted', {from: startIndex, to: endIndex});
                },
                start: function (e, ui) {
                    ui.item.data('startIndex', ui.item.index());
                    ui.placeholder.height(ui.item.find('.panel').innerHeight());
                    ui.placeholder.width(ui.item.find('.panel').width());
                },
                forcePlaceholderSize: true
            });
            return this;
        }
    });
}(jQuery));