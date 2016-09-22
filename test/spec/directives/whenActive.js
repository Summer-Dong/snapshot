'use strict';

describe('directive: whenActive', function() {

    beforeEach(module('snapshotApp'));

    var $rootScope, $compile;

    beforeEach(inject(function(_$rootScope_, _$compile_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    it('should show the right attr of whenActive directive', function($compile) {
		var node = $compile("<a when-active></a>")($rootScope);
		// $rootScope.$digest();
		var contents = node.contents();

        expectpect(contents[3].nodeType).toEqual(node.COMMENT_NODE);
        expect(contents[1].nodeType).toEqual(node.ELEMENT_NODE);
	});
});



