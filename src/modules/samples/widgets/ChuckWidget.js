import {Widget} from './../../core/widgets/Widget';

export class ChuckNorrisWidget extends Widget {
    constructor() {
        super('chuckNorrisWidget');
        this.widgetTemplate = require('./../handlebars/widgetChuckNorris.handlebars');
        this.configurationTemplate = require('./../handlebars/widgetChuckNorrisConfiguration.handlebars');
        this.description = {
            title: 'A little story about Chuck',
            description: 'Tells you some random fact about Chuck Norris'
        };
        this.sizeConfiguration = 'col-xs-12 col-md-4';
        this.refreshable = true;
        this.configurable = true;
        this.configuration = {};
    }

    initialize(widgetElement) {
        this.showProgressSpinner(widgetElement);
        let that = this;
        let options = {};
        if (this.configuration["chuck_category"] !== undefined) {
            options["category"] = this.configuration["chuck_category"];
        }
        $.get('https://api.chucknorris.io/jokes/random', options).then(function (data) {
            widgetElement.find('.panel-body').html(data.value);
            that.hideProgressSpinner(widgetElement);
        });
    }

    refresh(widgetElement) {
        this.initialize(widgetElement);
    }
}