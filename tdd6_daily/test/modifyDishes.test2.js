var expect = chai.expect;
var rowData = {
    tpDishId: 1,
    dishId: 123,
    dishName: '土豆丝',
    dishUuid: '123',
    specId: 1231,
    specName: '规格1',
    specUuid: '1231',
    isMatch: 1
};
var nonMatchRowData = {
    tpDishId: 1,
    dishId: '',
    dishName: '',
    dishUuid: '',
    specId: '',
    specName: '',
    specUuid: '',
    isMatch: 0
};
describe('菜品修改测试', function () {
    beforeEach(function() {
        disMatch.modifiedMatchDishes = [];
    });
    describe('hasModifiedBefore=true, isRepeated=true', function () {
        it('当该条第三方菜品对应的匹配菜品修改过，此时再次修改并且与初始匹配相同时，此条修改记录删除', function () {
            // given
            disMatch.modifiedMatchDishes = [{
                tpDishId: 1,
                dishId: 123,
                dishName: '土豆丝',
                dishUuid: '123',
                specId: 1232,
                specName: '规格2',
                specUuid: '1232',
                isMatch: 1
            }];
            var modifiedDish = {
                currentModifiedDishId: 123,
                currentModifiedSpecId: 1231,
                rowData: rowData
            };
            // when
            var modifiedArr = disMatch.modifiedMatchDishes = modifyDishes(modifiedDish);
            // then
            expect(modifiedArr.length).to.equal(0);
        });
    });
    describe('hasModifiedBefore=false, isRepeated=false', function () {
        it('当该条第三方菜品对应的匹配菜品未有修改过，此时修改并且与初始匹配不相同时，此条修改记录保存', function () {
            // given
            var modifiedDish = {
                currentModifiedDishId: 124,
                currentModifiedSpecId: 1242,
                rowData: rowData
            };
            // when
            var modifiedArr = disMatch.modifiedMatchDishes = modifyDishes(modifiedDish);
            var expectRow = {
                    tpDishId: 1,
                    dishId: 124,
                    dishName: '酸辣土豆丝',
                    dishUuid: '124',
                    specId: 1242,
                    specName: '规格4',
                    specUuid: '1242',
                    isMatch: 1
                };
            // then
            expect(modifiedArr.length).to.equal(1);
            expect(modifiedArr[0]).to.eql(expectRow);
        });
    });
    describe('hasModifiedBefore=true, isRepeated=false', function () {
        it('当该条第三方菜品对应的匹配菜品修改过，此时修改并且与初始匹配不相同时，此条修改记录更新', function () {
            // given
            disMatch.modifiedMatchDishes = [{
                tpDishId: 1,
                dishId: 124,
                dishName: '酸辣土豆丝',
                dishUuid: '124',
                specId: 1242,
                specName: '规格4',
                specUuid: '1242',
                isMatch: 1
            }];
            var modifiedDish = {
                currentModifiedSpecId: 1241,
                rowData: rowData
            };
            // when
            var modifiedArr = disMatch.modifiedMatchDishes = modifyDishes(modifiedDish);
            var expectRow = {
                    tpDishId: 1,
                    dishId: 124,
                    dishName: '酸辣土豆丝',
                    dishUuid: '124',
                    specId: 1241,
                    specName: '规格3',
                    specUuid: '1241',
                    isMatch: 1
                };
            // then
            expect(modifiedArr.length).to.equal(1);
            expect(modifiedArr[0]).to.eql(expectRow);
        });
    });
    describe('hasModifiedBefore=false, isRepeated=true', function () {
        it('当该条第三方菜品对应的匹配菜品未修改过，此时修改并且与初始匹配相同时，此条修改记录不保存 ', function () {
            // given
            disMatch.modifiedMatchDishes = [];
            var modifiedDish = {
                currentModifiedDishId: 123,
                currentModifiedSpecId: 1231,
                rowData: rowData
            };
            // when
            var modifiedArr = disMatch.modifiedMatchDishes = modifyDishes(modifiedDish);
            // then
            expect(modifiedArr.length).to.equal(0);
        });
        it('当该条第三方菜品对应的匹配菜品未修改过并且初始没有匹配菜品，此时修改并且与初始匹配相同时，此条修改记录不保存 ', function () {
            // given
            disMatch.modifiedMatchDishes = [];
            var modifiedDish = {
                rowData: nonMatchRowData
            };
            // when
            var modifiedArr = disMatch.modifiedMatchDishes = modifyDishes(modifiedDish);
            // then
            expect(modifiedArr.length).to.equal(0);
        });
    });
});