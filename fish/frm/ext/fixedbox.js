!function(){
	"use strict";
	
	/**
	 * 浮动盒子组件
	 */
	var fixed_list = [];
	
	$.widget('ui.fixedbox',{
		options:{
			placement: 'top',//备用参数，放置的相对位置
			trigger:'click',//触发方式，可配置为hover或click
			width: 'auto',//宽度参数，默认自动，可手动调整，目前没有效果
			content: "浮动盒子内容",//内容，接受HTML字符串或jquery对象
			template: '<div class="fixedBox" role="fixedBox"></div>',
			show:$.noop,//浮动盒子展示时的回调函数
			hide:$.noop,//浮动盒子隐藏时的回调函数
			init:$.noop
		},
		_init:function(){
			var that = this;
			this.element.attr("ui-fixedbox",fixed_list.length+1);
			this.$fixedbox = $(this.options.template);
			
			var content_exists = false;
			_.each(fixed_list,function(item){
				//查找缓存，查看是否内容有重复的（指向同一个对象
				if(item.content == that.options.content
						|| (that.options.content instanceof jQuery 
								&& item.selector == that.options.content.selector 
								&& item.prevObject[0].isEqualNode(that.options.content.prevObject[0]))){
					content_exists = true;
					that.$fixedbox = item.$fixedbox;
					return false;
				}
			});
			var o = {$fixedbox:this.$fixedbox,content:this.options.content};
			if(this.options.content instanceof jQuery){
				o.selector = this.options.content.selector;
				o.prevObject = this.options.content.prevObject;
			}
			fixed_list.push(o);
			
			if(!content_exists){
				//内容不重复的话就新增对象
				if(!(this.options.content instanceof jQuery)){
					this.$fixedbox.html(this.options.content);
				}else{
					this.options.content.show().appendTo(this.$fixedbox);
				}
				$("body").append(this.$fixedbox);
			}
			this.$fixedbox.hide();
			
			if(this.options.width != 'auto'){
				this.$fixedbox.width(this.options.width);
			}
			
//			if(this.options.height != 'auto'){
//				this.$fixedbox.outerHeight(this.options.height);
//			}
			
			this.options.init.call(this.$fixedbox);
			
			if(this.options.trigger == "click"){
				
				this._on($(document), {
	              'click': 'hide'
	            });
				
				this._on({
	               'click': 'show'
	            });
			}
			
			if(this.options.trigger == "hover"){
				this._on({
	               'mouseenter': 'show',
	               'mouseleave': 'leave'
	            });
				
				this._on(this.$fixedbox,{
	               'mouseenter': 'show',
	               'mouseleave': 'leave'
	            });
			}
		},
		_resize:function(){
			//修正弹出框位置
			this.$fixedbox.css("left",this.element.offset().left);
			var dx = this.element.offset().left + this.$fixedbox.outerWidth() - document.body.clientWidth;
			if(dx > 0){
				this.$fixedbox.css("left",this.element.offset().left - dx);
			}
			
			var dy = this.element.offset().top+this.element.outerHeight();//-$(window).scrollTop();
			if(dy+this.$fixedbox.outerHeight() > $(window).height()+$(window).scrollTop()){
				dy -= this.$fixedbox.outerHeight() + this.element.outerHeight();
			}
			
			this.$fixedbox.css("top",dy);
			
			if($(".ui-dialog:visible").length > 0){
				this.$fixedbox.css("z-index","1060");
			}else{
				this.$fixedbox.css("z-index","");
			}
		},
		show:function(e){
			this._resize();
			this.$fixedbox.show();
			
			if(this.leaveTimeOut){
            	clearTimeout(this.leaveTimeOut);
            	this.leaveTimeOut = null;
            }
			//this.options.show.call(this.$fixedbox);
		},
		hide:function(e){
			if(!this.$fixedbox.is(":visible")){
				return;
			}
			
			if(e){
				var element = this.element[0];
				
				//如果是列表调用  $(".change").fixedbox();
				
				if($(e.target).attr("ui-fixedbox") && element.className === e.target.className){
					return;
				}
				
	            // Clicking target
	            if (e.target === element || element.contains(e.target)
	            		|| e.target === this.$fixedbox[0] || this.$fixedbox[0].contains(e.target)
	            		|| element.contains(e.target.ownerDocument.activeElement) 
	            		|| this.$fixedbox[0].contains(e.target.ownerDocument.activeElement)) {
	                return;
	            }
			}
			this.$fixedbox.hide();
			this.options.hide.call(this.$fixedbox);
		},
		leave:function(){
			var ts = this;
			if(!this.leaveTimeOut){
				this.leaveTimeOut = setTimeout(function(){
					ts.$fixedbox.hide();
					ts.options.hide();
				});
			}
		},
		_destroy:function(){
			this.$fixedbox.remove();
		}
	});
}();