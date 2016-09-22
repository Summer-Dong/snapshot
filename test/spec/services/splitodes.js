'use strict';

describe('Unit Test of Service: splitNodes', function() {

	beforeEach(module('snapshotApp'));

	var splitNodes;
	
	beforeEach(inject(function(_splitNodes_) {
		splitNodes = _splitNodes_;
	}));

	it('should init some key values', function() {
		// given
		var nodes = ["e4e87cb2-8e9a-4749-abb6-26c59344dfee 2016/09/02 22:30:46 cat1 10 9"];
		// when
		splitNodes.splitNodes(nodes);
		// then
		expect(splitNodes.nodesFinal[0].id).toBe('e4e87cb2-8e9a-4749-abb6-26c59344dfee');
		expect(splitNodes.nodesFinal[0].time).toBe(1472826646000);
		expect(splitNodes.nodesFinal[0].animal['cat1']['origX']).toBe(10);
		expect(splitNodes.nodesFinal[0].animal['cat1']['origY']).toBe(9);
	});
});