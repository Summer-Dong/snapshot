angular.module('snapshotApp')
	.service('sortByTime', ['$q', function($q) {
		var self = this;
		self.bubbleSort = function(nodesFinal) {
			var deferred = $q.defer();
			//按照时间对结点冒泡排序
			for (var i = nodesFinal.length - 1; i >= 1; i--) {
				for (var j = 0; j < i; j++) {
					var tmp;
					if (nodesFinal[j].time > nodesFinal[j + 1].time) {
						tmp = nodesFinal[j];
						nodesFinal[j] = nodesFinal[j + 1];
						nodesFinal[j + 1] = tmp;
					}
				}
			}
			deferred.resolve(nodesFinal);
			return deferred.promise;
		};
	}]);