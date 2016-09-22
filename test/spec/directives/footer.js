'use strict';

describe('directive: footer', function() {

    beforeEach(module('snapshotApp'));

    var $rootScope, $compile;

    beforeEach(inject(function(_$rootScope_, _$compile_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    it('should show the right attr of footer directive', function() {
		var footer = $compile('<footer></footer>')($rootScope);
		$rootScope.$digest();
		
		expect(footer.html()).toContain('from Summer Dong');
	});
});



