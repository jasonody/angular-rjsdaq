export default class priceAgeController {
	
	constructor($scope, $interval) {
		
		this.priceAge = 'never';
		
		this._reactToPriceChange($scope, $interval);
	}
	
	_reactToPriceChange($scope, $interval) {
		
		$scope.$watch(
			scope => { return scope.$parent.vm.security.price; },
			(newValue, oldValue, scope) => { 

				if (newValue !== oldValue) {

					this._lastPriceUpdate = Date.now();
					this.priceAge = 'just now';

					$interval.cancel(this._intervalId);
					this._intervalId = $interval(() => {

						if (this._lastPriceUpdate) {
							var seconds = Math.floor((Date.now() - this._lastPriceUpdate) / 1000);
							this.priceAge = seconds + 's ago';
						}
					}, 1000);
				}
			}
		);
	}
}

priceAgeController.$inject = ['$scope', '$interval'];