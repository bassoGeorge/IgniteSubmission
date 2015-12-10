angular.module('app', ['ui.router', 'ngAnimate', 'foundation'])
.config([ '$urlRouterProvider', '$stateProvider',

  ($urlRouterProvider, $stateProvider) ->

    $urlRouterProvider.otherwise('/')
    $stateProvider
    .state('home',
      url: '/'
      templateUrl: 'templates/home.html'
    )
])