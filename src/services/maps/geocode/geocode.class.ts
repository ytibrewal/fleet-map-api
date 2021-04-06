import errors from '@feathersjs/errors';
import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import maps from "../../google_maps";

interface Data { }
interface ServiceOptions { }

export class Geocode implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params: Params): Promise<any> {
    if (!params || !params.query || !params.query.address || params.query.address.constructor != String)
      throw new errors.BadRequest("Invalid Input");
    var output: any = await maps.search_address(params.query.address);

    for (var i in output.results) {
      var doc = output.results[i];
      var address: any = {};
      // address_components
      doc.address_components.forEach((element: any) => {
        if (element.types.includes("country")) address.country = element.long_name;
        else if (element.types.includes("administrative_area_level_1")) {
          address.state = element.long_name;
          address.state_short_name = element.short_name;
        }
        else if (element.types.includes("sublocality")) address.sublocality = element.long_name;
        else if (element.types.includes("locality")) address.city = element.long_name;
        else if (element.types.includes("street_number")) address.addr2 = element.long_name;
        else if (element.types.includes("route")) address.addr2 = address.addr2 ? address.addr2 + " " + element.long_name : element.long_name;
        else if (element.types.includes("postal_code")) address.postal = element.long_name;
      });
      if (!address.city && address.addr2) address.city = address.addr2;
      if (address.city
        && address.addr2
        && address.city == address.addr2
        && address.sublocality) {
        address.addr2 = address.sublocality;
        delete address.sublocality;
      }
      output.results[i] = {
        address_components: address,
        formatted_address: doc.formatted_address,
        geometry: { location: doc.geometry.location }
      };
    };
    return output;
  }

  async get(id: Id, params?: Params): Promise<Data> {
    throw new errors.NotFound("Page Not Found.");
  }

  async create(data: Data, params?: Params): Promise<Data> {
    throw new errors.NotFound("Page Not Found.");
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
