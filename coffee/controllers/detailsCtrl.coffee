# Handles the movie details view
angular.module('app.controllers')
.controller('DetailsCtrl', [
    '$scope', '$stateParams', '$http', '$location', '$state',
    ($scope, $stateParams, $http, $location, $state) ->
      if not $stateParams.code
        $state.go "home"

      baseUrl = "#{$location.protocol()}://#{$location.host()}:#{$location.port()}/"

      NProgress.start()     # Get the complete details
      $http.get("http://www.omdbapi.com", {
        params:
          i: $stateParams.code
      }).success(
        (data) ->
          $scope.data = data    # Store it here for the view to access
          NProgress.done()

          # The following procedure is required as we cannot hotlink imdb urls to our web app
          # The server will register our url and serve the images for use
          $http.post(baseUrl + "setimage", {
            imdbID: data.imdbID
            Poster: data.Poster
          }).success((d) ->
            if d.success
              $scope.data.imageUrl = baseUrl + d.imageUrl   # This will be rendered by the view
          )
      )

  ])