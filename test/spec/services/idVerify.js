'use strict';

describe('Unit Test of Service: idVerify', function() {

	beforeEach(module('snapshotApp'));

	var idVerify;
	
	beforeEach(inject(function(_idVerify_) {
		idVerify = _idVerify_;
	}));

	it('should get the information of invalid id', function() {
		// given
		var nodesFinal = [{animal:{cat1:{origX:10,origY:9}},id:"e4e87cb2-8e9a-4749-abb6-26c59344dfee",time:1472826646000},{animal:{cat2:{origX:12,origY:3}},id:"w3e87cb2-8e9a-4749-abb6-26c59344dfdd",time:1472826626000}];
		var id = "w3e87cd2-8e9a-4749-abb6-26c59344dfdd";
		// when
		idVerify.idVerify(nodesFinal, id);
		// then
		expect(idVerify.result).toBe("Invalid id.");
	});

	it('should not get the information of invalid id', function() {
		// given
		var nodesFinal = [{animal:{cat1:{origX:10,origY:9}},id:"e4e87cb2-8e9a-4749-abb6-26c59344dfee",time:1472826646000},{animal:{cat2:{origX:12,origY:3}},id:"w3e87cb2-8e9a-4749-abb6-26c59344dfdd",time:1472826626000}];
		var id = "e4e87cb2-8e9a-4749-abb6-26c59344dfee";
		// when
		idVerify.idVerify(nodesFinal, id);
		// then
		expect(idVerify.result).toBe("");
	});
});