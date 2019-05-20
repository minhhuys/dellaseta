var Configuration = {
	merchantId: 'a5828864-ebe2-4947-adcb-522dab54998c',
	imageRoot: 'https://static.foodizzi.com/',
	hostElasticSearch: 'es.foodizzi.com',
	userElasticSearch: 'amara',
	passwordElasticSearch: 'dSPKMcdQkG5X97b',
	protocolElasticSearch: 'https',
	portElasticSearch: '443',
	inventoryId: "e6f92a7a-1b66-4afc-9ff9-921263d8688b",
	apiUrl: "https://api.foodtalk.vn",
	currentLanguage: "838aef56-78bb-11e6-b5a6-00155d582814",
	email: 'info@dellaseta.vn',
};

var ConfigHome = {
	home1: 1,
	home2: 2,
	home3: 3,
	home4: 4,
	home5: 5,
	home6: 6,
	home7: 7,
	home8: 8
};

var client = elasticsearch.Client({
	host:
		[{
			host: Configuration.hostElasticSearch,
			auth: Configuration.userElasticSearch + ':' + Configuration.passwordElasticSearch,
			protocol: Configuration.protocolElasticSearch,
			port: Configuration.portElasticSearch
		}]
});

