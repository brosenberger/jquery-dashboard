require('../templates')

export {ChuckNorrisWidget} from './widgets/ChuckWidget';

export default function initializeDefault(service) {
    service.registerWidget(new Dashboard.samples.ChuckNorrisWidget());
}