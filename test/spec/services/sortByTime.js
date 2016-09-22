'use strict';

describe('Unit Test of Service: sortByTime', function() {

	beforeEach(module('snapshotApp'));

	var sortByTime;
	
	beforeEach(inject(function(_sortByTime_) {
		sortByTime = _sortByTime_;
	}));

	it('should sort the nodesFinal by time', function() {
		// given
		var nodesFinal = [{animal:{cat1:{origX:10,origY:9}},id:"e4e87cb2-8e9a-4749-abb6-26c59344dfee",time:1472826646000},{animal:{cat2:{origX:12,origY:3}},id:"w3e87cb2-8e9a-4749-abb6-26c59344dfdd",time:1472826626000}];
		// when
		sortByTime.bubbleSort(nodesFinal);
		// then
		expect(sortByTime.nodesFinal[0].id).toBe('w3e87cb2-8e9a-4749-abb6-26c59344dfdd');
		expect(sortByTime.nodesFinal[0].time).toBe(1472826626000);
		expect(sortByTime.nodesFinal[0].animal['cat2']['origX']).toBe(12);
		expect(sortByTime.nodesFinal[0].animal['cat2']['origY']).toBe(3);
		
		expect(sortByTime.nodesFinal[1].id).toBe('e4e87cb2-8e9a-4749-abb6-26c59344dfee');
		expect(sortByTime.nodesFinal[1].time).toBe(1472826646000);
		expect(sortByTime.nodesFinal[1].animal['cat1']['origX']).toBe(10);
		expect(sortByTime.nodesFinal[1].animal['cat1']['origY']).toBe(9);
	});
});