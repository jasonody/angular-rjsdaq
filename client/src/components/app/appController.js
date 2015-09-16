import RJSDAQ from './../../RJSDAQ';

export default class appController {
	
	constructor($scope) {
		
		this._data = undefined;
		this.securities = undefined;
		this.sortKey = 'name';
		this.sortOrder = 'desc';
		
		this._connect($scope);
	}
	
	_connect($scope) {

		var SERVER_ADDRESS = 'localhost';
		var SERVER_PORT = 5000;

		// Connect to the server
		RJSDAQ.connect(SERVER_ADDRESS, SERVER_PORT, newData => {
			// This function will be called every time new data becomes available
			$scope.$apply(() => {
				this._data = newData;
				this.sortSecurities();
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
	
	sortSecurities() {
		
		if (this._data) {
			var securities = this._data.securities;
			var securitySymbols = Object.keys(this._data.securities);
			var sortedSecuritySymbols;
			var sortKey = this.sortKey;
			var sortOrder = this.sortOrder;

			if (this.sortKey === 'name') {
				sortedSecuritySymbols = securitySymbols.sort(function (a, b) {

					if (this.sortOrder === 'asc') {
						return securities[a].name > securities[b].name;
					} else {
						return securities[a].name < securities[b].name;
					}
				}.bind(this));
			} else {
				sortedSecuritySymbols = securitySymbols.sort(function (a, b) {

					if (this.sortOrder === 'asc') {
						return securities[a].price > securities[b].price;
					} else {
						return securities[a].price < securities[b].price;
					}
				}.bind(this));
			}
			
			console.log(sortedSecuritySymbols);
			
			this.securities = sortedSecuritySymbols
			.map(symbol => {

				var security = this._data.securities[symbol];
				security.symbol = symbol;

				return security;
			});
		}
	}
}

appController.$inject = ['$scope'];