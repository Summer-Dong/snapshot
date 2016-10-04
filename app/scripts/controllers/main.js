'use strict';

angular.module('snapshotApp')
	.controller('MainCtrl', ['dataToGroup', 'splitNodes', 'sortByTime', 'idVerify', 'calcuPos', 'sortByAnimalName', 'values', function(dataToGroup, splitNodes, sortByTime, idVerify, calcuPos, sortByAnimalName, values) {
		var vm = this;
		vm.historyData = "";
		vm.ID = "";

		vm.getSnapshot = function() {
			vm.result = "";

			/*将historyData拆分成nodes数组*/
			dataToGroup.getNodes(vm.historyData, values.timeRegExp);

			//拆分每个结点
			splitNodes.splitNodes(dataToGroup.nodes, values.timeRegExp, values.error);
			vm.result = (vm.result != "" ? vm.result : splitNodes.result);
			if(vm.result != "")	{return;}
			
			//按照时间对结点冒泡排序
			sortByTime.bubbleSort(splitNodes.nodesFinal);

			//对输入的id验证合法性
			idVerify.idVerify(sortByTime.nodesFinal, vm.ID);
			vm.result = (vm.result != "" ? vm.result : idVerify.result);
			if(vm.result != "")	{return;}
					
			//计算动物在所输入时间的位置
			calcuPos.position(sortByTime.nodesFinal, vm.ID, idVerify.idIndex);
			vm.result = (vm.result != "" ? vm.result : calcuPos.result);
			if(vm.result != "")	{return;}
			
			/*按照动物名字排序输出*/
			sortByAnimalName.sortByName(calcuPos.animalStatus);
			vm.result = (vm.result != "" ? vm.result : sortByAnimalName.result);
		};

	}]);
