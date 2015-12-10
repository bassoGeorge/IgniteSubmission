angular.module('app', [
  'ui.router', 'ngAnimate', 'foundation',
  'foundation.mediaquery',
  'app.controllers'])
.config([ '$urlRouterProvider', '$stateProvider',

  ($urlRouterProvider, $stateProvider) ->

    $urlRouterProvider.otherwise('/home')
    $stateProvider
    .state('home',
      url: '/home'
      templateUrl: 'templates/home.html'
    )
    .state('details',
      url: '/details'
      templateUrl: 'templates/details.html'
    )
    .state('home.details',
      url: '/details'
      views:
        sub:
          templateUrl: 'templates/details.html'
    )
])

# Just setting up required modules so that the DI doesn't complain on concatenation of files
angular.module('app.controllers', [])