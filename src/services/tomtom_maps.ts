import errors from '@feathersjs/errors';
const request = require('request');
const credentails = require('../../config/default').tomtom_map;

const base_url = "https://api.tomtom.com/search/2",
  endpoints: { [key: string]: string } = {
    "search_along_route": "searchAlongRoute",
    "search_nearby": "nearbySearch"
  };

const maxDetourTime = "1200";
const default_radious = 5000; // in meters

const poi: { [key: string]: Number } = {
  "Truck Stop": 7358,
  "Gas Station": 7311,
  "Rest Area": 7395,
  "Weigh Station": 7359,
  "Truck Wash": 9155003
};


export default {
  search_along_route: function (route_points: any[], place: String) {
    return new Promise((resolve, reject) => {
      var options = {
        method: 'POST',
        url: `${base_url}/${endpoints.search_along_route}/${place}.json?key=${credentails.api_key}&maxDetourTime=${maxDetourTime}`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ route: { points: route_points } })
      };
      request(options, function (error: any, response: any) {
        if (error) {
          throw new errors.BadRequest(error);
        }
        else if (response.body) {
          var value = { results: (JSON.parse(response.body)).results };
          for (var i in value.results) {
            value.results[i] = {
              poi: value.results[i].poi,
              position: value.results[i].position
            }
          };
          resolve(value);
        }
      });
    });
  },

  search_nearby: function (location: string, search_poi: string) {
    return new Promise((resolve, reject) => {
      var [lat, lon] = location.replace(" ", "").split(",", 2);
      var url = `${base_url}/${endpoints.search_nearby}.json?key=${credentails.api_key}&radius=${default_radious}&lat=${lat}&lon=${lon}&categorySet=${poi[search_poi]}`;
      request.get(url, function (err: any, res: any, body: any) {
        if (body) {
          body = JSON.parse(body);
          resolve(body);
        }
        else reject;
      });
    });
  }
};