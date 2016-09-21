angular.module('snapshotApp')
	.service('dataToGroup', ['values', function(values) {
		var self = this;

		/*将historyData拆分成nodes数组*/
		self.getNodes = function(historyData) {
			// 获得时间组成的数组
			var timeArray = historyData.match(values.timeRegExp);
			// 获得时间id的长度
			var idLength = historyData.indexOf(timeArray[0]);

			self.nodes = [];
			//由于通过i+1与i的差来获取每个结点值，所以当i为末尾时，没有i+i，因此这里排除i为末尾的情况。
			for (var i = 0; i < timeArray.length - 1; i++) {
				var start = historyData.indexOf(timeArray[i]) - idLength;
				var end = historyData.indexOf(timeArray[i + 1]) - idLength;
				self.nodes.push(historyData.substring(start, end - 1));
			}
			//单独处理i在末尾的情况
			var start = historyData.indexOf(timeArray[i]) - idLength;
			self.nodes.push(historyData.substring(start));
		};
	}]);