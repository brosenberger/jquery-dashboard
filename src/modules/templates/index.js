
import Handlebars from 'handlebars';
import HandlebarLayouts from 'handlebars-layouts';

export const layout = require('./handlebars/layout.handlebars');
export const configurationLayout =  require('./handlebars/configurationLayout.handlebars');

HandlebarLayouts.register(Handlebars);
Handlebars.registerPartial('widget-layout', layout);
Handlebars.registerPartial('widget-configuration-layout', configurationLayout);

