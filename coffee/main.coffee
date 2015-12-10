angular.module('app', [
  'ui.router', 'ngAnimate', 'foundation', 'ct.ui.router.extras.sticky',
  'foundation.mediaquery',
  'app.controllers'])
.config([ '$urlRouterProvider', '$stateProvider',

  ($urlRouterProvider, $stateProvider) ->

    # ----- Setting up the routes -------
    $urlRouterProvider.otherwise('/home')
    $stateProvider
    .state('home',
      url: '/home'
      sticky: true    # Used the ui-router-extras library to have this sticky feature, so that the controller doesn't reload
      views:
        home:
          templateUrl: 'templates/home.html'
    )
    .state('details',     # Details view for mobile devices, as a separate screen
      params:
        code:
          value: null
      url: '/details'
      templateUrl: 'templates/details.html'
      controller: 'DetailsCtrl'
    )
    .state('home.details',    # Details view for larger ones, as a main section on the same single page
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

# A quick and simple progress bar
NProgress.configure({
  showSpinner: false
  parent: "#main"
})