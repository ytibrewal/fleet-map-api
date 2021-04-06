import errors from '@feathersjs/errors';
const request = require('request');
const credentails = require('../../config/default').here_map;

const base_url = "https://route.api.here.com/routing/7.2/calculateroute.json?",
  representation = "display",
  mode = "fastest;truck";


export default {
  search_routes: function (locations: any[]) {
    return new Promise((resolve, reject) => {
      var url = `${base_url}app_id=${credentails.app_id}&app_code=${credentails.app_code}&representation=${representation}&mode=${mode}&alternatives=1&routeAttributes=summary`;
      var waypoints = ``;
      for (var i in locations) {
        waypoints = waypoints + `&waypoint${i}=${locations[i][0]},${locations[i][1]}`
      }
      request.get(url + waypoints, function (err: any, res: any, body: any) {
        if (body) {
          body = JSON.parse(body);
          var result: any[] = [];
          for (var x in body.response.route) {
            for (var y in body.response.route[x].shape) {
              var ele = (body.response.route[x].shape[y]).split(",");
              body.response.route[x].shape[y] = { lat: ele[0], lon: ele[1] };
            }
            result.push({
              waypoint: body.response.route[x].waypoint,
              distance: body.response.route[x].summary?.distance,
              travel_time: body.response.route[x].summary?.travelTime,
              linestring: body.response.route[x].shape,
            });
          }
          resolve(result);
        }
        else reject;
      });
    });
  },

};