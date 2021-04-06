import errors from '@feathersjs/errors';
import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import tomtom_maps from "../../tomtom_maps";

interface Data { }
interface ServiceOptions { }

export class Nearby implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params: Params): Promise<any> {
    var poi: string[] = [],
      location: string = "",
      output: { [key: string]: any } = {};

    if (params.query) {
      poi = params.query.poi;
      location = params.query.location;
    }

    if (location.length > 0 && poi.length > 0) {
      for (var i in poi) {
        poi[i] = poi[i].trim();
        output[poi[i]] = await tomtom_maps.search_nearby(location, poi[i]);
      }
    }
    return output;
  }

  async get(id: Id, params?: Params): Promise<any> { }
  async create(data: Data, params?: Params): Promise<any> { }
  async update(id: NullableId, data: Data, params?: Params): Promise<any> { }
  async patch(id: NullableId, data: Data, params?: Params): Promise<any> { }
  async remove(id: NullableId, params?: Params): Promise<any> { }
}
