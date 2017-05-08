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
        var renderContainer = $('#test');
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

    QUnit.test('should_first_li_data_id_and_name_equal_first_food_id_name', function(assert) {
        // given
        var foods = this.targetTestComponent.getFoods();
        var $li = this.targetTestComponent.render().find('ul').children('li');
        // when
        var firstFoodId = foods[0].id;
        var firstFoodName = foods[0].name;
        var firstLiDataId = $li.eq(0).data('id');
        var firstLiName = $li.eq(0).children('a').text();
        console.log(firstLiDataId);

        // then
        assert.equal(firstLiDataId, firstFoodId);
        assert.equal(firstLiName, firstFoodName);
    });

    QUnit.test('should_ul_has_hide_class_default', function (assert) {
        // given
        var $ul = this.targetTestComponent.render().find('ul');
        // when
        var hasHideClass = $ul.hasClass('hide');
        // then
        assert.ok(hasHideClass);
    });

    QUnit.test('should_ul_remove_hide_class_when_input_focus', function (assert) {
        // given
        var $selectWrapper = this.targetTestComponent.render();
        var $input = $selectWrapper.children('input'),
            $ul = $selectWrapper.children('ul');
        // when
        $input.focus();
        var hasHideClass = $ul.hasClass('hide');
        // then
        assert.notOk(hasHideClass);
    });

    QUnit.test('should_ul_has_hide_class_when_input_blur', function (assert) {
        // given
        var $selectWrapper = this.targetTestComponent.render();
        var $input = $selectWrapper.children('input'),
            $ul = $selectWrapper.children('ul');
        $input.focus();
        // when
        $input.blur();
        var hasHideClass = $ul.hasClass('hide');
        // then
        assert.ok(hasHideClass);
    });

    QUnit.test('should_input_default_value_equal_first_food_name', function (assert) {
        // given
        var firstFoodName = this.targetTestComponent.getFoods()[0].name;
        var $input = this.targetTestComponent.render().children('input');
        var inputDefaultValue = $input.val();
        // when
        // then
        assert.equal(inputDefaultValue, firstFoodName);
    });
});