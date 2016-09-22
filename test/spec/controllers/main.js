'use strict';

describe('Controller: MainCtrl', function() {


    beforeEach(module('snapshotApp'));

    var MainCtrl, scope;
    
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', function() {
            $scope: scope
        });
    }));

    it('should show the right results for the rigt inputs of historyData and ID', function() {
        // when 
        MainCtrl.historyData = "e4e87cb2-8e9a-4749-abb6-26c59344dfee\n2016/09/02 22:30:46\ncat1 10 9\n351055db-33e6-4f9b-bfe1-16f1ac446ac1\n2016/09/02 22:30:52\ncat1 10 9 2 -1\ncat2 2 3\ndcfa0c7a-5855-4ed2-bc8c-4accae8bd155\n2016/09/02 22:31:02\ncat1 12 8 3 4";
        MainCtrl.ID = "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155";
        MainCtrl.getSnapshot();
        // then
        expect(MainCtrl.result).toBe("cat1 15 12\ncat2 2 3\n");
    });

    it("should show the wrong results for the inputs of wrong historyData's format and right ID", function() {
        // when 
        MainCtrl.historyData = "e4e87cb2-8e9a-4749-abb6-26c59344dfee\n2016/09/02 22:30:46\ncat1 10 9\n351055db-33e6-4f9b-bfe1-16f1ac446ac1\n2016/09/02 22:30:52\ncat1 10 9 -1\ncat2 2 3\ndcfa0c7a-5855-4ed2-bc8c-4accae8bd155\n2016/09/02 22:31:02\ncat1 12 8 3 4";
        MainCtrl.ID = "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155";
        MainCtrl.getSnapshot();
        // then
        expect(MainCtrl.result).toBe("Invalid format.");
    });

    it("should show the wrong results for the inputs of wrong historyData's Conflict and right ID", function() {
        // when 
        MainCtrl.historyData = "e4e87cb2-8e9a-4749-abb6-26c59344dfee\n2016/09/02 22:30:46\ncat1 10 9\n351055db-33e6-4f9b-bfe1-16f1ac446ac1\n2016/09/02 22:30:52\ncat1 10 9 2 -1\ncat2 2 3\ndcfa0c7a-5855-4ed2-bc8c-4accae8bd155\n2016/09/02 22:31:02\ncat1 12 7 3 4";
        MainCtrl.ID = "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155";
        MainCtrl.getSnapshot();
        // then
        expect(MainCtrl.result).toBe("Conflict found at\ndcfa0c7a-5855-4ed2-bc8c-4accae8bd155.");
    });
    
});