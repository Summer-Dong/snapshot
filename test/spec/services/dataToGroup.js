'use strict';

describe('Unit Test of Service: dataToGroup', function() {

	beforeEach(module('snapshotApp'));

	var dataToGroup;
	
	beforeEach(inject(function(_dataToGroup_) {
		dataToGroup = _dataToGroup_;
	}));

	it('should init some key values', function() {
		// given
		var historyData = "e4e87cb2-8e9a-4749-abb6-26c59344dfee\n2016/09/02 22:30:46\ncat1 10 9\n351055db-33e6-4f9b-bfe1-16f1ac446ac1\n2016/09/02 22:30:52\ncat1 10 9 2 -1\ncat2 2 3\ndcfa0c7a-5855-4ed2-bc8c-4accae8bd155\n2016/09/02 22:31:02\ncat1 12 8 3 4";
		// when
		dataToGroup.getNodes(historyData);
		// then
		expect(dataToGroup.nodes[0]).toBe("e4e87cb2-8e9a-4749-abb6-26c59344dfee 2016/09/02 22:30:46 cat1 10 9");
		expect(dataToGroup.nodes[1]).toBe("351055db-33e6-4f9b-bfe1-16f1ac446ac1 2016/09/02 22:30:52 cat1 10 9 2 -1 cat2 2 3")
	});
});