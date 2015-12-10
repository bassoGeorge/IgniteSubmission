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
      params:
        code:
          value: null
      url: '/details'
      templateUrl: 'templates/details.html'
      controller: 'DetailsCtrl'
    )
    .state('home.details',
      url: '/details'
      params:
        code:
          value: null
      views:
        sub:
          templateUrl: 'templates/details.html'
          controller: 'DetailsCtrl'
    )
])

# Just setting up required modules so that the DI doesn't complain on concatenation of files
angular.module('app.controllers', [])

NProgress.configure({
  showSpinner: false
  parent: "#main"
})