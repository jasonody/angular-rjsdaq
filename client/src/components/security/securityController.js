export default class securityController {
	
	constructor() {
		
	}
	
	getPriceString() {

		return this.security.price == null ? '-' : this.security.price + '¢';
	};
}

securityController.$inject = [];