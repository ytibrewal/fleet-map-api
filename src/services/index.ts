import { Application } from '../declarations';
import mapsGeocode from './maps/geocode/geocode.service';
import mapsDistance from './maps/distance/distance.service';
import mapsRoute from './maps/route/route.service';
import mapsNearby from './maps/nearby/nearby.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
    app.configure(mapsGeocode);
    app.configure(mapsDistance);
    app.configure(mapsRoute);
    app.configure(mapsNearby);
}
