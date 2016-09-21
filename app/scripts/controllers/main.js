'use strict';

angular.module('snapshotApp')
	.controller('MainCtrl', ['dataToGroup', 'splitNodes', 'sortByTime', 'idVerify', 'calcuPos', 'sortByAnimalName', function(dataToGroup, splitNodes, sortByTime, idVerify, calcuPos, sortByAnimalName) {
		var vm = this;
		vm.historyData = "e4e87cb2-8e9a-4749-abb6-26c59344dfee\n2016/09/02 22:30:46\ncat1 10 9\n351055db-33e6-4f9b-bfe1-16f1ac446ac1\n2016/09/02 22:30:52\ncat1 10 9 2 -1\ncat2 2 3\ndcfa0c7a-5855-4ed2-bc8c-4accae8bd155\n2016/09/02 22:31:02\ncat1 12 8 3 4";
		vm.ID = "";

		vm.getSnapshot = function() {
			vm.result = "";

			/*将historyData拆分成nodes数组*/
			dataToGroup.getNodes(vm.historyData);

			//拆分每个结点
			splitNodes.splitNodes(dataToGroup.nodes);
			vm.result = (vm.result != "" ? vm.result : splitNodes.result);	
			
			//按照时间对结点冒泡排序
			sortByTime.bubbleSort(splitNodes.nodesFinal);

			//对输入的id验证合法性
			idVerify.idVerify(sortByTime.nodesFinal, vm.ID);
			vm.result = (vm.result != "" ? vm.result : idVerify.result);
					
			//计算动物在所输入时间的位置
			calcuPos.position(sortByTime.nodesFinal, vm.ID);
			vm.result = (vm.result != "" ? vm.result : calcuPos.result);
			
			/*按照动物名字排序输出*/
			sortByAnimalName.sortByName(calcuPos.animalStatus);
			vm.result = (vm.result != "" ? vm.result : sortByAnimalName.result);
		};

	}]);
