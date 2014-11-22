TrelloClone.Views.BoardsNew = Backbone.View.extend({

	// initialize: function (options) {
	// 	this.listenTo(this.model, "sync", this.render);
	// },

	events: {
		"submit form": "submitNew"
	},

	template: JST['boards/new'],

	render: function () {
		var content = this.template({
			board: this.model
		});
		this.$el.html(content);
		return this;
	},

	submitNew: function (event) {
		debugger
		event.preventDefault();
		var attrs = $(event.currentTarget).serializeJSON().board;	
		this.collection.create(attrs, {
		  success: (function () {
			  Backbone.history.navigate("#", {trigger: true})
			}).bind(this)
		});
	}

	});