'use strict';

angular.module('snapshotApp')
	.controller('MainCtrl', ['dataToGroup', 'splitNodes','sortByTime', 'idVerify', 'calcuPos', function(dataToGroup, splitNodes, sortByTime, idVerify, calcuPos) {
		var vm = this;
		vm.historyData = "e4e87cb2-8e9a-4749-abb6-26c59344dfee 2016/09/02 22:30:46 cat1 10 9 351055db-33e6-4f9b-bfe1-16f1ac446ac1 2016/09/02 22:30:52 cat1 10 9 2 -1 cat2 2 3 dcfa0c7a-5855-4ed2-bc8c-4accae8bd155 2016/09/02 22:31:02 cat1 12 8 3 4";
		vm.ID = "";
		vm.result = "";
		
		vm.getSnapshot = function( ) {
			/*将historyData拆分成nodes数组*/
			dataToGroup.getNodes(vm.historyData)
				.then(function(nodes){
					//拆分每个结点
					return splitNodes.splitNodes(nodes);
				})
				.then(function(nodesFinal) {
					//按照时间对结点冒泡排序
					return sortByTime.bubbleSort(nodesFinal);
				})
				.then(function(nodesFinal) {
					//对输入的id验证合法性
					return idVerify.idVerify(nodesFinal);
				})
				.then(function(nodesFinal) {
					return calcuPos.position(nodesFinal, vm.ID)
				});

			


		};

	}]);






// //按照动物名字排序输出
// var aniStaInOrder = [];
// for (var i in animalStatus) {
// 	aniStaInOrder.push(i);
// }
// aniStaInOrder.sort();
// for (var i = 0; i < aniStaInOrder.length; i++) {
// 	vm.result += (aniStaInOrder[i] + " " + animalStatus[aniStaInOrder[i]].x + " " + animalStatus[aniStaInOrder[i]].y + "\n");
// }