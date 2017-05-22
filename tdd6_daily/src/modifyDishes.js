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
            id: dish.currentModifiedDishId || '',
            specId: dish.currentModifiedSpecId || ''
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
    isRepeated = (originRowData.dishId == modifiedDishObj.id && originRowData.specId == modifiedDishObj.specId);
    if (!modifiedDishObj.id) {
        modifiedDishObj.id = hasModifiedBefore ? disMatch.modifiedMatchDishes[modifiedIndex].dishId : originRowData.dishId;
    }
    return modifyChain(hasModifiedBefore, isRepeated, disMatch.modifiedMatchDishes, modifiedDishObj, modifiedIndex);
}

// 初始化获取商户修改匹配菜的列表的职责链
var modifyChain = pushModified.after(updateModified).after(delModified).after(nonModify);

function pushModified(hasModifiedBefore, isRepeated, modifiedArr, dish) {
    if (!hasModifiedBefore && !isRepeated) {
        var localMatchDish = getGivenDishFromLocal(dish.id, dish.specId);
        var modifiedTpDish = Object.assign({}, dish.rowData, localMatchDish, {isMatch: 1});
        modifiedArr.push(modifiedTpDish);
        return modifiedArr;
    } else return next();
}

function updateModified(hasModifiedBefore, isRepeated, modifiedArr, dish, index) {
    if (!(hasModifiedBefore && !isRepeated)) return next();
    var givenDishFromLocal = getGivenDishFromLocal(dish.id, dish.specId);
    modifiedArr[index] = Object.assign({}, modifiedArr[index], givenDishFromLocal);

    return modifiedArr;
}

function delModified(hasModifiedBefore, isRepeated, modifiedArr, dish, index) {
    if (!(hasModifiedBefore && isRepeated)) return next();
    // 删除重复修改的菜品
    modifiedArr.splice(index, 1);
    return modifiedArr;
}

function nonModify(hasModifiedBefore, isRepeated, modifiedArr) {
    if (!hasModifiedBefore && isRepeated) {
        return modifiedArr;
    } else return next();
}

function next() {
    return 'next';
}

function getGivenDishFromLocal(dishId, specId) {
    if (!dishId) return {};
    var targetMatchDish;
    var localDishes = getLocalDishes();
    var matchDish =  localDishes.filter(function (localDish) {
        return dishId == localDish.dishId;
    })[0];
    var matchSpec = getGivenSpecFromLocalDish(matchDish, specId);
    delete matchDish.specs;
    targetMatchDish = Object.assign({}, matchDish, matchSpec);
    return targetMatchDish;
}

function getGivenSpecFromLocalDish(matchDish, specId) {
    var defaultSpecs = {specId: '', specName: '', specUuid: ''};
    if (!matchDish) return defaultSpecs;
    var specs = (matchDish.specs && matchDish.specs.length) ? matchDish.specs : [];
    var matchSpec = specs.filter(function (spec) {
        return specId == spec.specId;
    });
    return matchSpec.length > 0 ? matchSpec[0] : defaultSpecs;
}

function getLocalDishes() {
    return [
        {
            dishId: 123, dishName: '土豆丝', dishUuid: '123', specs: [
            {specName: '规格1', specId: 1231, specUuid: '1231'},
            {specName: '规格2', specId: 1232, specUuid: '1232'}
        ]
        },
        {
            dishId: 124, dishName: '酸辣土豆丝', dishUuid: '124', specs: [
            {specName: '规格3', specId: 1241, specUuid: '1241'},
            {specName: '规格4', specId: 1242, specUuid: '1242'}
        ]
        },
        {
            dishId: 125, dishName: '水煮鱼', dishUuid: '125', specs: [
            {specName: '规格5', specId: 1251, specUuid: '1251'},
            {specName: '规格6', specId: 1252, specUuid: '1252'}
        ]
        }
    ];
}