# fleet-map-api

> Map services for Trucks in a Logestic companies 

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

2. Install your dependencies

    ```
    cd path/to/fleet-map-api
    npm install
    ```
3. Insert API Keys at config/default.json

4. Start your app

    ```
    npm start
    ```
## Examples

1. Getting Distance Matrix 

    ```
    POST {{base-url}}/maps/distances
    [
        {
            "origin": "jaipur india",
            "destination": "delhi india"
        }
    ]   

    output -->
    [
        {
            "origin": "jaipur india",
            "destination": "delhi india",
            "distance": 272866,
            "duration": 18020
        }
    ]
    ```

    
2. Getting Geocodes with formatted addresses  
    ```
    GET {{base-url}}/maps/geocodes?address=My Street, , New York .
    
    output -->
    {
        "results": [
            {
                "address_components": {
                    "addr2": "247 West 72nd Street",
                    "sublocality": "Manhattan",
                    "city": "New York",
                    "state": "New York",
                    "state_short_name": "NY",
                    "country": "United States",
                    "postal": "10023"
                },
                "formatted_address": "247 W 72nd St, New York, NY 10023, USA",
                "geometry": {
                    "location": {
                        "lat": 40.7795974,
                        "lng": -73.9833534
                    }
                }
            }
        ],
        "status": "OK"
    }
    ```

