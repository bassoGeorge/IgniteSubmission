(function() {
  angular.module('app', ['ui.router', 'ngAnimate', 'foundation', 'ct.ui.router.extras.sticky', 'foundation.mediaquery', 'app.controllers']).config([
    '$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/home');
      return $stateProvider.state('home', {
        url: '/home',
        sticky: true,
        views: {
          home: {
            templateUrl: 'templates/home.html'
          }
        }
      }).state('details', {
        params: {
          code: {
            value: null
          }
        },
        url: '/details',
        templateUrl: 'templates/detailsPhone.html',
        controller: 'DetailsCtrl'
      }).state('home.details', {
        url: '/details',
        params: {
          code: {
            value: null
          }
        },
        views: {
          sub: {
            templateUrl: 'templates/detailsDesk.html',
            controller: 'DetailsCtrl'
          }
        }
      });
    }
  ]);

  angular.module('app.controllers', []);

  NProgress.configure({
    showSpinner: false,
    parent: "#main"
  });

}).call(this);

(function() {
  angular.module('app.controllers').controller('DetailsCtrl', [
    '$scope', '$stateParams', '$http', '$location', '$state', function($scope, $stateParams, $http, $location, $state) {
      var baseUrl;
      if (!$stateParams.code) {
        $state.go("home");
      }
      baseUrl = ($location.protocol()) + "://" + ($location.host()) + ":" + ($location.port()) + "/";
      NProgress.start();
      return $http.get("http://www.omdbapi.com", {
        params: {
          i: $stateParams.code
        }
      }).success(function(data) {
        $scope.data = data;
        NProgress.done();
        if (data.Poster) {
          return $http.post(baseUrl + "setimage", {
            imdbID: data.imdbID,
            Poster: data.Poster
          }).success(function(d) {
            if (d.success) {
              return $scope.data.imageUrl = baseUrl + d.imageUrl;
            }
          });
        }
      });
    }
  ]);

}).call(this);

(function() {
  angular.module('app.controllers').controller('ListCtrl', [
    '$scope', 'FoundationMQ', '$state', '$http', function($scope, FoundationMQ, $state, $http) {
      $scope.goToDetails = function(code) {
        if (FoundationMQ.matchesMediaOnly("small")) {
          return $state.go("details", {
            code: code
          });
        } else {
          return $state.go("home.details", {
            code: code
          });
        }
      };
      $scope.data = {
        searchText: ''
      };
      return $scope.search = function() {
        NProgress.start();
        return $http.get("http://www.omdbapi.com", {
          params: {
            s: $scope.data.searchText
          }
        }).success(function(data) {
          $scope.results = data.Search;
          if (!data.Search || $scope.results.length === 0) {
            $scope.error = true;
          } else {
            $scope.error = false;
          }
          return NProgress.done();
        });
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('app.controllers').controller('TitleCtrl', [
    '$scope', '$state', function($scope, $state) {
      $scope.showBackButton = function() {
        return $state.is("details");
      };
      return $scope.checkState = function(state) {
        return $state.includes(state);
      };
    }
  ]);

}).call(this);
