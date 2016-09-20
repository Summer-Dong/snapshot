'use strict';

angular.module('snapshotApp')
	.controller('MainCtrl', function() {
		var vm = this;
		vm.inputHistoryData = "e4e87cb2-8e9a-4749-abb6-26c59344dfee 2016/09/02 22:30:46 cat1 10 9 351055db-33e6-4f9b-bfe1-16f1ac446ac1 2016/09/02 22:30:52 cat1 10 9 2 -1 cat2 2 3 dcfa0c7a-5855-4ed2-bc8c-4accae8bd155 2016/09/02 22:31:02 cat1 12 8 3 4";
		vm.ID = "";
		vm.getSnapshot = function(historyData, id) {
			vm.result = "";
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
				/*将每个结点中的时间字符串替换成秒数值*/
				// 获得时间的字符串
				var slicetime = (nodes[i].match(timeRegExp))[0];
				// 转换成时间对象
				var date = new Date(slicetime);
				// 将时间对象转换成秒数
				var time = date.getTime();
				// 替换nodes中的时间字符串为秒数
				nodes[i] = nodes[i].replace(slicetime, time.toString()); //日期替换成秒数

				/*对每个结点都分割成id, date, animal*/
				// 对每个结点针对空格和换行符进行分割,可对正则表达式进行扩展
				var itemArray = nodes[i].split(/[ \n]/g);
				// 初始化结点对象
				var item = {
					'id': itemArray[0],
					'time': parseInt(itemArray[1]),
					'animal': {}
				};

				// 对每个结点的animal属性进行分割
				// itemArray[0]是id，itemArray[1]是time，animal属性从itemArray[2]开始
				var animalName, animalNameIndex = -1;
				for (var j = 2; j < itemArray.length; j++) {
					//不能转换到int，说明是animal的名称，否则是animal坐标
					if (isNaN(parseInt(itemArray[j]))) {
						//historyData合法性，如果出现x/y只有一个或者(后两种判断)一个都没有的情况，则animalNameIndex为奇数
						if ((j - animalNameIndex) % 2 == 0 || (j - animalNameIndex == 1) || j==itemArray.length-1) {
							console.log("Invalid format.");
							vm.result = "Invalid format.";
							return;
						}


						//把名称作为属性
						item['animal'][itemArray[j]] = {};
						//保存这个key的名字，方便后续插入属性值
						animalName = itemArray[j];
						//保存这个key的位置
						animalNameIndex = j;

					} else {
						if (j - animalNameIndex == 1)
							item['animal'][animalName]['origX'] = parseInt(itemArray[j]);
						else if (j - animalNameIndex == 2)
							item['animal'][animalName]['origY'] = parseInt(itemArray[j]);
						else if (j - animalNameIndex == 3)
							item['animal'][animalName]['x'] = parseInt(itemArray[j]);
						else if (j - animalNameIndex == 4)
							item['animal'][animalName]['y'] = parseInt(itemArray[j]);
						else {
							console.log("Invalid format.");
							vm.result = "Invalid format.";
							return;
						}
					}//数值结点判断结束
				}

				//当最后一个动物的记录格式有错时的判断
				if ((itemArray.length - animalNameIndex) % 2 == 0) {
					console.log("Invalid format.");
					vm.result = "Invalid format.";
				}
				console.log(item);
			} //for循环结束



		};



	});