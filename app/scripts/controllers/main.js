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
			//新建结点数组，保存结点被处理后的结点值
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
						//(j - animalNameIndex == 1)：判断的是cat1 cat2 2 3 的情况
						//j==itemArray.length-1：判断的是cat1 10 9 2 -1 cat2的情况
						if ((j - animalNameIndex) % 2 == 0 || (j - animalNameIndex == 1) || j == itemArray.length - 1) {
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
					} //数值结点判断结束
				}

				//当最后一个动物的记录格式有错时的判断
				if ((itemArray.length - animalNameIndex) % 2 == 0) {
					console.log("Invalid format.");
					vm.result = "Invalid format.";
				}
				// 处理完每个结点后push到最终数组中
				nodesFinal.push(item);
			} //处理每个结点的for循环结束

			//对时间冒泡排序
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

			//判断输入id所位于的结点，如果没有找到，报错。
			var idIndex;
			for (var i = 0; i < nodesFinal.length; i++) {
				if (nodesFinal[i].id == id) {
					idIndex = i;
					break;
				}
			}
			//输入id没有找到
			if (i == nodesFinal.length) {
				vm.result = "Invalid id.";
				console.log("Invalid id.");
				return;
			}

			// 计算动物在所输入时间的位置
			var animalStatus = {};
			//遍历到对所查询时间
			for (var i = 0; i <= idIndex; i++) {
				// var tt=nodesFinal[i].animal;
				//遍历单个节点中所有动物
				for (var j in nodesFinal[i].animal) {
					//动物出现过
					if (animalStatus.hasOwnProperty(j)) {
						//动物上条记录所在的位置
						var lastX = animalStatus[j].x;
						var lastY = animalStatus[j].y;
						//累加的坐标与实际坐标（所查询时间的上条所在的坐标）不符合
						if (lastX != nodesFinal[i].animal[j].origX || lastY != nodesFinal[i].animal[j].origY) {
							console.log("Conflict found at " + id);
							return;
						}
						// 符合实际时，累加坐标值
						animalStatus[j].x += nodesFinal[i].animal[j].x;
						animalStatus[j].y += nodesFinal[i].animal[j].y;
					} else {
						//有新动物时添加记录
						animalStatus[j] = {};
						animalStatus[j]['x'] = nodesFinal[i].animal[j].origX;
						animalStatus[j]['y'] = nodesFinal[i].animal[j].origY;

						//新动物进入标记区域时，却在结点记录中有坐标变化量'x'或'y'时，则此条记录出错
						if (('x' in nodesFinal[i].animal[j]) || ('y' in nodesFinal[i].animal[j])) {
							vm.result = "Conflict found at " + id;
							console.log("Conflict found at " + id);
							return;
						}
					}
				}
			}
 
 			//按照动物名字排序输出
			var aniStaInOrder = [];
			for (var i in animalStatus) {
				aniStaInOrder.push(i);
			}
			aniStaInOrder.sort();
			for (var i = 0; i < aniStaInOrder.length; i++) {
				vm.result+=(aniStaInOrder[i] + " " + animalStatus[aniStaInOrder[i]].x + " " + animalStatus[aniStaInOrder[i]].y + "\n");
			}
		};

	});