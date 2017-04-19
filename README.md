# jquery-dashboard

Demo: see https://brosenberger.github.io/jquery-dashboard/docs/index.html

This library provides a framework for showing a Jira-Like Dashboard and easy creating Widgets.

**Usage**

Install via npm:
```js
npm install jquery-dashboard --save
```

As library embedd dependencies (e.g. with cdn links):

```html
<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js" integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E=" crossorigin="anonymous"></script>
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
```

and dashboard components (styles not yet included, see docs/index.html for inline styling):

```html
<script src="../dist/jquery.dashboard.core.js" charset="utf-8"></script>
<script src="../dist/jquery.dashboard.templates.js" charset="utf-8"></script>
<script src="../dist/jquery.dashboard.jqueryui.js" charset="utf-8"></script>
<script src="../dist/jquery.dashboard.samples.js" charset="utf-8"></script>
```

initialize components:

```js
$(document).ready(function () {
    // initialize dashboard services
    var service = Dashboard.core.default();
    // register sample widgets
    Dashboard.samples.default(service);

    // create dashboard view and refresh list
    var dashboard = $('.dashboard-sortable').dashboard({
        dashboardService: service
    }).dashboard("refresh");
    // initialize widget add dialog
    $('h1 .fa.fa-plus-square').dashboardWidgetDialog({
        dashboardService: service,
        addCallback: function(widgetData) {
            dashboard.dashboard("addWidget", widgetData);
        }
    });

});
```

**Creating your own Widgets**

This is possible with standard require/extension mechanism like within the sample, but also without all js environment.

e.g. a Welcome Widget, just showing some welcome message:

```js
var WelcomeWidget = function () {
    this.type = WelcomeWidget.type;
    this.widgetTemplate=  Dashboard.widgetWelcome;
    this.sizeConfiguration= 'col-xs-12 col-md-6';
};
WelcomeWidget.type = 'welcomeWidget';
WelcomeWidget.prototype = $.extend(Dashboard.core.Widget.prototype, {
    description: {
        title: 'Welcome Widget',
        description: 'Gives you a warm welcome'
    },
    initialize: function (widgetElement) {
        console.log('welcome widget initialized');
    }
});
```

Handlebarlayouts have to initialized when embedding as library:
```js
handlebarsLayouts.register(Handlebars);
Handlebars.registerPartial('widget-layout', Dashboard.templates.layout);
Handlebars.registerPartial('widget-configuration-layout', Dashboard.templates.configurationLayout);
```

Register the widget within the service: 
```js
dashboardService.registerWidget(new WelcomeWidget());
```