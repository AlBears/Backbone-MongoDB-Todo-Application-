var TodoItemView = Backbone.View.extend({
	tagName: 'li',
	initialize: function(options){
		if (!(options && options.model))
			throw new Error("Model is not specified");
	},
	render: function(){
		this.$el.html(this.model.escape("title"));
		return this;
	}
});