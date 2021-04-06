import errors from '@feathersjs/errors';
const request = require('request');
const credentails = require('../../config/default').google_apis.maps;


export default {
  search_address: function (address: String) {
    return new Promise((resolve, reject) => {
      var url = credentails.geocode_url + "&key=" + credentails.api_key + "&address=" + address;
      request.get(url, function (err: any, res: any, body: string) {
        if (body) {
          var value: { results: any[]; status: String };
          value = JSON.parse(body);
          resolve(value);
        }
        else reject;
      });
    });
  },

  distance_matrix: function (origins: String, destinations: String) {
    return new Promise((resolve, reject) => {
      var url = credentails.distancematrix_url + "&key=" + credentails.api_key + "&origins=" + origins + "&destinations=" + destinations;
      request.get(url, function (err: any, res: any, body: string) {
        if (body) {
          var value: { results: any[]; status: String };
          value = JSON.parse(body);
          resolve(value);
        }
        else reject;
      });
    });
  }

};