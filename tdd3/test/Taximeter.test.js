import { expect } from 'chai';
import Taximeter from '../src/Taximeter';

describe('Taximeter test', () => {
    it('should_return_staring_price_when_distance_is_less_than_3_kilometre', () => {
        // given
        const distance = 3;
        const startingPrice = 11;
        const taximeter = new Taximeter({distance, startingPrice});
        // when
        const finalPrice = taximeter.computedPrice();
        // then
        expect(finalPrice).to.equal(startingPrice);
    });

    it('should_add_unit_price_every_kilometer_when_distance_bigger_than_3_kilometer', () => {
        // given
        const distance = 4;
        const startingPrice = 11;
        const unitPrice = 1.6;
        const taximeter = new Taximeter({distance, startingPrice, unitPrice});
        // when
        const finalPrice = taximeter.computedPrice();
        // then
        expect(finalPrice).to.equal(12.6);
    });

    it('should_return_4_kilometer_when_distance_is_3.8_kilometre', () => {
        // given
        const distance = 4;
        const startingPrice = 11;
        const unitPrice = 1.6;
        const taximeter = new Taximeter({distance, startingPrice, unitPrice});
        // when
        const finalPrice = taximeter.computedPrice();
        // then
        expect(finalPrice).to.equal(12.6);
    });
});