var TodoItem = Backbone.Model.extend({
	defaults: {
		isCompleted: false
	},

	url: 'fakeUrl',

	validate: function(attrs) {
		if(!attrs.title)
			return "title is required";
	},
	toggle: function(){
		this.set("isCompleted", !this.get("isCompleted"));
	}
});