var SzoneApp = (function(){

	var addClient = function(client) {
		$.ajax({
			type: "POST",
			url: '/clients',
			data: {client:client}
		});
	};

	var updateClient = function(client, id) {
		$.ajax({
			type: "PUT",
			url: '/clients/' + id,
			data: {client:client}
		});
	};

	var deleteClient = function(client, id) {
		$.ajax({
			type: "DELETE",
			url: '/clients/' + id,
			data: {client:client}
		});
	};

	var displayList = function(){
		$.get( "/clients", function(data) {
			var container = $("#books-database > tbody");
			container.empty();

			//Add the database
			for (var i=0; i<data.length; i+=1){
				var row = $("<tr></tr>");
				var cellTitle = $("<td></td>").text(data[i].title);
				var cellAuthor = $("<td></td>").text(data[i].author);
				var cellGenre = $("<td></td>").text(data[i].genre);
				var cellImageSource = $("<td></td>").text(data[i].imgSrc);
				var cellReview = $("<td></td>").text(data[i].review);
				var cellPrice = $("<td></td>").text(data[i].price);
				var cellDateOfPub = $("<td></td>").text(data[i].dateOfPub);
				var cellRating = $("<td></td>").text(data[i].rating);
				var cellNumOfSales = $("<td></td>").text(data[i].numOfSales);
				var cellPromotions = $("<td></td>").text(data[i].promotions);
				var cellActions = $("<td></td>");
				var btnEdit = $("<button></button>").text('Edit')
								.addClass("btn btn-primary edit-book")
								.prop({"type": "button", "name": data[i].title});
				var btnDelete = $("<button></button>").text('Del')
								.addClass("btn btn-danger delete-book").css({"margin-left": "10px"})
								.prop({"type": "button", "name": data[i].title});

				cellActions.append(btnEdit).append(btnDelete);

				row.append(cellTitle).append(cellAuthor).append(cellGenre).append(cellReview)
					.append(cellPrice).append(cellDateOfPub).append(cellRating).append(cellNumOfSales)
					.append(cellPromotions).append(cellImageSource).append(cellActions);
				container.append(row);
			}

		},"json");
		
	};
	// public api
	return {
		addClient: addClient,
		updateClient: updateClient,
		deleteClient: deleteClient
	};
})();