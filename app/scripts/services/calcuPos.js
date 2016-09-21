angular.module('snapshotApp')
	.service('calcuPos', ['$q','idVerify', function($q, idVerify) {
		var self = this;
		
		/*计算动物在所输入时间的位置*/
		self.position = function(nodesFinal, id) {
			self.result = "";
			var deferred = $q.defer();
			
			var animalStatus = {};
			//遍历到对所查询时间
			for (var i = 0; i <= idVerify.idIndex; i++) {
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
							self.result = "Conflict found at " + id;
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
							self.result = "Conflict found at " + id;
							console.log("Conflict found at " + id);
							return;
						}
					}
				}
			};

			deferred.resolve(animalStatus);
			return deferred.promise;
		};
	}]);