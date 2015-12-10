angular.module('app.controllers')
.controller('DetailsCtrl', [
    '$scope', '$stateParams',
    ($scope, $stateParams) ->
      console.log "Got state params: #{JSON.stringify($stateParams)}"
  ])