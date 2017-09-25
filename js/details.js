require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"cookie":"jquery.cookie"
	}
})
require(['jquery','cookie'],function($,cookie){
	$(function(){
		loadCart();
		if($.cookie("goodnum") == 1){
			//JSON 获取第一件商品的所有信息 
			$.getJSON("../json/goods.json",function(data){
				$('<img src="'+ data.item1.src[0] + '"/>').appendTo($(".mc-left-middle"));
				$('<img src="'+ data.item1.src[0] + '"/>').appendTo($(".mc-left-large"));
				for(let i = 0;i < data.item1.src.length;i ++ ){
					//根据src小图数量生成小轮播图
					$('<li><img src="'+ data.item1.src[i] +'"/></li>').appendTo( $(".mc-left-ul") );
					//设置品牌 价格 name 颜色 等
					$(".mc-right-brand>h1").html(data.item1.brand);
					$(".mc-right-name>span").html(data.item1.name);
					$(".mc-right-price>h3").html(data.item1.price);
					$(".mc-click-add").attr("id","item1");
					$(".mc-right-color span:eq(1)").css("background-color",data.item1.color);
					$(".mc-left-ul li").eq(i).mouseover(function(){
						$(this).css({
							borderColor : "#ccc"
						})
						$(".mc-left-middle").find("img").attr("src",data.item1.src[i]);
						$(".mc-left-large").find("img").attr("src",data.item1.src[i]);
					})
					$(".mc-left-ul li").eq(i).mouseleave(function(){
						$(this).css({
							borderColor : "#fff"
						})
					})
				}
				$(".mc-click-add").attr("data-item-id","item1");
			})
		}
		if($.cookie("goodnum") == 2){
//			JSON获取第二件商品的所有信息
			$.getJSON("../json/goods.json",function(data){
				$('<img src="'+ data.item2.src[0] + '"/>').appendTo($(".mc-left-middle"));
				$('<img src="'+ data.item2.src[0] + '"/>').appendTo($(".mc-left-large"));
				for(let i = 0;i < data.item2.src.length;i ++ ){
					//根据src小图数量生成小轮播图
					$('<li><img src="'+ data.item2.src[i] +'"/></li>').appendTo( $(".mc-left-ul") );
					//设置品牌 价格 name 颜色 等
					$(".mc-right-brand>h1").html(data.item2.brand);
					$(".mc-right-name>span").html(data.item2.name);
					$(".mc-right-price>h3").html(data.item2.price);
	   				$(".mc-click-add").attr("id","item2");
					$(".mc-right-color span:eq(1)").css("background-color",data.item2.color);
					$(".mc-left-ul li").eq(i).mouseover(function(){
						$(this).css({
							borderColor : "#ccc"
						})
						$(".mc-left-middle").find("img").attr("src",data.item2.src[i]);
						$(".mc-left-large").find("img").attr("src",data.item2.src[i]);
					})
					$(".mc-left-ul li").eq(i).mouseleave(function(){
						$(this).css({
							borderColor : "#fff"
						})
					})
				}
				$(".mc-click-add").attr("data-item-id","item2");
			})
		}
		//加入购物袋
		$(".mc-click-add").click(function(){
			var goodId = $(this).attr("data-item-id");
			var goodSrc = $(".mc-left-ul li").eq(0).find("img").attr("src");
			var goodBrand = $(this).parent().siblings("div").eq(0).find("h1").html();
			var goodName = $(this).parent().siblings("div").eq(1).find("span").html();
			var goodPrice = $(this).parent().siblings("div").eq(2).find("h3").html();
//			var goodColor = $(".mc-right-color span").eq(1).css("backgroundColor");
			var goodColor = "混搭色";
//			console.log(goodSrc,goodId,goodBrand,goodName,goodPrice,goodColor)
			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var cartObj = convertCartStrToObj(cartStr);
			if(goodId in cartObj){
				//如果已存在，那么该商品的数量加1
				cartObj[goodId].num += 1;
				//改变购物袋的值
				$(".mc-bag").html("购物袋(" + cartObj[goodId].num + ")");
			}else{
				//如果不存在，那么将新商品的信息存入
				cartObj[goodId] = {
					name : goodName,
					brand : goodBrand,
					price : goodPrice,
					src : goodSrc,
					color : goodColor,
					num : 1
				};
				
			}
			//将新的购物车信息存回cookie
			//将对象转为字符串
			cartStr = convertObjToCartStr(cartObj);
			//存入cookie		document.cookie = "key=value"
			$.cookie("cart",cartStr,{expires : 7,path:"/"});
			loadCart();
		})
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
		//跳转到购物车页
		$(".mc-shop").click(function(){
			location.href = "../html/mc-shopcar.html";
		})
		
		//放大镜效果
		$(".mc-left-middle").mouseover(function(e){
			$(".mc-left-fliter").css("display","block");
			$(".mc-left-large").css("display","block");
			$(document).mousemove(function(e){
				//边界处理
				var l = e.clientX - $(".mc-left-middle").offset().left - 93;
				var t = e.clientY - $(".mc-left-middle").offset().top+ 110;
				l = l < 0 ? 0 : (l > $(".mc-left-middle").width() - $(".mc-left-fliter").width() ?  $(".mc-left-middle").width() - $(".mc-left-fliter").width() : e.clientX - $(".mc-left-middle").offset().left - 93 );
				t = t < 0 ? 0 : (t > $(".mc-left-middle").height() - $(".mc-left-fliter").height() ?  $(".mc-left-middle").height() - $(".mc-left-fliter").height() : e.clientY - $(".mc-left-middle").offset().top + 110 );
				$(".mc-left-fliter").css({
					left : l,
					top : t
				})
				$(".mc-left-large img").css({
					left : - l * 2 ,
					top : - t * 2
				})
			})
		})
		//放大镜移除
		$(".mc-left-middle").mouseleave(function(){
			$(".mc-left-fliter").css("display","none");
			$(".mc-left-large").css("display","none");
		})
	})
})