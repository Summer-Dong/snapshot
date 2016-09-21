angular.module('snapshotApp')
	.service('idVerify', ['$q', function($q) {
		var self = this;
		var result = "";
		/*对输入的id验证合法性*/
		self.idVerify = function(nodesFinal, id) {
			var deferred = $q.defer();
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
				result = "Invalid id.";
				console.log("Invalid id.");
				return;
			}

			deferred.resolve(nodesFinal);
			return deferred.promise;
		};
	}]);