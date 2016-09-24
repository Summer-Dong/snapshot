angular.module('snapshotApp')
	.service('sortByAnimalName', [function() {
		var self = this;
		
		/*按照动物名字排序输出*/
		self.sortByName = function(animalStatus) {
			self.result = "";
			var aniStaInOrder = [];
			for (var i in animalStatus) {
				aniStaInOrder.push(i);
			}
			aniStaInOrder.sort();
			// var maxAdd = 0;
			for (var i = 0; i < aniStaInOrder.length; i++) {
				self.result += (aniStaInOrder[i] + " " + animalStatus[aniStaInOrder[i]].x + " " + animalStatus[aniStaInOrder[i]].y + " " + animalStatus[aniStaInOrder[i]].originX + ' '+ animalStatus[aniStaInOrder[i]].originY + '\n');
				// if(maxAdd< aniStaInOrder[i] 
			}
		};
	}]);