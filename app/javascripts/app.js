var app = angular.module("mySimpleWalletDapp", ['ngRoute']);

app.controller('MainController'), function($scope){
    $scope.myVar = 'Main';
});

app.controller('ShowEventsController'), function($scope){
    $scope.myVar = 'Showevents';
});

app.controller('SendFundsController'), function($scope){
    $scope.myVar = 'Sendfunds';
});

app.config(function($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "views/main.html",
        controller: "MainController"
    }).when("/events", {
        templateUrl: "views/events.html",
        controller: "ShowEventsController"
    }).when("/sendfunds", {
        templateUrl: "views/sendFunds.html",
        controller: "SendFundsController"
    }).otherwise({redirectTo: '/'});
})

