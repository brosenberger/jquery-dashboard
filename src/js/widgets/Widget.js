
export class Widget {

    constructor(type) {
        this.type = type;
        this.sizeConfiguration = "col-xs-12 col-md-4";
        this.configurable = false;
        this.refreshable = false;
    }
    initialize(widgetElement) {
        throw 'initialize - I have to be implemented by the widget!'
    }
    configure (widgetElement) {
        window.alert('i have to be configured!');
    }
    initializeContent(widgetElement) {
        if (this.configurable && this.configurationCallback === undefined && this.configuration === undefined) {
            this.configure(widgetElement)
        } else {
            this.initialize(widgetElement);
        }
    }
    refreshContent(widgetElement) {
        if (this.refreshable && this.refresh === undefined) {
            throw 'refresh - i have to have a refresh method!';
        } else {
            this.refresh(widgetElement);
        }
    }
    showProgressSpinner(widgetElement) {
        widgetElement.find('.panel-body').fadeOut(300, function() {
            widgetElement.find('.panel-loading').fadeIn(500);
        });
    }
    hideProgressSpinner(widgetElement) {
        widgetElement.find('.panel-loading').fadeOut(300, function() {
            widgetElement.find('.panel-body').fadeIn(500);
        });
    }
}