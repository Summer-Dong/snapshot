'use strict';

angular.module('snapshotApp')
	.controller('MainCtrl', function() {
		var vm = this;
		vm.inputHistoryData = "e4e87cb2-8e9a-4749-abb6-26c59344dfee 2016/09/02 22:30:46 cat1 10 9 351055db-33e6-4f9b-bfe1-16f1ac446ac1 2016/09/02 22:30:52 cat1 10 9 2 -1 cat2 2 3 dcfa0c7a-5855-4ed2-bc8c-4accae8bd155 2016/09/02 22:31:02 cat1 12 8 3 4";
		vm.ID = "";
		vm.getSnapshot = function(historyData, id) {
			historyData = vm.inputHistoryData;
			// 时间的正则表达式
			var timeRegExp = RegExp(/[1-9][0-9]{3}\/[0-1][0-9]\/[0-3][0-9] [0-9]{2}:[0-9]{2}:[0-9]{2}/g);
			// 获得时间组成的数组
			var timeArray = historyData.match(timeRegExp);
			// 获得时间id的长度
			var idLength = historyData.indexOf(timeArray[0]);


			/*分割结点组成的数组*/
			var nodes = [];
			//由于通过i+1与i的差来获取每个结点值，所以当i为末尾时，没有i+i。因此这里排除i为末尾的情况。
			for (var i = 0; i < timeArray.length - 1; i++) {
				var start = historyData.indexOf(timeArray[i]) - idLength;
				var end = historyData.indexOf(timeArray[i + 1]) - idLength;
				nodes.push(historyData.substring(start, end - 1));
			}
			//单独处理i在末尾的情况
			var start = historyData.indexOf(timeArray[i]) - idLength;
			nodes.push(historyData.substring(start));


			/*处理每个结点*/
			//新建结点数组
			var nodesFinal = [];
			for (var i = 0; i < nodes.length; i++) {
				// 获得时间的字符串
				var slicetime = (nodes[i].match(timeRegExp))[0];
				// 转换成时间对象
				var date=new Date(slicetime);
				// 将时间对象转换成秒数
		        var time=date.getTime();
		        // 替换nodes中的时间字符串为秒数
		        nodes[i]=nodes[i].replace(slicetime,time.toString());  //日期替换成秒数
			}
		};
	});