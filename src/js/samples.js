
import Handlebars from 'handlebars';
import HandlebarLayouts from 'handlebars-layouts';

HandlebarLayouts.register(Handlebars);
Handlebars.registerPartial('widget-layout', require('../handlebars/DashboardTemplates/layout.handlebars'));
Handlebars.registerPartial('widget-configuration-layout', require('../handlebars/DashboardTemplates/configurationLayout.handlebars'));
export {ChuckNorrisWidget} from './samples/ChuckWidget';

export default function initializeDefault(service) {
    service.registerWidget(new DashboardSamples.ChuckNorrisWidget());
}