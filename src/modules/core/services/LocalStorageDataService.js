import {DataService} from "./DataService";

export class LocalStorageDataService extends DataService{
    constructor(storageLocation) {
        super();
        this.storageLocation = storageLocation;
    }

    createWidgetConfiguration (widgetType) {
        let that = this;

        return new Promise(function (resolve, reject) {
            let widgetData = that._generateRandomWidgetData(widgetType);
            let widgets = that._findStoredWidgets();
            widgets.push(widgetData);
            that._saveStoredWidgets(widgets);

            resolve(widgetData);
        });
    }

    findWidgetConfigurations () {
        let that = this;
        return new Promise(function (resolve, reject) {
            resolve(that._findStoredWidgets());
        });
    }

    removeWidgetConfiguration (widgetId) {
        let widgetList = this._findStoredWidgets();
        widgetList = widgetList.filter(function (widgetData) {
            return widgetData.id !== widgetId;
        });
        this._saveStoredWidgets(widgetList);
    }
    sortWidgetConfiguration(from, to) {
        let widgetList = this._findStoredWidgets();

        let orderWidgetList =[];
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while ((k--) + 1) {
                orderWidgetList.push(undefined);
            }
        }
        this.splice(new_index, 0, orderWidgetList.splice(old_index, 1)[0]);

        this._saveStoredWidgets(orderWidgetList);
    }
    saveWidgetConfiguration(widgetId, configuration) {
        let that = this;
        return new Promise(function(resolve, reject) {

            let widgets = that._findStoredWidgets();
            widgets.forEach(function (w) {
               if (w.id === widgetId) {
                   w.configuration = configuration;
               }
            });
            that._saveStoredWidgets(widgets);

            resolve(configuration);
        });
    }
    _findStoredWidgets () {
        let widgets = localStorage.getItem(this.storageLocation);
        if (widgets === undefined || widgets === null) {
            widgets = [];
        } else {
            widgets = JSON.parse(widgets);
        }
        return widgets;
    }
    _loadStoredWidget(widgetId) {
        let widgets = this._findStoredWidgets();

    }

    _saveStoredWidgets (widgets) {
        localStorage.setItem(this.storageLocation, JSON.stringify(widgets));
    }

    _generateRandomWidgetData (widgetType) {
        return {
            id: this._generateUUID(),
            type: widgetType
        };
    }
    _generateUUID () {
        let d = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}