angular.module('snapshotApp')
	.service('values', function( ) {
		var self = this;
		self.timeRegExp = RegExp(/[1-9][0-9]{3}\/[0-1][0-9]\/[0-3][0-9] [0-9]{2}:[0-9]{2}:[0-9]{2}/g);
		self.error = "Invalid format.";
	});