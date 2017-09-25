require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"cookie":"jquery.cookie"
	}
})
require(['jquery','cookie'],function($,cookie){
	//在购物车页首先获取cookie 取出在cookie中存的购物车信息  用于显示商品内容
		loadCart();
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		if(!cartStr){
			$(".mc-changecar").css("display","none")
		}else{
			var cartObj = convertCartStrToObj(cartStr);
			for(var id in cartObj){
				var good = cartObj[id];
				var appendStr = 
					'<div class="mc-shopcar-middle" data-item-id = "'+ id +'">'+
						'<div class="mc-mid-select"><input type="checkbox" checked="checked"/></div>'+
						'<div class="mc-mid-img"><img src="'+ good.src+'"/></div>'+
						'<div class="mc-mid-info">'+
							'<p class="mc-info-brand">' + good.brand + '</p>'+
							'<p class="mc-info-name">'+ good.name +'</p>'+
							'<p class="mc-info-color">'+ good.color +'</p>'+
						'</div>'+
						'<div class="mc-mid-price">￥'+ good.price +'.00</div>'+
						'<div class="mc-mid-num">'+
							'<button class="mc-shopnumabs">-</button>'+
							'<input type="text" value="' + good.num + '"/>'+
							'<button class="mc-shopnumadd">+</button>'+
						'</div>'+
						'<div class="mc-mid-add">￥'+ good.price * good.num +'.00</div>'+
						'<div class="mc-mid-dele">'+
							'<p>加入收藏</p>'+
							'<p class="mc-dele">删除</p>'+
						'</div>'+
					'</div>';
				$(appendStr).appendTo($(".mc-changecar"));
			}
		}
		//删除事件
		$(".mc-dele").click(function(){
			//删除元素
			var id = $(this).parent().parent().remove().attr("data-item-id");
			console.log(id);
			//删除cookie
			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var cartObj = convertCartStrToObj(cartStr);
			delete cartObj[id];
			$.cookie('cart', convertObjToCartStr(cartObj), {
				expires: 7,
				path: "/"
			});
		})
		//输入框加加点击事件
		$(".mc-shopnumadd").click(function() {
			var id = $(this).parent().parent().attr("data-item-id");
			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var cartObj = convertCartStrToObj(cartStr);
			console.log(cartObj)
			cartObj[id].num += 1;
			//输入框的数字变化
			$(this).parent().find("input").val(cartObj[id].num );
			//更新页面上的小计
			$(this).parent().parent().find("div").eq(5).html("￥"+ cartObj[id].num * cartObj[id].price + ".00");
			//将信息放回cookie
			$.cookie('cart', convertObjToCartStr(cartObj), {
				expires: 7,
				path: "/"
			});
			//将购物袋上显示的数量加1
			loadCart();
		});
		//输入框减减点击事件
		$(".mc-shopnumabs").click(function() {
			var id = $(this).parent().parent().attr("data-item-id");
			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var cartObj = convertCartStrToObj(cartStr);
			cartObj[id].num -= 1;
			if(cartObj[id].num <= 1){
				cartObj[id].num = 1;
			}
			//输入框的数字变化
			$(this).parent().find("input").val(cartObj[id].num );
			//更新页面上的小计
			$(this).parent().parent().find("div").eq(5).html("￥" + cartObj[id].num * cartObj[id].price + ".00");
			//将信息放回cookie
			$.cookie('cart', convertObjToCartStr(cartObj), {
				expires: 7,
				path: "/"
			});
			//将购物袋上显示的数量加1
			loadCart();
		});
		//将字符串转化为对象的函数
		function convertCartStrToObj(cartStr){
				//"sp1,香蕉,30,1,src1:sp2,苹果,40,2,src2:sp3,梨,50,3,str3"
				//如果是空字符串，即没有购物车信息，那么购物车为空，直接返回一个空对象
				if(!cartStr){
					return {};
				}
				var goods = cartStr.split(":");
				var obj = {};
				for(var i = 0; i < goods.length; i ++){
					var data = goods[i].split(",");
					//以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
					obj[data[0]] = {
						name : data[1],
						price : parseFloat(data[2]),
						num : parseInt(data[3]),
						src : data[4],
						brand : data[5],
						color : data[6]
					}
				}
				return obj;
			}
		//将对象转化为字符串的函数
		function convertObjToCartStr(obj){
			var cartStr = "";
			//遍历对象
			for(var id in obj){
				if(cartStr){
					cartStr += ":";
				}
				cartStr += id + "," + obj[id].name + "," + obj[id].price + "," + obj[id].num + "," + obj[id].src + "," + obj[id].brand + "," + obj[id].color;
			}
			return cartStr;
		}
		function loadCart(){
			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var cartObj = convertCartStrToObj(cartStr);
				//获取到购物车中所有商品的数量
			var total = 0;
			for(var id in cartObj){
				total += cartObj[id].num;
			}
			$(".mc-bag").html("购物袋(" + total + ")");
		}
});