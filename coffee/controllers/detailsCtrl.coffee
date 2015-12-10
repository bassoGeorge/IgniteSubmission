angular.module('app.controllers')
.controller('DetailsCtrl', [
    '$scope', '$stateParams', '$http',
    ($scope, $stateParams, $http) ->
      console.log "Got state params: #{JSON.stringify($stateParams)}"

      $http.get("http://www.omdbapi.com", {
        params:
          i: $stateParams.code
      }).success(
        (data) ->
          $scope.data = data
      )
  ])