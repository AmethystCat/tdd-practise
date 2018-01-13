var expect = chai.expect;
describe('sku match spu unit', function () {

    // beforeEach(function() {
       var a = [{skuId: 1, spuId: 1}, {skuId: 2, spuId: 1}, {skuId: 11, spuId: 2}, {skuId: 12, spuId: 2}];
       var b = [{spuId: 1, specs: [{skuId: 1}, {skuId: 2}, {skuId: 3}]}, {spuId: 2, specs: [{skuId: 11}, {skuId: 12}, {skuId: 13}]}, {spuId: 3, specs: [{skuId: 22}, {skuId: 23}, {skuId: 24}]}];
    // });
    it('should return array', function () {
        // given
        // when
        // then
        expect(Array.isArray(getSelectedSpu(a, b))).to.be.true;
    });

    it('should filter spu', function() {
        // given
        var expectResult = [{spuId: 1, specs: [{skuId: 1}, {skuId: 2}, {skuId: 3}]}, {spuId: 2, specs: [{skuId: 11}, {skuId: 12}, {skuId: 13}]}];
        // when
        var result = getSpuWithAllSpecs(a, b);
        // then
        expect(result).to.have.deep.members(expectResult);
    })

    it('should filter matched sku when input matched spu and skuIDs', function() {
        // given
        var expectResult = {spuId: 1, specs: [{skuId: 1}, {skuId: 2}]};
        var spu = {spuId: 1, specs: [{skuId: 1}, {skuId: 2}, {skuId: 3}]};
        var skuIDs = [1, 2];
        // when
        var result = getSpuWithMatchedSku(skuIDs, spu);
        // then
        expect(result).to.deep.equal(expectResult);
    });

    it('should return sku array when in same spu', function() {
        // given
        var skus = [{skuId: 1, spuId: 1}, {skuId: 2, spuId: 1}, {skuId: 11, spuId: 2}, {skuId: 12, spuId: 2}] 
        var expectResult = {1: [1, 2], 2: [11, 12]};
        // when
        var skuIdList = getSpuSkuIdmap(skus);
        // then
        expect(skuIdList).to.deep.equal(expectResult);
    });

    it('should return match spu when input skus', function() {
        // give
        var expectResult =[{spuId: 1, specs: [{skuId: 1}, {skuId: 2}]}, {spuId: 2, specs: [{skuId: 11}, {skuId: 12}]}]; 
        // when
        var result = getSelectedSpu(a, b);
        // then
        expect(result).to.have.deep.members(expectResult);
    });
});