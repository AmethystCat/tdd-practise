function getSelectedSpu(skus, spus) {
    var skuIds =  getSpuSkuIdmap(skus);
    var spus = getSpuWithAllSpecs(skus, spus);

    return spus.map(function(spu) {
        return getSpuWithMatchedSku(skuIds[spu.spuId], spu);
    });
}

function getSpuWithAllSpecs(skus, spus) {
    var arr = [];
    var spu = null;
    skus.forEach(function(sku, index) {
        if (index && sku.spuId !== skus[index - 1].spuId) {
            arr.push(getSpu(spu, spus));
            spu = sku.spuId;
        } else {
            spu = sku.spuId;
        }

        if (index === skus.length - 1) {
            arr.push(getSpu(spu, spus));
        }
    });
    return arr;
}

function getSpu(spuId, spus) {
    return spus.filter(function(spu){
        return spu.spuId === spuId;
    })[0];
}

function getSpuWithMatchedSku(skuIds, spuObj) {
    // 浅拷贝，防止修改原数组
    var spuObjCopy = Object.assign({}, spuObj);                                    
    spuObjCopy.specs = spuObj.specs.filter(function(sku) {
        return skuIds.includes(sku.skuId);
    });
    return spuObjCopy;
}

function getSpuSkuIdmap(skus) {
    var obj = {};
    skus.forEach(function(sku, index) {
        if (index && sku.spuId === skus[index - 1].spuId) {
            obj[sku.spuId].push(sku.skuId);
        } else {
            obj[sku.spuId] = [sku.skuId];
        }
    });
    return obj;
}