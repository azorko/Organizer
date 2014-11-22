TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  
  initialize: function (options) {
    this.listenTo(this.collection, "sync add", this.render);
  },
	
  template: JST['boards/index'],
	
	events: {
		"click li.board-index": "boardShow",
		"click li.board-new": "boardNew"
	},
	
	render: function () {
		var content = this.template({
			boards: this.collection
		});
		this.$el.html(content);
		return this;
	},
	
	boardShow: function(event) {
		var boardId = $(event.currentTarget).data("id");
		Backbone.history.navigate("#boards/" + boardId, { trigger: true });
	},
	
	boardNew: function(event) {
		Backbone.history.navigate("#boards/new", { trigger: true });
	}

});
