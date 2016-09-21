'use strict';

angular.module('snapshotApp')
	.controller('MainCtrl', ['dataToGroup', 'splitNodes', function(dataToGroup, splitNodes) {
		var vm = this;
		vm.historyData = "e4e87cb2-8e9a-4749-abb6-26c59344dfee 2016/09/02 22:30:46 cat1 10 9 351055db-33e6-4f9b-bfe1-16f1ac446ac1 2016/09/02 22:30:52 cat1 10 9 2 -1 cat2 2 3 dcfa0c7a-5855-4ed2-bc8c-4accae8bd155 2016/09/02 22:31:02 cat1 12 8 3 4";
		vm.ID = "";
		vm.result = "";

		
		vm.getSnapshot = function(historyData, id) {
			/*将historyData拆分成nodes数组*/
			dataToGroup.getNodes(vm.historyData)
				.then(function(result){
					return splitNodes.splitNodes(result);
				})
				.then(function(result) {
					vm.nodesFinal = result;
					console.log(vm.nodesFinal);
				});

			



			/*拆分每个结点*/
			// vm.nodesFinal = splitNodes.splitNodes(vm.nodes);
			// console.log(vm.nodesFinal);


		};

	}]);

// //按照时间对结点冒泡排序
// for (var i = nodesFinal.length - 1; i >= 1; i--) {
// 	for (var j = 0; j < i; j++) {
// 		var tmp;
// 		if (nodesFinal[j].time > nodesFinal[j + 1].time) {
// 			tmp = nodesFinal[j];
// 			nodesFinal[j] = nodesFinal[j + 1];
// 			nodesFinal[j + 1] = tmp;
// 		}
// 	}
// }

// //判断输入id所位于的结点，如果没有找到，报错。
// var idIndex;
// for (var i = 0; i < nodesFinal.length; i++) {
// 	if (nodesFinal[i].id == id) {
// 		idIndex = i;
// 		break;
// 	}
// }
// //输入id没有找到
// if (i == nodesFinal.length) {
// 	vm.result = "Invalid id.";
// 	console.log("Invalid id.");
// 	return;
// }

// // 计算动物在所输入时间的位置
// var animalStatus = {};
// //遍历到对所查询时间
// for (var i = 0; i <= idIndex; i++) {
// 	// var tt=nodesFinal[i].animal;
// 	//遍历单个节点中所有动物
// 	for (var j in nodesFinal[i].animal) {
// 		//动物出现过
// 		if (animalStatus.hasOwnProperty(j)) {
// 			//动物上条记录所在的位置
// 			var lastX = animalStatus[j].x;
// 			var lastY = animalStatus[j].y;
// 			//累加的坐标与实际坐标（所查询时间的上条所在的坐标）不符合
// 			if (lastX != nodesFinal[i].animal[j].origX || lastY != nodesFinal[i].animal[j].origY) {
// 				console.log("Conflict found at " + id);
// 				return;
// 			}
// 			// 符合实际时，累加坐标值
// 			animalStatus[j].x += nodesFinal[i].animal[j].x;
// 			animalStatus[j].y += nodesFinal[i].animal[j].y;
// 		} else {
// 			//有新动物时添加记录
// 			animalStatus[j] = {};
// 			animalStatus[j]['x'] = nodesFinal[i].animal[j].origX;
// 			animalStatus[j]['y'] = nodesFinal[i].animal[j].origY;

// 			//新动物进入标记区域时，却在结点记录中有坐标变化量'x'或'y'时，则此条记录出错
// 			if (('x' in nodesFinal[i].animal[j]) || ('y' in nodesFinal[i].animal[j])) {
// 				vm.result = "Conflict found at " + id;
// 				console.log("Conflict found at " + id);
// 				return;
// 			}
// 		}
// 	}
// }

// //按照动物名字排序输出
// var aniStaInOrder = [];
// for (var i in animalStatus) {
// 	aniStaInOrder.push(i);
// }
// aniStaInOrder.sort();
// for (var i = 0; i < aniStaInOrder.length; i++) {
// 	vm.result += (aniStaInOrder[i] + " " + animalStatus[aniStaInOrder[i]].x + " " + animalStatus[aniStaInOrder[i]].y + "\n");
// }