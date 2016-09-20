'use strict';

angular.module('snapshotApp')
    .directive( 'header', function () {
        return {
            restrict: 'EA',
            templateUrl: '../../views/nav/header.html',
            replace: true
        };
    });