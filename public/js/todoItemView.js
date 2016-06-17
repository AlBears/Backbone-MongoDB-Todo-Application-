var TodoItemView = Backbone.View.extend({
	tagName: 'li',
	initialize: function(options){
		if (!(options && options.model))
			throw new Error("Model is not specified");
		this.model.on("change", this.render, this);
	},

	events: {
		"click .toggle": "onClickToggle",
		"click .delete": "onClickDelete",
		"click .edit": "onClickEdit",
		"click .update": "onClickUpdate"
	},

	onClickUpdate: function(){
		console.log('cotcha');
		this.model.set('title', $('.amend').val());
		this.model.save();

	},

	onClickEdit: function(todoItem){
		var title = this.model.get('title');
		this.$el.html('<input class="amend" type="text" value="' + title +'"><button class="update">Update</button>');
		
	},

	onClickDelete: function(){
		this.model.destroy();
	},

	onClickToggle: function(){
		this.model.toggle();
		this.model.save();
	},

	render: function(){
		this.$el.attr("id", this.model.id)

		this.$el.toggleClass('completed', this.model.get("completed"));

		var checked = this.model.get("completed") ? "checked" : "";
		this.$el.html("<input class='toggle' type='checkbox'"+checked+"></input> "+this.model.escape("title") + " <button class='edit'>Edit</button> <button class='delete'>Delete</button>");
		return this;
	}
});