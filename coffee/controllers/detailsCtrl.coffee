# Handles the movie details view
angular.module('app.controllers')
.controller('DetailsCtrl', [
    '$scope', '$stateParams', '$http', '$location',
    ($scope, $stateParams, $http, $location) ->

      baseUrl = "#{$location.protocol()}://#{$location.host()}:#{$location.port()}/"

      NProgress.start()     # Get the complete details
      $http.get("http://www.omdbapi.com", {
        params:
          i: $stateParams.code
      }).success(
        (data) ->
          $scope.data = data    # Store it here for the view to access
          NProgress.done()
          $http.post(baseUrl + "setimage", {
            imdbID: data.imdbID
            Poster: data.Poster
          }).success((d) ->
            if d.success
              $scope.data.imageUrl = baseUrl + d.imageUrl
          )
      )

  ])