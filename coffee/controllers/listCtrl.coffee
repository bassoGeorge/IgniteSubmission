# Handles the search and list features
angular.module('app.controllers')
.controller('ListCtrl',
  ['$scope', 'FoundationMQ', '$state', '$http',
    ($scope, FoundationMQ, $state, $http) ->

      # Computing correct details view
      $scope.goToDetails = (code) ->
        if FoundationMQ.matchesMediaOnly("small")
          $state.go("details", { code: code })
        else
          $state.go("home.details", { code: code })

      # Search input
      $scope.data =
        searchText: ''

      # Search function on submit
      $scope.search = () ->
        NProgress.start()
        $http.get("http://www.omdbapi.com", {
          params:
            s: $scope.data.searchText
        }).success(
          (data) ->
            $scope.results = data.Search
            if not data.Search or $scope.results.length == 0
              $scope.error = true     # to show a message of no results in view
            else
              $scope.error = false
            NProgress.done()
        )
])