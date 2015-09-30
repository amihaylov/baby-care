var SzoneApp = (function(){

	var addSitter = function(client) {
		$.ajax({
			type: "POST",
			url: '/sitters',
			data: {client:client}
		});
	};

	var addClient = function(client) {
		$.ajax({
			type: "POST",
			url: '/clients',
			data: {client:client}
		});
	};

	// public api
	return {
		addClient: addClient,
		addSitter: addSitter
	};
})();