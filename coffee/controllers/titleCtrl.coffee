angular.module('app.controllers')
.controller('TitleCtrl', [
    '$scope', '$state',
    ($scope, $state) ->
      $scope.showBackButton = () ->
        $state.is("details")
  ])