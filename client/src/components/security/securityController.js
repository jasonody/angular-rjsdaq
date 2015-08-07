export default class securityController {
	
	constructor () {
		
	}
	
	priceString = () => {

		return this.security.price == null ? '-' : this.security.price + '¢';
	};
}

securityController.$inject = [];