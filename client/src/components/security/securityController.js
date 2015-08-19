export default class securityController {
	
	constructor($scope) {
		
		this._priceHistory = [];
		this.changeText = '';
		this.changePercentage = 0.0;
		
		this._init($scope);
	}
	
	_init($scope) {
		
		$scope.$watch(
			(scope) => { return this.security.price },
			(newValue, oldValue, scope) => { 
				
				this._priceHistory.push(this.security.price);
				this._updateChange(); 
			}
		);
	}
	
	_updateChange() {
		
		if (this._priceHistory.length > 1) {
			var newPrice = this._priceHistory[this._priceHistory.length - 1];
			var previousPrice = this._priceHistory[this._priceHistory.length - 2];

			var priceChange = (((newPrice - previousPrice) / previousPrice) *100).toFixed(1);
			var priceChangeSign = priceChange > 0 ? '+' : '';

			this.changeText = `${priceChangeSign}${priceChange}%`;
			this.changePercentage = priceChange;
		}
	}
	
	getPriceString() {

		return this.security.price == null ? '-' : this.security.price + '¢';
	}
	
}

securityController.$inject = ['$scope'];