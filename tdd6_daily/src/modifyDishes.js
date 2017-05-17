var disMatch = {};
disMatch.modifiedMatchDishes = [];

Function.prototype.after = function(fn) {
    var self = this;
    return function() {
        var result = self.apply(this, arguments);
        if (result === 'next') {
            return fn.apply(this, arguments);
        }
        return result;
    };
};

function modifyDishes(dish) {

    var hasModifiedBefore = false;
    var isRepeated = false;
    var modifiedIndex = 0;
    var tpId = dish.rowData.tpDishId;

    disMatch.modifiedMatchDishes.forEach(function (dish, index) {
        if (tpId == dish.tpDishId) {
            hasModifiedBefore = true;
            modifiedIndex = index;
        }
    });

    var originRowData = dish.rowData,
        dishId = dish.currentModifiedDishId || dish.rowData.dishId,
        specId = dish.currentModifiedSpec.specId,
        specName = dish.currentModifiedSpec.specName,
        specUuid = dish.currentModifiedSpec.specUuid;

    isRepeated = (originRowData.specUuid == specUuid && originRowData.dishId == dishId &&
            originRowData.specId == specId && originRowData.specName == specName);
    return modifyChain(hasModifiedBefore, isRepeated, disMatch.modifiedMatchDishes, dish, modifiedIndex);
}

var modifyChain = pushModified.after(replaceModified).after(delModified);

function pushModified(hasModifiedBefore, isRepeated, modifiedArr, dish) {
    if (!hasModifiedBefore && !isRepeated) {
        var modifiedRow;
        var dishId = dish.currentModifiedDishId || dish.rowData.dishId,
            specId = dish.currentModifiedSpec.specId,
            specName = dish.currentModifiedSpec.specName,
            specUuid = dish.currentModifiedSpec.specUuid,
            rowData = dish.rowData;

        var dishName = getGivenDishFromLocal(dishId).dishName;
        modifiedRow = Object.assign({}, rowData, {
            dishId: dishId, dishName: dishName, specUuid: specUuid,
            specId: specId, specName: specName
        });
        modifiedArr.push(modifiedRow);
        return modifiedArr;
    } else return next();
}

function replaceModified(hasModifiedBefore, isRepeated, modifiedArr, dish, index) {
    if (!(hasModifiedBefore && !isRepeated)) return next();
    var specId = dish.currentModifiedSpec.specId,
        specName = dish.currentModifiedSpec.specName,
        specUuid = dish.currentModifiedSpec.specUuid;

    modifiedArr[index] = Object.assign({}, modifiedArr[index],
        {specId: specId, specName: specName, specUuid: specUuid});
    return modifiedArr;
}

function delModified(hasModifiedBefore, isRepeated, modifiedArr, dish, index) {
    if (!(hasModifiedBefore && isRepeated)) return next();
    var newModifiedArr = modifiedArr.slice(0, modifiedArr.length);
    newModifiedArr.splice(index, 1);
    return newModifiedArr;
}

function next() {
    return 'next';
}

function getGivenDishFromLocal(dishId) {
    var localDish = [
        {dishId: 123, dishName: '土豆丝', specs: [
            {specName: '规格1', specId: 1231, specUuid: '1231'},
            {specName: '规格2', specId: 1232, specUuid: '1232'}
        ]},
        {dishId: 124, dishName: '酸辣土豆丝', specs: [
            {specName: '规格3', specId: 1241, specUuid: '1241'},
            {specName: '规格4', specId: 1242, specUuid: '1242'}
        ]}
    ];
    return localDish.filter(function (dish) {
        return dishId == dish.dishId;
    })[0];
}