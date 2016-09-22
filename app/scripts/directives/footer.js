'use strict';

angular.module('snapshotApp')
    .directive( 'footer', function () {
        return {
            restrict: 'EA',
            template: "<div class='footer'><div class='container'><p><span class='glyphicon glyphicon-heart'></span> from Summer Dong</p></div></div>",
            // templateUrl: '../../views/nav/footer.html',
            replace: true
        };
    });