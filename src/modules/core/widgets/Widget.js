
export class Widget {

    constructor(type) {
        this.type = type;
        this.sizeConfiguration = "col-xs-12 col-md-4";
        this.configurable = false;
        this.refreshable = false;
        this.configurationTitle = "Configure me";
    }
    initialize(widgetElement) {
        throw 'initialize - I have to be implemented by the widget!'
    }
    configurationValues (widgetElement) {
        let transformed = {};
        widgetElement.find('form').serializeArray().forEach(function(element){
            transformed[element.name] = element.value;
        });
        return transformed;
    }
    initializeConfigurationValues(configurationDialog) {
        for (var key in this.configuration) {
            configurationDialog.find('[name="'+key+'"]').val(this.configuration[key]).trigger('change');
        }
    }
    showConfigurationOverlay(widgetElement) {
        widgetElement.find('.panel-body').fadeOut(300, function() {
            widgetElement.find('.panel-notconfigured').fadeIn(500);
        });
    }
    hideConfigurationOverlay(widgetElement) {
        widgetElement.find('.panel-notconfigured').fadeOut(300, function() {
            widgetElement.find('.panel-body').fadeIn(500);
        });
    }
    initializeContent(widgetElement) {
        if (this.configurable && this.configuration === undefined) {
            this.showConfigurationOverlay(widgetElement);
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
    updateConfiguration(widgetElement, configuration) {
        this.configuration = configuration;
        this.initialize(widgetElement);
    }
}