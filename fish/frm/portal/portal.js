define([
    "frm/portal/AppGlobal",
    "frm/portal/Utils",
    "frm/portal/RestAPIHelper"
], function ( appGlobal,CommonAction,utils, LoginInfo) {

	//将几个公共模块挂到fish对象上面
	var FishView = fish.View,
  		PortalDef = function () {
		this.appGlobal = appGlobal;
		this.promise = {};
	}

        //小写金额转大写
    fish.smallToBig = function(n){
        var fraction = ['角', '分'];    
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];    
        var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];    
        var head = n < 0? '欠': '';    
        n = Math.abs(n);    
      
        var s = '';    
      
        for (var i = 0; i < fraction.length; i++)     
        {    
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');    
        }    
        s = s || '整';    
        n = Math.floor(n);    
      
        for (var i = 0; i < unit[0].length && n > 0; i++)     
        {    
            var p = '';    
            for (var j = 0; j < unit[1].length && n > 0; j++)     
            {    
                p = digit[n % 10] + unit[1][j] + p;    
                n = Math.floor(n / 10);    
            }    
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;    
        }    
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');    
    }

	window.portal = new PortalDef();
    window.portal.utils = utils;

    //全局resize事件派发处理
    function newInit(){
        	var ts = this;
        	
        	this.on('afterRender',function(){
        		ts.resize();
        	});
        	this.listenTo(fish,'view-resize',function(){
        		if(ts.$el.is(":visible")){
        			ts.resize();
        		}
        	});
        	
        	if($.isFunction(this._initialize)){
        		this._initialize();
        	}
     };
    
    var _originExtend = fish.View.extend;
    fish.View.extend = function(obj){
    	if($.isFunction(obj.initialize) && obj.initialize != newInit){
    		obj._initialize = obj.initialize;
    		obj.initialize = newInit;
    	}
    	
    	return _originExtend.call(this,obj);
    };
     
    fish.View = fish.View.extend({
    	resize:$.noop,
    	initialize:newInit,
    });
    fish.onResize(function() {
    	fish.trigger("view-resize");
    });
    window.portal.localajax = true; //研发开关，如果为true,自己拼装json数据返回,方便前端研发调试不依赖服务，如果为false，去请求服务端数据


    $.extend(fish,CommonAction);

	fish.utils = utils;

});