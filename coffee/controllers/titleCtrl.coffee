angular.module('app.controllers')
.controller('TitleCtrl', [
    '$scope', '$state',
    ($scope, $state) ->
      $scope.showBackButton = () ->
        $state.is("details")
      $scope.checkState = (state) ->
        $state.includes(state)
  ])