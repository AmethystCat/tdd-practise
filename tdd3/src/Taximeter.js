export default class Taximeter {
    constructor(args) {
        let {distance, startingPrice, unitPrice} = args;
        this.boundaryDistance = 3;
        this.distance = distance;
        this.startingPrice = startingPrice;
        this.unitPrice = unitPrice;
    }

    _computedPriceExceedBoundary() {
        let priceExceedBoundary = this.startingPrice + Math.ceil(this.distance - this.boundaryDistance) * this.unitPrice;
        return priceExceedBoundary;
    }

    computedPrice() {
        let isLessThanStartDistance = (this.distance <= this.boundaryDistance);
        let finalPrice = isLessThanStartDistance ? this.startingPrice : this._computedPriceExceedBoundary();
        return finalPrice;
    }
}