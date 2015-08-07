app.$inject = [];

export default function app () {
	
	return {
		template: require('./appTemplate.html'),
		controller: 'appController'
	};
}