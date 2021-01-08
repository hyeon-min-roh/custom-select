var selectCustom = (elSelect) => {
	return {
		el: elSelect,
		data: {
			title: "",
			name: "",
			value: "",
			values: [],    // option value
			options: [],   // option name
			isActive: false,
		},
		created(){
		
			var v = this;
			v.title = $(elSelect).data("title") ? $(elSelect).data("title") : "-";
			v.name = $(elSelect).attr("name");
			
			$(elSelect).find("option").each(function(){
				v.values.push( $(this).val() );
				v.options.push( $(this).text() );
			});
		},
		methods: {
			toggleOptionList(){
				this.isActive = !this.isActive;
			},
			
			setValue(value, idx){
				this.isActive = false; // close					
				this.value = value;
				this.title = this.options[idx];					
			}
		},
		template: `
			<div class="select-wrapper">
				<input type="hidden" v-bind:name="name" v-bind:value="value">
				<div class="select-custom">
					<div class="select" v-on:click="toggleOptionList();">{{title}}</div>
					
					<ul v-show="isActive">
						<li v-for="(value, idx) in values" v-on:click="setValue(value, idx)">{{ options[idx] }}</li>
					</ul>
				</div>
			</div>
		`,
	}
};

$(document).ready(function(){
	$('select').each(function(idx){
		$(this).attr("id", "c-select"+idx);
		new Vue( selectCustom( "#"+$(this).attr("id") ) );
	});
});