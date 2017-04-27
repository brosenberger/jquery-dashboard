import _ from 'lodash';

export class Service {
    constructor(dataService) {
        this.dataService = dataService;
        this._availableWidgets = [];
    }
    registerWidget (widgetConfiguration) {
        this._availableWidgets[widgetConfiguration.type] = _.clone(widgetConfiguration);
    }
    findWidgets () {
        return _.extend({}, this._availableWidgets);
    }
    findWidgetData () {
        let that = this;
        return new Promise(function (resolve, reject) {
            that.dataService.findWidgetConfigurations().then(function (widgets) {
                resolve(widgets.map(function (widget) {
                    return that._enrichWidgetData(widget);
                }));
            });
        });
    }
    removeWidgetData (widgetId) {
        this.dataService.removeWidgetConfiguration(widgetId);
    }
    createWidgetData (widgetType) {
        this._checkWidgetType(widgetType);

        let that = this;
        return new Promise(function (resolve, reject) {
            // call data service to generate base data
            that.dataService.createWidgetConfiguration(widgetType)
                .then(function (widgetData) {
                    if (widgetType === 'sampleWidget') {
                        widgetData = _.extend(widgetData, {
                            configurationTitle: 'Config #' + widgetData.id,
                            configurable: Math.round(Math.random()),
                            refreshable: Math.round(Math.random())
                        });
                    }
                    resolve(that._enrichWidgetData(widgetData));
                });

        });
    }
    sortWidgetData (from, to) {
        this.dataService.sortWidgetConfiguration(from, to);
    }
    saveConfiguration(widgetId, configurationData) {
        return this.dataService.saveWidgetConfiguration(widgetId, configurationData);
    }
    _enrichWidgetData (widgetData) {
        this._checkWidgetType(widgetData.type);
        // the widget prototype has to be copied to a new arrays as extend does mutate the original object!
        return _.extend(_.clone(this._availableWidgets[widgetData.type]), widgetData);
    }
    _checkWidgetType (widgetType) {
        if (!this._availableWidgets[widgetType]) {
            throw 'no widget configuration found for type \'' + widgetType + '\'';
        }
    }
}