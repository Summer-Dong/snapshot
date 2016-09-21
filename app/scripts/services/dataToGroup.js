angular.module('snapshotApp')
	.service('dataToGroup', ['$q', function($q) {
		var self = this;

		/*将historyData拆分成nodes数组*/
		self.getNodes = function(historyData) {
			var deferred = $q.defer();
			// 时间的正则表达式
			var timeRegExp = RegExp(/[1-9][0-9]{3}\/[0-1][0-9]\/[0-3][0-9] [0-9]{2}:[0-9]{2}:[0-9]{2}/g);
			// 获得时间组成的数组
			var timeArray = historyData.match(timeRegExp);
			// 获得时间id的长度
			var idLength = historyData.indexOf(timeArray[0]);

			var nodes = [];
			//由于通过i+1与i的差来获取每个结点值，所以当i为末尾时，没有i+i，因此这里排除i为末尾的情况。
			for (var i = 0; i < timeArray.length - 1; i++) {
				var start = historyData.indexOf(timeArray[i]) - idLength;
				var end = historyData.indexOf(timeArray[i + 1]) - idLength;
				nodes.push(historyData.substring(start, end - 1));
			}
			//单独处理i在末尾的情况
			var start = historyData.indexOf(timeArray[i]) - idLength;
			nodes.push(historyData.substring(start));

			deferred.resolve(nodes);
			return deferred.promise;
		};
	}]);