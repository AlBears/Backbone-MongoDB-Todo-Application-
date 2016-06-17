var TodoItem = Backbone.Model.extend({
	defaults: {
		completed: false
	},

	urlRoot: 'http://localhost:3000/api/todoitems',


	validate: function(attrs) {
		if(!attrs.title)
			return "title is required";
	},
	toggle: function(){
		this.set("completed", !this.get("completed"));
	}
});