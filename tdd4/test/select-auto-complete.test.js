var Food = function () {
    return [
        {id: 1, name: '西红柿炒蛋'},
        {id: 1, name: '土豆丝'},
        {id: 1, name: '排骨烧土豆'},
        {id: 1, name: '葱爆牛肉'},
        {id: 1, name: '小葱拌豆腐'}
    ];
};
QUnit.module('select auto complete component test', function() {
    QUnit.test('should_has_a_input_and_a_ul_list', function (assert) {
        // given
        var foods = new Food();
        console.log(foods);
        var select = new SelectAutoComplete(foods);
        // when
        assert.equal(1,1);
    });
});