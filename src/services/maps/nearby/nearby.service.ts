// Initializes the `maps/nearby` service on path `/maps/nearby`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Nearby } from './nearby.class';
import hooks from './nearby.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'maps/nearby': Nearby & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/maps/nearby', new Nearby(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('maps/nearby');

  service.hooks(hooks);
}
