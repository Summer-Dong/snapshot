'use strict';

describe('Unit Test of Service: sortByAnimalName', function() {

	beforeEach(module('snapshotApp'));

	var sortByAnimalName;
	
	beforeEach(inject(function(_sortByAnimalName_) {
		sortByAnimalName = _sortByAnimalName_;
	}));

	it('should show the rsearch result', function() {
		// given
		var animalStatus = {'cat1':{'add':7.23606797749979, 'originX':10, 'originY':9,'x':15,'y':12},'cat2':{'add':0, 'originX':5, 'originY':2,'x':5,'y':2}};
		// when
		sortByAnimalName.sortByName(animalStatus);
		// then
		expect(sortByAnimalName.result).toBe("cat1 15 12 10 9\ncat2 5 2 5 2\ncat1\n");
	});
});