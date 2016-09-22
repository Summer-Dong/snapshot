'use strict';

angular.module('snapshotApp')
    .directive( 'header', function () {
        return {
            restrict: 'EA',
            template: "<div class='header'><div class='navbar navbar-default' role='navigation'><div class='container'><div class='navbar-header'><button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#js-navbar-collapse'><span class='sr-only'>Toggle navigation</span><span class='icon-bar'></span><span class='icon-bar'></span><span class='icon-bar'></span></button><a class='navbar-brand' href='#/'>snapshot</a></div><div class='collapse navbar-collapse' id='js-navbar-collapse'><ul class='nav navbar-nav'><li><a href='#/' when-active>Home</a></li><li><a ng-href='#/about' when-active>About</a></li><li><a ng-href='#/contact' when-active>Contact</a></li></ul></div></div></div> <div class='bgImg'></div></div>",
            replace: true
        };
    });