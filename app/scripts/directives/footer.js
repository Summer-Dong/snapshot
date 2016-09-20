'use strict';

angular.module('snapshotApp')
    .directive( 'footer', function () {
        return {
            restrict: 'EA',
            templateUrl: '../../views/nav/footer.html',
            replace: true
        };
    });