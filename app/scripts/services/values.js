angular.module('snapshotApp')
	.service('values', function( ) {
		var self = this;
		self.timeRegExp = RegExp(/[1-9][0-9]{3}\/[0-1][0-9]\/[0-3][0-9] [0-2][0-9]:[0-6][0-9]:[0-6][0-9]/g);
		self.error = "Invalid format.";
	});
