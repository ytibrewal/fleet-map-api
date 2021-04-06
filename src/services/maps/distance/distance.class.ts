import errors from '@feathersjs/errors';
import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import maps from "../../google_maps";

interface Data { }
interface ServiceOptions { }

export class Distance implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params: Params): Promise<any> {
    throw new errors.NotFound("Page Not Found.");
  }

  async get(id: Id, params?: Params): Promise<Data> {
    throw new errors.NotFound("Page Not Found.");
  }

  async create(data: any, params?: Params): Promise<Data> {
    var origins: String[] = [],
      destinations: String[] = [];
    if (data && data.constructor === Object) data = [data];
    for (var x in data) {
      if (data[x].origin && data[x].destination) {
        origins.push(data[x].origin);
        destinations.push(data[x].destination);
      }
    }
    var result: any = await maps.distance_matrix(origins.join("|"), destinations.join("|"));
    for (var i in result.rows) {
      data[i].distance = result.rows[i].elements[i].distance.value;
      data[i].duration = result.rows[i].elements[i].duration.value;
    }
    return data;
  }

  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    throw new errors.NotFound("Page Not Found.");
  }

  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    throw new errors.NotFound("Page Not Found.");
  }

  async remove(id: NullableId, params?: Params): Promise<Data> {
    throw new errors.NotFound("Page Not Found.");
  }
}
