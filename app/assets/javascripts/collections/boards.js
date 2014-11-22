TrelloClone.Collections.Boards = Backbone.Collection.extend({

  model: TrelloClone.Models.Board,
	url: "/api/boards",
	
	getOrFetch: function (id) {
		var boards = this;
		var board = boards.get(id);
		if (board) {
			board.fetch();
		} else {
		  board = new TrelloClone.Models.Board({id: id});
			// can't create because that will send POST request to rails (we don't actually want to add to the db, just to the backbone db)
			board.fetch({
				success: function () { boards.add(board); }
			});
		}
		return board;
	}

});

TrelloClone.Collections.boards = new TrelloClone.Collections.Boards();