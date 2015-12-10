angular.module('app.controllers')
.controller('ListCtrl',
  ['$scope', 'FoundationMQ', '$state',
    ($scope, FoundationMQ, $state) ->

      $scope.checkMedia = () ->
        res = FoundationMQ.matchesMediaOnly("small")
        console.log "Result of match: #{res}"

      $scope.goToDetails = () ->
        if FoundationMQ.matchesMediaOnly("small")
          $state.go "details"
        else
          $state.go "home.details"
])