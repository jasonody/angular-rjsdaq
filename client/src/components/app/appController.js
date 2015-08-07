import RJSDAQ from './../../RJSDAQ';

export default class appController {
	
	constructor ($scope) {
		
		this.count = 0;
		
		$scope.$watch(
			() => { return this.securities; }.bind(this),
			(newValue, oldValue) => { console.log("Securities changed: " + ++this.count); }.bind(this)
		);
		
		this.connect($scope);
	}
	
	connect ($scope) {

		var SERVER_ADDRESS = 'localhost';
		var SERVER_PORT = 5000;

		// Connect to the server
		RJSDAQ.connect(SERVER_ADDRESS, SERVER_PORT, newData => {
			// This function will be called every time new data becomes available
			$scope.$apply(() => {
				this.securities = Object.keys(newData.securities)
				.map(symbol => {

					var security = newData.securities[symbol];
					security.symbol = symbol;

					return security;
				});
				console.log(this.securities);	
			});
		});

		/* The following are commands that you can issue to the server
*
* - Buy (eg. 10 units of 'fxs')
*
*   RJSDAQ.buy('fxs', 10, function(err) { console.log(err); });
*
* - Sell (eg. 50 units of 'bny')
*
*   RJSDAQ.sell('bny', 50, function(err) { console.log(err); });
*
* - Go Public (ie. List your own security with a 3-letter symbol and a name)
*
*   RJSDAQ.goPublic('bik', 'Bikes', function(err) { console.log(err); });
*
*/
	}
}

appController.$inject = ['$scope'];