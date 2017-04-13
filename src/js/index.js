
import Handlebars from 'handlebars';
import HandlebarLayouts from 'handlebars-layouts';


export {Widget} from './widgets/Widget';
export {DataService} from './services/DataService';
export {LocalStorageDataService} from './services/LocalStorageDataService';
export {Service} from './services/Service';

HandlebarLayouts.register(Handlebars);
Handlebars.registerPartial('widget-layout', require('../handlebars/DashboardTemplates/layout.handlebars'));
Handlebars.registerPartial('widget-configuration-layout', require('../handlebars/DashboardTemplates/configurationLayout.handlebars'));

export default function initializeDashboardDefaults() {
    let dataService = new Dashboard.LocalStorageDataService('storage');
    let service = new Dashboard.Service(dataService);
    return service;
}

require('./view/DashboardView.js');