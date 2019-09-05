var CommonData = define(function(){
	return {
					// 客户证件类型
			CERTI_TYPE : {
		        "1": "身份证",
		        "2": "军官证",
		        "3": "护照",
		        "4": "港澳居民来往内地通行证",
		        "5": "部队干部离休证",
		        "6": "工商执照",
		        "7": "单位证明（含公章）",
		        "8": "介绍信",
		        "9": "驾驶证",
		        "10": "学生证",
		        "11": "教师证",
		        "12": "户口簿",
		        "13": "老人证",
		        "14": "士兵证",
		        "15": "组织机构代码证",
		        "17": "工作证",
		        "18": "暂住证",
		        "22": "警官证",
		        "23": "ICP经营许可证",
		        "24": "回乡证",
		        "25": "社保卡",
		        "26": "残疾证",
		        "27": "事业单位编码",
		        "28": "市政府人才居住证",
		        "29": "中华人民共和国组织机构代码证",
		        "30": "房产证",
		        "31": "记者证",
		        "32": "医疗证",
		        "33": "居留证",
		        "34": "事业单位法人证书",
		        "35": "台湾身份证",
		        "36": "澳门身份证",
		        "37": "香港身份证",
		        "38": "虚拟证件",
		        "39": "税务登记号",
		        "40": "社团登记证",
		        "41": "其他",
		        "42": "台湾居民来往内地通行证",
		        "43": "代理商预开户",
		        "55": "军人居民身份证"
		    },

		    // 客户类型
		    CUST_TYPE : {
		        "1000": "政企客户",
		        "1100": "公众客户",
		        "1198": "个人客户",
		        "1199": "家庭客户",
		        "1200": "转售客户",
		        "9900": "其他客户"
		    },

		    // 客户星级
		    MEMBER_CLASS : {
		    		"3100": "一星",
		 	        "3200": "二星",
		 	        "3300": "三星",
		 	        "3400": "四星",
		 	        "3500": "五星",
		 	        "3600": "六星",
		 	        "3700": "七星",
		 	        "3800": "其他",
		 	        "":"其他"
		    },

		    PROD_TYPE : {
		    		"1": "停机保号",
		    		"12": "客户实名制停机",
		    		"13": "数据卡断网",
		    		"14": "时长停机",
		    		"15": "数据业务停机",
		    		"16": "未实名违规停机",
		    		"17": "涉嫌通信诈骗停机",
		    		"18": "一证超五卡不合规单停",
		    		"19": "一证超五卡不合规双停",
		    		"2": "申请停机",
		    		"3": "挂失",
		    		"4": "欠费停机",
		    		"5": "预拆机",
		    		"6": "未激活",
		    		"7": "欠费单停",
		    		"8": "欠费双停",
		    		"9": "iphone用户数据擦除",
		    		"":"正常"	
		    },
		    Rome_figures : {
		    		"3100": "Ⅰ",
		            "3200": "Ⅱ",
		            "3300": "Ⅲ",
		            "3400": "Ⅳ",
		            "3500": "Ⅴ",
		            "3600": "Ⅵ",
		            "3700": "Ⅶ"
		    },
		    Offer_Type : {
		    		"1100": "失效",
		            "1000": "正常"
		    },
		    //客户等级
		    SERVICE_LEVEL : {
		    		"1000": "砖石",
		            "1100": "金",
		            "1200": "银",
		            "1300": "普通",
		            "2000": "A1",
		            "2100": "A2",
		            "2200": "A3",
		            "2300": "A4",
		            "2400": "A5",
		            "3000": "B1",
		            "3100": "B2",
		            "3200": "B3",
		            "3300": "B4",
		            "3400": "B5"
		},

		//订单状态
		ORDER_STATUS:{
		"1": "停机保号",
		"12": "客户实名制停机",
		"13": "数据卡断网",
		"14": "时长停机",
		"15": "数据业务停机",
		"16": "未实名违规停机",
		"17": "涉嫌通信诈骗停机",
		"18": "一证超五卡不合规单停",
		"19": "一证超五卡不合规双停",
		"2": "申请停机",
		"3": "挂失",
		"4": "欠费停机",
		"5": "预拆机",
		"6": "未激活",
		"7": "欠费单停",
		"8": "欠费双停",
		"9": "iphone用户数据擦除",
		"":"正常"	
		},
		//订单确认使用的订单类型
		SERVICE_OFFER_TYPE : {
		    "2551": "改功能产品",
		    "2833": "预拆机复通",
		    "2823": "用户申请停机",
		    "2822": "用户申请复机",
		    "2953": "补卡",
		    "2830": "停机保号",
		    "2829": "暂拆复装",
		    "2819": "挂失",
		    "2818": "解挂",
		    "2832": "预拆机",
		    "2831": "拆机",
		    "1": "可选包订购",
		    "2567": "可选包订购",
		    "5":"改套餐",
		    "2549":"过户",
		    "2957":"改使用者",
		    "8":"4G新装",
		    "2571":"改账务关系"
		},
        //SIM卡状态
        STATE_TYPE :{
            "1000": "可用",
            "1001": "在库",
            "1002": "已制券",
            "1003": "已发放",
            "1004": "已打印",
            "1100": "不可用",
            "1101": "临占",
            "1102": "预占",
            "1103": "预选",
            "1104": "长期占用",
            "1105": "待回收",
            "1106": "废弃",
            "1107": "损坏",
            "1108": "已使用",
            "1109": "已兑换",
            "1110": "已作废",
            "1111": "待维修",
            "1112": "待返厂",
            "1113": "省份已使用",
            "1200": "终端状态类",
            "1201": "已入库未领用",
            "1202": "已领用可销售",
            "1203": "已销售未补贴",
            "1204": "已销售已补贴",
            "1205": "退换货已冻结",
            "1206": "开箱损已冻结",
            "1207": "沉默",
            "1208": "超期库存",
            "1209": "省份已销售",
            "1210": "终端调拨中",
            "1211": "终端已调拨"
        }
	};
})