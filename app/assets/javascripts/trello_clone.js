window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		var $rootEl = $("#main");
		new TrelloClone.Routers.Router({
			$rootEl: $rootEl
		});
		Backbone.history.start();
  }
};

Backbone.CompositeView = Backbone.View.extend({
	
	addSubview: function (selector, subview) {
		this.subviews(selector).push(subview);
		this.attachSubview(selector, subview.render());
	},
	
	//attach 1 subview
	attachSubview: function (selector, subview) {
		this.$(selector).append(subview.$el);
		subview.delegateEvents();
	},
	
	//call singular attachSubview for each subview
	attachSubviews: function () {
		var view = this;
		//.each(value - subviews, key - selector)
		_(this.subviews()).each(function (subviews, selector) {
			view.$(selector).empty();
			_(subviews).each(function (subview) {
				view.attachSubview(selector, subview);
			});
		});
	},
	
	//removes view & all its subviews
	remove: function () {
		Backbone.View.prototype.remove.call(this);
		_(this.subviews()).each(function (subviews) {
			_(subviews).each(function (subview) {
				subview.remove();
			});
		});
	},
	
	//remove a singular subview
	removeSubview: function (selector, subview) {
		subview.remove();
		var subviews = this.sibviews(selector);
		subviews.splice(subviews.indexOf(subview), 1);
	},
	
	subviews: function (selector) {
		this._subviews = this._subviews || {};
		if(!selector) {
			return this._subviews;
		} else {
			this._subviews[selector] = this._subviews[selector] || [];
			return this._subviews[selector];
		}
	}
});
