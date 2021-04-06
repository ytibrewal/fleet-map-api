// Initializes the `maps/route` service on path `/maps/route`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Route } from './route.class';
import hooks from './route.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'maps/routes': Route & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/maps/routes', new Route(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('maps/routes');

  service.hooks(hooks);
}
