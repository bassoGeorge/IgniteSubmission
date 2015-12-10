# Misc stuff needed at the top
angular.module('app.controllers')
.controller('TitleCtrl', [
    '$scope', '$state',
    ($scope, $state) ->

      # Whether to show back button or not
      $scope.showBackButton = () ->
        $state.is("details")

      # quick function to get current state, needed by the main ui-views
      $scope.checkState = (state) ->
        $state.includes(state)
  ])