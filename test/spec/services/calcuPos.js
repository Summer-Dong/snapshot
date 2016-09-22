'use strict';

describe('Unit Test of Service: calcuPos', function() {

	beforeEach(module('snapshotApp'));

	var calcuPos;
	
	beforeEach(inject(function(_calcuPos_) {
		calcuPos = _calcuPos_;
	}));

	// it('should get the information of Conflict found at id', function() {
	// 	// given
	// 	var nodesFinal = [{animal:{cat1:{origX:10,origY:9}},id:"e4e87cb2-8e9a-4749-abb6-26c59344dfee",time:1472826646000},{animal:{cat1:{origX:10,origY:9,x:2,y:1}},id:"351055db-33e6-4f9b-bfe1-16f1ac446ac1",time:1472826652000},{animal:{cat1:{origX:1,origY:3,x:2,y:1}},id:"dcfa0c7a-5855-4ed2-bc8c-4accae8bd155",time:1472826662000}];
	// 	var id = "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155";
	// 	// when
	// 	calcuPos.position(nodesFinal, id);
	// 	// then
	// 	expect(calcuPos.result).toBe("Conflict found at\ndcfa0c7a-5855-4ed2-bc8c-4accae8bd155.");
	// });

	it('should not get the information of Conflict found at id', function() {
		// given
		var nodesFinal = [{animal:{cat1:{origX:10,origY:9}},id:"e4e87cb2-8e9a-4749-abb6-26c59344dfee",time:1472826646000},{animal:{cat1:{origX:10,origY:9,x:2,y:1}},id:"351055db-33e6-4f9b-bfe1-16f1ac446ac1",time:1472826652000},{animal:{cat1:{origX:12,origY:10,x:2,y:1}},id:"dcfa0c7a-5855-4ed2-bc8c-4accae8bd155",time:1472826662000}];
		var id = "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155";
		// when
		calcuPos.position(nodesFinal, id);
		// then
		expect(calcuPos.result).toBe("");
	});
});