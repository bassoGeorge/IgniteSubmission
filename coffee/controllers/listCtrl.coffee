angular.module('app.controllers')
.controller('ListCtrl',
  ['$scope', 'FoundationMQ', '$state', '$http',
    ($scope, FoundationMQ, $state, $http) ->

      $scope.goToDetails = (code) ->
        if FoundationMQ.matchesMediaOnly("small")
          $state.go("details", { code: code })
        else
          $state.go("home.details", { code: code })

      $scope.data =
        searchText: ''

      $scope.search = () ->
        $http.get("http://www.omdbapi.com", {
          params:
            s: $scope.data.searchText
        }).success(
          (data) ->
            $scope.results = data.Search
        )
])