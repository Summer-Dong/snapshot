angular.module('snapshotApp')
	.service('idVerify', ['$q', function($q) {
		var self = this;
		
		/*对输入的id验证合法性*/
		self.idVerify = function(nodesFinal, id) {
			self.result = "";
			var deferred = $q.defer();
			//判断输入id所位于的结点，如果没有找到，报错。
			self.idIndex;
			var i;
			for (i = 0; i < nodesFinal.length; i++) {
				if (nodesFinal[i].id == id) {
					self.idIndex = i;
					break;
				}
			}
			//输入id没有找到
			if (i == nodesFinal.length) {
				self.result = "Invalid id.";
				console.log("Invalid id.");
				return;
			}

			deferred.resolve(nodesFinal);
			return deferred.promise;
		};
	}]);