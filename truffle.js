module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "bower_components/angular/angular.js",
      "bower_components/angular/angular-route.js",
      "javascripts/app.js" 
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/",
    "views": "views"
  },
  rpc: {
    host: "localhost",
    port: 8545
  },
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
