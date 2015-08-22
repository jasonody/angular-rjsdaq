export default class securityController {
	
	constructor($scope) {
		
		this._priceHistory = [];
		this.changeText = '';
		this.changePercentage = 0.0;
		this.priceHistoryGraphGraph = [];
		
		this._init($scope);
	}
	
	_init($scope) {
		
		$scope.$watch(
			(scope) => { return this.security.price },
			(newValue, oldValue, scope) => { 
				
				this._priceHistory.push(this.security.price);
				this._updateChange();
				this._updatePriceHistoryGraph();
			}
		);
	}
	
	_updateChange() {
		
		var newPrice = this._priceHistory[this._priceHistory.length - 1];
		var previousPrice = this._priceHistory[this._priceHistory.length - 2];

		var priceChange = (((newPrice - previousPrice) / previousPrice) *100).toFixed(1);
		var priceChangeSign = priceChange > 0 ? '+' : '';

		this.changeText = `${priceChangeSign}${priceChange}%`;
		this.changePercentage = priceChange;
	}
	
	_updatePriceHistoryGraph() {
		
		var minPrice, maxPrice;
		var priceHistory = this._priceHistory;

		priceHistory.forEach(function (price) {

			if (minPrice == null || minPrice > price) {
				minPrice = price;
			}
			if (maxPrice == null || maxPrice < price) {
				maxPrice = price;
			}
		});

		var delta = maxPrice - minPrice;

		this.priceHistoryGraph = priceHistory.map(function (price, i) {

			var height = delta === 0 ? 100 : 10;

			if (delta > 0) {
				height += 90 * (1 - ((maxPrice - price) / delta))
			}

			return {
				price,
				height
			};
		});
	}
	
	getPriceString() {

		return this.security.price == null ? '-' : this.security.price + '¢';
	}
	
}

securityController.$inject = ['$scope'];