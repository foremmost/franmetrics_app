franApp.component('g-select', {
	props: {
		gtitle:String,
		items: Array,
		isSimple: Boolean,
		multiple: Boolean
	},
	data(){
		//
		return {
			opened:false,
			_value:'',
			_text:'&mdash;',
			selectedId:-1,
			selected: [],
			title: this.gtitle
		}
	},
	template:`
		<div class="select" @click="choose" :class="opened ? '-opened' : ''" tabindex="1" @blur="close">
			<div class="select-title">
				<template v-if="!multiple">
					<span>{{ title }}</span>
				</template>
			</div>
				<div class="select-cont">
					<div class="select-head">
					<div class="select-item"><span v-html="text"></span></div>
				</div>
				<div class="select-arrow">
					<svg class="icon">
						<use xlink:href="/img/sprite.svg#select"></use>
					</svg>
				</div>
				<template v-if="!multiple">
					<ul class="select-body" v-if="isSimple">
						<li 
							v-for="(item,index) in items" 
							:key="index" 
							:class="selectedId == index ? '-active' : ''"
							class="select-body_item" 
							@click="simpleSelect(item,index)"
							>
							{{item}}
						</li>
					</ul>
					<ul class="select-body" v-else>
						<li 
							v-for="(item) in items" 
							:key="item.id" 
							:class="selectedId == item.id ? '-active' : ''"
							class="select-body_item" 
							@click="select(item.id,item.value)"
							>
							{{item.value}}
						</li>
					</ul>
				</template>
				<template v-else>
					<ul class="select-body">
						<li class="select-actions">
							<button type="button" @click="selectAll">Select All</button>
							<button type="button" @click="clearAll">Clear All</button>
						</li>
						<li 
							v-for="(item) in items" 
							:key="item.id" 
							class="select-body_item" 
						>
							<label class="checkbox" >
								<input type="checkbox" :checked="selected.indexOf(item.id) > -1" @change="select(item.id,item.value)">
								<span class="checkbox-bg">
									<span class="checkbox-body"></span>
								</span>
								<span>{{item.value}}</span>
							</label>
						</li>
						
					</ul>
				
				</template>
			</div>
		</div>
	`,
	methods:{
		choose(event){
			const _ = this;
			if( (event.target.tagName != 'BUTTON') && (event.target.tagName != 'LI') && (event.target.tagName != 'UL') ){
				_.opened = !_.opened;
			}
		},
		close(){
			const _ = this;
			if(!_.multiple) {
				_.opened = false;
			}
		},
		simpleSelect(value,index){
			const _ = this;
			_._value = value;
			_.selectedId = index;
			_.$emit('select-change',{id:index,value:value});
		},
		pushToSelected(id){
			const _ = this;
			if(_.selected.indexOf(id) > -1){
				_.selected.splice(_.selected.indexOf(id),1);
			}else{
				_.selected.push(id);
			}
		},
		select(id,value){
			const _ = this;
			_._value = id;
			_.selectedId = id;
			if(_.multiple){
				_.pushToSelected(id)
				_.$emit('select-change',_.selected);
			}else{
				_.$emit('select-change',{id:id,value:value});
			}
		},
		selectAll(){
			const _ = this;
			for(let item in _.items){
				_.pushToSelected(_.items[item]['id']);
			}
			_.$emit('select-change',_.selected);
		},
		clearAll(){
			const _ = this;
			_.selected = [];
		}
	},
	created(){
		const _ = this;
		if(_.defaultItem){
			_.selectedId = parseInt(_.defaultItem['id']);
		}
	},
	computed:{
		text(){
			const _ = this;
			if(_.multiple){
				return _.title;
			}
			let selectedItem = _.items.find(item => item.id == _.selectedId);
			if(selectedItem){
				return selectedItem['value'];
			}
			return _._text;
		},
		defaultItem(){
			const _ = this;
			return _.items.find(item => item.selected && item.selected ==true);
		}
	}
});