var SzoneApp = (function(){

	var addSitter = function(sitter) {
		$.ajax({
			type: "POST",
			url: '/sitters',
			data: sitter
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