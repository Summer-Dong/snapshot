'use strict';

describe('directive: header', function() {

    beforeEach(module('snapshotApp'));

    var $rootScope, $compile;

    beforeEach(inject(function(_$rootScope_, _$compile_, _$httpBackend_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    it('should show the right attr of header directive', function() {
		var header = $compile('<header></header>')($rootScope);
		$rootScope.$digest();
		
		expect(header.html()).toContain('Home');
		expect(header.html()).toContain('About');
	});
});



