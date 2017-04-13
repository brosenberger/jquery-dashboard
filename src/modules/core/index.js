export {Widget} from './widgets/Widget';
export {DataService} from './services/DataService';
export {LocalStorageDataService} from './services/LocalStorageDataService';
export {Service} from './services/Service';


export default function initializeDashboardDefaults() {
    let dataService = new Dashboard.core.LocalStorageDataService('storage');
    let service = new Dashboard.core.Service(dataService);
    return service;
}