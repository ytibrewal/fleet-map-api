import errors from '@feathersjs/errors';
import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import here_maps from "../../here_maps";
import tomtom_maps from "../../tomtom_maps";

interface Data { }
interface Location { lat: Number, lon: Number }
interface ServiceOptions { }

export class Route implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async find(params: Params) {
    var query: any = params.query;
    var waypoints: any = [];
    var output: any = {};
    if (query.mode == "Waypoints" && query.waypoints && query.waypoints.constructor == Array) {
      for (var i in query.waypoints) {
        query.waypoints[i] = query.waypoints[i].replace(" ", "").split(",");
      }
      waypoints = query.waypoints;
    }
    else throw new errors.BadRequest("Invalid");
    if (waypoints.length < 2) throw new errors.BadRequest("Waypoints must be atleast Two.");
    output.routes = await here_maps.search_routes(waypoints);

    if (query.stopalong && query.stopalong.constructor == Array && output.routes.length > 0) {
      for (var i in query.stopalong) {
        output[query.stopalong[i]] = await tomtom_maps.search_along_route(output.routes[0].linestring, query.stopalong[i]);
      }
    }
    return output;
  }

  async create(data: any, params: Params): Promise<any> { }
  async get(id: Id, params: Params): Promise<any> { }
  async update(id: NullableId, data: Data, params?: Params): Promise<any> { }
  async patch(id: NullableId, data: Data, params?: Params): Promise<any> { }
  async remove(id: NullableId, params?: Params): Promise<any> { }
}
