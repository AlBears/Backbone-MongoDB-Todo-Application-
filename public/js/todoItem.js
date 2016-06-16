var TodoItem = Backbone.Model.extend({
	validate: function(attrs) {
		if(!attrs.title)
			return "title is required";
	}
});