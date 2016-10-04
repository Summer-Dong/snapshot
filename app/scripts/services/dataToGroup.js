angular.module('snapshotApp')
	.service('dataToGroup', function() {
		var self = this;

		/*将historyData拆分成nodes数组*/
		self.getNodes = function(historyData, timeRegExp) {
			// 替换字符串中首尾的空白符
			historyData.replace(/(^\s*)|(\s*$)/g, "");
			// 对字符串按照所有类型的空白字符进行分割，得到数组
			var tempData = historyData.split(/\s+/g);
			// 将得到的数组拼接成空格连接的字符串
			historyData = tempData.join(" ");

			// 获得时间组成的数组
			var timeArray = historyData.match(timeRegExp);
			// 获得时间id的长度
			var idLength = historyData.indexOf(timeArray[0]);

			self.nodes = [];
			//由于通过i+1与i的差来获取每个结点值，所以当i为末尾时，没有i+i，因此这里排除i为末尾的情况。
			//正则表达式用于替换结点前后的空格或者换行符
			for (var i = 0; i < timeArray.length - 1; i++) {
				var start = historyData.indexOf(timeArray[i]) - idLength;
				var end = historyData.indexOf(timeArray[i + 1]) - idLength;
				self.nodes.push(historyData.substring(start, end - 1));
			}
			//单独处理i在末尾的情况
			var start = historyData.indexOf(timeArray[i]) - idLength;
			self.nodes.push(historyData.substring(start));
		};
	});