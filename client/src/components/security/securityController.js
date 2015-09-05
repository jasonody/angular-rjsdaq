const GRAPH_BAR_WIDTH = 18;
const GRAPH_BAR_MARGIN = 5;

export default class securityController {
	
	constructor($scope, $element, $window) {
		
		this._priceHistory = [];
		this._graphWidth = null;
		this.changeText = '';
		this.changePercentage = 0.0;
		this.priceHistoryGraph = [];
		
		this._init($scope, $element, $window);
	}
	
	_init($scope, $element, $window) {
		
		$scope.$watch(
			(scope) => { return this.security.price },
			(newValue, oldValue, scope) => { 
				
				this._priceHistory.push(this.security.price);
				this._updateChange();
				this._updateTrend();
				this._updatePriceHistoryGraph();
			}
		);
		
		var graphElement = $element.find('ul')[0];
		$scope.$watch(
			(scope) => { return graphElement.clientWidth; },
			(newValue, oldValue, scope) => { 
				
				this._graphWidth = graphElement.clientWidth;
				this._updatePriceHistoryGraph(); 
			}
		);
		
		var apply = () => { $scope.$apply(); };
		angular.element($window).on('resize', apply);
		$scope.$on('$destroy', () => { angular.element($window).off('resize', apply); console.log('off!'); });
	}
	
	_updateChange() {
		
		var newPrice = this._priceHistory[this._priceHistory.length - 1];
		var previousPrice = this._priceHistory[this._priceHistory.length - 2];

		var priceChange = (((newPrice - previousPrice) / previousPrice) *100).toFixed(1);
		var priceChangeSign = priceChange > 0 ? '+' : '';

		this.changeText = `${priceChangeSign}${priceChange}%`;
		this.changePercentage = priceChange;
	}
	
	_updateTrend() {

		if (this._priceHistory.length < 10) {
			this.trendText = '–';
		} else {
			var priceHistory = this._priceHistory.slice(-10);

			var sum = priceHistory.reduce(function (p, sum) {

				return p + sum;
			});
			var average = sum / 10;
			var newPrice = this._priceHistory[this._priceHistory.length - 1];
			var trendPercentage = (((newPrice - average) / average) * 100).toFixed(1);
			var trendSign = trendPercentage > 0 ? '+' : '';

			this.trendText = `${trendSign}${trendPercentage}%`;
			this.trendPercentage = trendPercentage;
		}
	}
	
	_updatePriceHistoryGraph() {
		
		var minPrice, maxPrice;
		var priceHistory = this._priceHistory;
		
		if (this._graphWidth) {
			priceHistory = this._priceHistory.slice(-Math.floor(
				(this._graphWidth - GRAPH_BAR_MARGIN) / (GRAPH_BAR_WIDTH + GRAPH_BAR_MARGIN)
			));
		}

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

securityController.$inject = ['$scope', '$element', '$window'];