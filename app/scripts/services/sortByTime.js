angular.module('snapshotApp')
	.service('sortByTime', function() {
		var self = this;
		self.bubbleSort = function(nodesFinal) {
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
			self.nodesFinal = nodesFinal;
		};
	});