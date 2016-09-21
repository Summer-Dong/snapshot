angular.module('snapshotApp')
	.service('splitNodes', ['values', function(values) {
		var self = this;
		
		self.splitNodes = function(nodes) {
			self.result = "";
			//新建结点数组，保存结点被处理后的结点值
			var nodesFinal = [];

			/*处理每个结点*/
			for (var i = 0; i < nodes.length; i++) {

				/*将每个结点中的时间字符串替换成秒数值*/
				var slicetime = nodes[i].match(values.timeRegExp);
				var time = (new Date(slicetime)).getTime();
				nodes[i] = nodes[i].replace(slicetime, time.toString()); 

				/*对每个结点都分割成id, date, animal*/
				// 对每个结点针对空格和换行符进行分割,可对正则表达式进行扩展
				var itemArray = nodes[i].split(/[ \n]/g);
				// 初始化结点对象
				var item = {
					id: itemArray[0],
					time: parseInt(itemArray[1]),
					animal: {}
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
							console.log(values.error);
							self.result = values.error;
							return;
						}

						//保存这个key的名字和位置，方便后续插入属性值
						animalNameIndex = j;
						animalName = itemArray[j];
						//把名称作为属性
						item.animal[animalName] = {};
					} else {
						if (j - animalNameIndex == 1)
							item.animal[animalName]['origX'] = parseInt(itemArray[j]);
						else if (j - animalNameIndex == 2)
							item.animal[animalName]['origY'] = parseInt(itemArray[j]);
						else if (j - animalNameIndex == 3)
							item.animal[animalName]['x'] = parseInt(itemArray[j]);
						else if (j - animalNameIndex == 4)
							item.animal[animalName]['y'] = parseInt(itemArray[j]);
						else {
							console.log(values.error);
							self.result = values.error;
							return;
						}
					} //数值结点判断结束
				}

				//当最后一个动物的记录格式有错时：animalName后边的属性个数为奇数时的判断
				if ((itemArray.length - animalNameIndex) % 2 == 0) {
					console.log(values.error);
					self.result = values.error;
				}
				// 处理完每个结点后push到最终数组中
				nodesFinal.push(item);
			} 
			self.nodesFinal = nodesFinal;
		};

	}]);