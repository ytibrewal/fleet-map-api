// Initializes the `maps/distance` service on path `/maps/distance`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Distance } from './distance.class';
import hooks from './distance.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'maps/distances': Distance & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/maps/distances', new Distance(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('maps/distances');

  service.hooks(hooks);
}
