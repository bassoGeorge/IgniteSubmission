angular.module('app.controllers')
.controller('ListCtrl',
  ['$scope', 'FoundationMQ', '$state', '$http',
    ($scope, FoundationMQ, $state, $http) ->

      $scope.goToDetails = (obj) ->
        if FoundationMQ.matchesMediaOnly("small")
          $state.go("details", { movie: obj })
        else
          $state.go("home.details", { movie: obj })

      $scope.data =
        searchText: ''

      $scope.search = () ->
        $http.get("http://www.omdbapi.com", {
          params:
            s: $scope.data.searchText
        }).success(
          (data) ->
            if data.Search
              $scope.results = data.Search
            console.log "Got result #{JSON.stringify($scope.results[0])}"
        )
])