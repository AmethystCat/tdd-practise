// mock菜品对象用于测试
var Food = function () {
    return [
        {id: 1, name: '西红柿炒蛋'},
        {id: 2, name: '土豆丝'},
        {id: 3, name: '排骨烧土豆'},
        {id: 4, name: '葱爆牛肉'},
        {id: 5, name: '小葱拌豆腐'}
    ];
};

QUnit.module('select auto complete component test', {
    before: function () {
        var renderContainer = $('test');
        var foods = new Food();
        this.targetTestComponent = new SelectAutoComplete(renderContainer, foods);
    },
    after: function () {
        this.targetTestComponent = null;
    }
}, function () {
    QUnit.test('should_has_a_div_container_with_a_wrapper_class_when_rendered', function (assert) {
        // given
        var expectedSelectWrapper = {
                nodeName: 'DIV',
                className: 'select-wrapper'
            };

        var $dom = this.targetTestComponent.render();
        var actualWrapperNodeName = $dom[0].nodeName;
        var hasWrapperClass = $dom.hasClass(expectedSelectWrapper.className);
        // when
        // then
        assert.equal(actualWrapperNodeName, expectedSelectWrapper.nodeName);
        assert.ok(hasWrapperClass);
    });

    QUnit.test('should_contain_a_input_and_a_ul_and_they_all_have_class_when_rendered', function (assert) {
        // given
        var $dom = this.targetTestComponent.render();
        var expectedNodeClass = {
                input: 'select-input',
                ul: 'select-list'
            };
        var $input = $dom.find('input');
        var $ul = $dom.find('ul');

        // when
        var lengthOfInput = $input.length;
        var lengthOfUl = $ul.length;

        var hasExpectedInputClass = $input.hasClass(expectedNodeClass.input);
        var hasExpectedUlClass = $ul.hasClass(expectedNodeClass.ul);
        // then
        assert.equal(lengthOfInput, 1);
        assert.equal(lengthOfUl, 1);
        assert.ok(hasExpectedInputClass);
        assert.ok(hasExpectedUlClass);
    });

    QUnit.test('should_length_of_li_is_the_same_as_length_of_foods_when_rendered', function (assert) {
        // given
        var foods = this.targetTestComponent.getFoods();
        var $ul = this.targetTestComponent.render().find('ul');
        var $li = $ul.children('li');
        // when
        var lengthOfLi = $li.length;
        var lengthOfFoods = foods.length;
        // then
        assert.equal(lengthOfLi, lengthOfFoods);
    });

});