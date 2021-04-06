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
