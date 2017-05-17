var expect = chai.expect;
var rowData = {
    tpDishId: 1,
    dishId: 123,
    dishName: '土豆丝',
    specId: 1231,
    specName: '规格1',
    specUuid: '1231',
    isMatch: 1
};
describe('菜品修改测试', function () {
    beforeEach(function() {
        disMatch.modifiedMatchDishes = [];
    });
    it('修改菜品名称时，修改列表里增加一个该条修改后的匹配数据', function () {
        // given
        var modifiedDish = {
                currentModifiedDishId: 124,
                currentModifiedSpec: {
                    specName: '规格3',
                    specId: 1241,
                    specUuid: '1241'
                },
                rowData: rowData
            };
        // when
        var modifiedArr = disMatch.modifiedMatchDishes = modifyDishes(modifiedDish);
        var expectRow = {
                tpDishId: 1,
                dishId: 124,
                dishName: '酸辣土豆丝',
                specId: 1241,
                specName: '规格3',
                specUuid: '1241',
                isMatch: 1
            };
        // then
        expect(modifiedArr.length).to.equal(1);
        expect(modifiedArr[0]).to.eql(expectRow);
    });
    it('修改规格时，修改列表里增加一个该条修改后的匹配数据', function () {
        // given
        var modifiedDish = {
            currentModifiedSpec: {
                specName: '规格2',
                specId: 1232,
                specUuid: '1232'
            },
            rowData: rowData
        };
        // when
        var modifiedArr = disMatch.modifiedMatchDishes = modifyDishes(modifiedDish);
        var expectRow = {
            tpDishId: 1,
            dishId: 123,
            dishName: '土豆丝',
            specId: 1232,
            specName: '规格2',
            specUuid: '1232',
            isMatch: 1
        };
        // then
        expect(modifiedArr.length).to.equal(1);
        expect(modifiedArr[0]).to.eql(expectRow);
    });

    it('当修改过菜品名称后再修改该菜品规格时，修改列表里始终为一个该条修改后的匹配数据', function () {
        // given
        disMatch.modifiedMatchDishes = [{
            tpDishId: 1,
            dishId: 124,
            dishName: '酸辣土豆丝',
            specId: 1241,
            specName: '规格3',
            specUuid: '1241',
            isMatch: 1
        }];
        var modifiedDish = {
            currentModifiedSpec: {
                specName: '规格4',
                specId: 1242,
                specUuid: '1242'
            },
            rowData: rowData
        };
        // when
        var modifiedArr = disMatch.modifiedMatchDishes = modifyDishes(modifiedDish);
        var expectRow = {
            tpDishId: 1,
            dishId: 124,
            dishName: '酸辣土豆丝',
            specId: 1242,
            specName: '规格4',
            specUuid: '1242',
            isMatch: 1
        };
        // then
        expect(modifiedArr.length).to.equal(1);
        expect(modifiedArr[0]).to.eql(expectRow);
    });
    it('当修改菜品名称和规格与初始菜品名称规格相同时，修改列表删除该条菜品的修改纪录，理解为该条菜品没有修改过，为初始状态', function () {
        // given
        disMatch.modifiedMatchDishes = [{
            tpDishId: 1,
            dishId: 124,
            dishName: '酸辣土豆丝',
            specId: 1241,
            specName: '规格3',
            specUuid: '1241',
            isMatch: 1
        }, {
            tpDishId: 2,
            dishId: 124,
            dishName: '酸辣土豆丝',
            specId: 1241,
            specName: '规格4',
            specUuid: '1241',
            isMatch: 1
        }];
        var modifiedDish = {
            currentModifiedSpec: {
                dishId: 123,
                specName: '规格1',
                specId: 1231,
                specUuid: '1231',
                rowData: rowData
            },
            rowData: rowData
        };
        // when
        var modifiedArr = disMatch.modifiedMatchDishes = modifyDishes(modifiedDish);
        // then
        expect(modifiedArr.length).to.equal(1);
        expect(modifiedArr[0].tpDishId).to.equal(2);
    });
    it('当菜单名称没有修改，然后修改规格与初始菜品规格相同时，修改列表删除该条菜品的修改纪录，理解为该条菜品没有修改过', function () {
        // given
        disMatch.modifiedMatchDishes = [{
            tpDishId: 2,
            dishId: 124,
            dishName: '酸辣土豆丝',
            specId: 1241,
            specName: '规格3',
            specUuid: '1241',
            isMatch: 1
        }, {
            tpDishId: 1,
            dishId: 123,
            dishName: '土豆丝',
            specId: 1241,
            specName: '规格3',
            specUuid: '1241',
            isMatch: 1
        }];
        var modifiedDish = {
            currentModifiedSpec: {
                specName: '规格1',
                specId: 1231,
                specUuid: '1231',
                rowData: rowData
            },
            rowData: rowData
        };
        // when
        var modifiedArr = disMatch.modifiedMatchDishes = modifyDishes(modifiedDish);
        // then
        expect(modifiedArr.length).to.equal(1);
        expect(modifiedArr[0].tpDishId).to.equal(2);
    });
});