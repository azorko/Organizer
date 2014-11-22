TrelloClone.Routers.Router = Backbone.Router.extend({
	initialize: function (options) {
	  this.$rootEl = options.$rootEl;	
	},
	
  routes: {
  	"": "boardsIndex",
		"boards/new": "boardNew",
		"boards/:id": "boardsShow"
  },
	
	boardsIndex: function () {
		TrelloClone.Collections.boards.fetch();
		
		var indexView = new TrelloClone.Views.BoardsIndex({
			collection: TrelloClone.Collections.boards
		});
		this.swapView(indexView);
	},
	
	boardsShow: function (id) {
		var board = TrelloClone.Collections.boards.getOrFetch(id);
		
		var showView = new TrelloClone.Views.BoardsShow({
			model: board
		});
		this.swapView(showView);
	},
	
	boardNew: function () {
		var board = new TrelloClone.Models.Board();
		var newView = new TrelloClone.Views.BoardsNew({
			model: board,
			collection: TrelloClone.Collections.boards
		});
		this.$rootEl.append(newView.render().$el);
		// this.$rootEl.find("#new-board").empty().html(newView.render().$el);
	},
	
	swapView: function (newView) {
		this._currentView && this._currentView.remove();
		this._currentView = newView;
		this.$rootEl.html(this._currentView.render().$el);
	}
	
});
