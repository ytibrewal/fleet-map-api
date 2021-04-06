// Initializes the `geocode` service on path `/geocode`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Geocode } from './geocode.class';
import hooks from './geocode.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'maps/geocodes': Geocode & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/maps/geocodes', new Geocode(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('maps/geocodes');

  service.hooks(hooks);
}
