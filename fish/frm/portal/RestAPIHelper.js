define(function() {
	
    
	var callService = function (type, url, data, success, webroot,errorfunc){
		var option = {};
		if(fish.isObject(url)){//处理第一个参数是option的场景
			option = url;
			url = option.url;
			data = option.data;
			success = option.success;
			webroot = option.webroot;
		} else {
			if(fish.isFunction(data)){//第一个参数是url,第二个参数是回调函数,没有参数
				webroot = success;
				success = data;
				data = null;
			}
		}
		var url = (webroot ? webroot:"") + (fish.restPrefix ? fish.restPrefix + "/" :"") + url ;

		if(data){
			if(type !== "GET"){
				if(fish.isEmpty(data) ) {
					if(fish.isArray(data)){
						data = "[]";
					} else {
						data = "{}";
					}
				} else {
					data = JSON.stringify(data);
				}
			}
		} else {
			data = null;
		}

		var ajaxOption = {
			type : type,
			url : url,
			data: data,
			success : function(re){
				success && success(re);
			},
			showError :false,
			error : function(xhr, status, error) {
                $.unblockUI();//出现异常的话先释放遮罩
                if($.isFunction(errorfunc)){
                	errorfunc();
                }
				if (xhr.responseText) {
                    console.error(xhr.responseText);
                    try{
                        var errorObj = JSON.parse(xhr.responseText);
                        errorObj.title = "错误：编码["+errorObj.code+"]";
                        if(errorObj.type==0){ //业务异常
        					fish.bsserror(errorObj,null,function(args){
        						console.log(args);
        						//调用接口汇报错误
        					});
                        } else { //系统异常
                            if (errorObj.code == "S-SYS-00027") { //Session过期
                                fish.confirm("登录会话超时，是否重新登录",function(){
                                    if (portal.appGlobal.get("currentStatus") != "sessionTimeOut") {
                                        portal.appGlobal.set("currentStatus", "sessionTimeOut");
                                    }
                                });
                            } else {
            					fish.bsserror(errorObj,null,function(args){
            						console.log(args);
            						//调用接口汇报错误
            					});
                            }
                        }
                    }catch(e){
                        console.error(e);
                        fish.error("解析HTTP返回的数据异常");
                    }

	            } else { // 请求异常
	            	console.error(xhr.responseText);
	            	fish.error({
	                    title: 'Ajax ' + status,
	                    message: url + ' ' + error
	                });
	            }
            },
			//#72 先暂停跨域请求，IE8，IE9有问题
			// crossDomain : true,
			// xhrFields : {
			// 	withCredentials : true
			// },
			// cache : false
		}
		$.extend(true,ajaxOption,fish.omit(option, 'url', 'data'));

		if(type !== "GET") {
			ajaxOption.contentType  = 'application/json';
			ajaxOption.processData = false;
		}


		return fish.ajax(ajaxOption);
	};
	var callServiceNotasync = function (type, url, data, success, webroot,errorfunc){
		var option = {};
		if(fish.isObject(url)){//处理第一个参数是option的场景
			option = url;
			url = option.url;
			data = option.data;
			success = option.success;
			webroot = option.webroot;
		} else {
			if(fish.isFunction(data)){//第一个参数是url,第二个参数是回调函数,没有参数
				webroot = success;
				success = data;
				data = null;
			}
		}
		var url = (webroot ? webroot:"") + (fish.restPrefix ? fish.restPrefix + "/" :"") + url ;

		if(data){
			if(type !== "GET"){
				if(fish.isEmpty(data) ) {
					if(fish.isArray(data)){
						data = "[]";
					} else {
						data = "{}";
					}
				} else {
					data = JSON.stringify(data);
				}
			}
		} else {
			data = null;
		}

		var ajaxOption = {
			type : type,
			url : url,
			data: data,
			async: false,
			success : function(re){
				success && success(re);
			},
			showError :false,
			error : function(xhr, status, error) {
                $.unblockUI();//出现异常的话先释放遮罩
                if($.isFunction(errorfunc)){
                	errorfunc();
                }
				if (xhr.responseText) {
                    console.error(xhr.responseText);
                    try{
                        var errorObj = JSON.parse(xhr.responseText);
                        errorObj.title = "错误：编码["+errorObj.code+"]";
                        if(errorObj.type==0){ //业务异常
        					fish.bsserror(errorObj,null,function(args){
        						console.log(args);
        						//调用接口汇报错误
        					});
                        } else { //系统异常
                            if (errorObj.code == "S-SYS-00027") { //Session过期
                                fish.confirm("登录会话超时，是否重新登录",function(){
                                    if (portal.appGlobal.get("currentStatus") != "sessionTimeOut") {
                                        portal.appGlobal.set("currentStatus", "sessionTimeOut");
                                    }
                                });
                            } else {
            					fish.bsserror(errorObj,null,function(args){
            						console.log(args);
            						//调用接口汇报错误
            					});
                            }
                        }
                    }catch(e){
                        console.error(e);
                        fish.error("解析HTTP返回的数据异常");
                    }

	            } else { // 请求异常
	            	console.error(xhr.responseText);
	            	fish.error({
	                    title: 'Ajax ' + status,
	                    message: url + ' ' + error
	                });
	            }
            },
			//#72 先暂停跨域请求，IE8，IE9有问题
			// crossDomain : true,
			// xhrFields : {
			// 	withCredentials : true
			// },
			// cache : false
		}
		$.extend(true,ajaxOption,fish.omit(option, 'url', 'data'));

		if(type !== "GET") {
			ajaxOption.contentType  = 'application/json';
			ajaxOption.processData = false;
		}


		return fish.ajax(ajaxOption);
	};
	/**
	 * GET /collection：返回资源对象的列表（数组）
	 * GET /collection/{id}：返回单个资源对象
	 * POST /collection：返回新生成的资源对象
	 * PUT /collection： 修改完整的资源对象
	 * PATCH /collection/{id}：修改资源对象的部分属性
	 * DELETE /collection/{id}：删除资源对象
	 **/


	fish.get = function(url, data, success, webroot) {
		return callService("GET",url, data, success, webroot);
	};

	fish.post = function(url, data, success, webroot) {
		return callService("POST",url, data, success, webroot);
	};

	fish.put = function(url, data, success, webroot) {
		return callService("PUT",url, data, success, webroot);
	};

	fish.patch = function(url, data, success, webroot) {
		return callService("PATCH",url, data, success, webroot);
	};

	fish.remove = function(url, data, success, webroot) {
		return callService("DELETE",url, data, success, webroot);
	};
	
	fish.callService = function(controller, method, data,success,error) {
		var url = controller+"/"+method+".do"
		var staffcode_param = ["staff_code","Staff_code","STAFF_CODE","staff_codes","staff_code_local"];
		//小前台原本staff_code入参统一封装
		var param = {};
		_.each(staffcode_param,function(key){
			param[key] = fish.loginInfo.staff_code || "";
		});
		_.extend(param,data);
		return callService("POST",url, param, success,null,error);
	};
	fish.callServiceNotasync = function(controller, method, data,success,error) {
		var url = controller+"/"+method+".do"
		var staffcode_param = ["staff_code","Staff_code","STAFF_CODE","staff_codes","staff_code_local"];
		//小前台原本staff_code入参统一封装
		var param = {};
		_.each(staffcode_param,function(key){
			param[key] = fish.loginInfo.staff_code || "";
		});
		_.extend(param,data);
		return callServiceNotasync("POST",url, param, success,null,error);
	};
});
