var disMatch = {};
disMatch.modifiedMatchDishes = [];

Function.prototype.after = function (fn) {
    var self = this;
    return function () {
        var result = self.apply(this, arguments);
        if (result === 'next') {
            return fn.apply(this, arguments);
        }
        return result;
    };
};

function modifyDishes(dish) {
    // 简化获取修改的菜品对象
    function WrapModifyDishToSimple(dish) {
        return {
            rowData: dish.rowData,
            dishId: dish.currentModifiedDishId || dish.rowData.dishId,
            specId: dish.currentModifiedSpec.specId,
            specName: dish.currentModifiedSpec.specName,
            specUuid: dish.currentModifiedSpec.specUuid
        };
    }

    var hasModifiedBefore = false;
    var isRepeated;
    var modifiedIndex = 0;
    var modifiedDishObj = WrapModifyDishToSimple(dish);
    var originRowData = modifiedDishObj.rowData;
    var tpId = originRowData.tpDishId;
    // 判断该条第三方菜品匹配之前是否被修改
    disMatch.modifiedMatchDishes.forEach(function (dish, index) {
        if (tpId == dish.tpDishId) {
            hasModifiedBefore = true;
            modifiedIndex = index;
        }
    });
    isRepeated = (
        originRowData.specUuid == modifiedDishObj.specUuid && originRowData.dishId == modifiedDishObj.dishId &&
        originRowData.specId == modifiedDishObj.specId && originRowData.specName == modifiedDishObj.specName
    );
    return modifyChain(hasModifiedBefore, isRepeated, disMatch.modifiedMatchDishes, modifiedDishObj, modifiedIndex);
}

// 初始化获取商户修改匹配菜的列表的职责链
var modifyChain = pushModified.after(replaceModified).after(delModified).after(nonModify);

function pushModified(hasModifiedBefore, isRepeated, modifiedArr, dish) {
    if (!hasModifiedBefore && !isRepeated) {
        var modifiedTpDish;
        var dishName = getGivenDishFromLocal(dish.dishId).dishName;
        modifiedTpDish = Object.assign({}, dish.rowData, {
            dishId: dish.dishId,
            dishName: dishName,
            specUuid: dish.specUuid,
            specId: dish.specId,
            specName: dish.specName,
            isMatch: 1
        });
        modifiedArr.push(modifiedTpDish);
        return modifiedArr;
    } else return next();
}

function replaceModified(hasModifiedBefore, isRepeated, modifiedArr, dish, index) {
    if (!(hasModifiedBefore && !isRepeated)) return next();
    modifiedArr[index] = Object.assign({}, modifiedArr[index],
        {specId: dish.specId, specName: dish.specName, specUuid: dish.specUuid});
    return modifiedArr;
}

function delModified(hasModifiedBefore, isRepeated, modifiedArr, dish, index) {
    if (!(hasModifiedBefore && isRepeated)) return next();
    // 删除重复修改的菜品
    modifiedArr.splice(index, 1);
    return modifiedArr;
}

function nonModify(hasModifiedBefore, isRepeated, modifiedArr, dish, index) {
    if (!hasModifiedBefore && isRepeated) {
        return modifiedArr;
    } else return next();
}

function next() {
    return 'next';
}

function getGivenDishFromLocal(dishId) {
    var localDish = [
        {
            dishId: 123, dishName: '土豆丝', specs: [
            {specName: '规格1', specId: 1231, specUuid: '1231'},
            {specName: '规格2', specId: 1232, specUuid: '1232'}
        ]
        },
        {
            dishId: 124, dishName: '酸辣土豆丝', specs: [
            {specName: '规格3', specId: 1241, specUuid: '1241'},
            {specName: '规格4', specId: 1242, specUuid: '1242'}
        ]
        }
    ];
    return localDish.filter(function (dish) {
        return dishId == dish.dishId;
    })[0];
}