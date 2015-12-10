# Handles the movie details view
angular.module('app.controllers')
.controller('DetailsCtrl', [
    '$scope', '$stateParams', '$http',
    ($scope, $stateParams, $http) ->

      NProgress.start()     # Get the complete details
      $http.get("http://www.omdbapi.com", {
        params:
          i: $stateParams.code
      }).success(
        (data) ->
          $scope.data = data    # Store it here for the view to access
          NProgress.done()
      )
  ])