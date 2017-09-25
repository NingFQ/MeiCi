require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"cookie":"jquery.cookie"
	}
})
require(['jquery','cookie'],function($,cookie){
	//阻止默认拖拽
	document.ondragstart = function(){
			return false;
	}
	//阻止文字被选中
	if(typeof document.onselectstart != "undefined"){
		document.onselectstart = function(){
			return false;
		}
	}else{//火狐的方法
		document.onmousedown = function(){
			return false;
		}
	}
	//JQuery方法
	$(function(){
		//先判断cookie 用户是否登录
		if($.cookie("users")){
			$(".mc-denglu").css("display","none");			
			$(".mc-zhuce").css("display","none");
			$(".mc-load").css("width","166");
			$("<span class='mc-showname'>你好！" + $.cookie("users")+"</span>" ).appendTo($(".mc-load"));
			$("<a class='mc-exit'>退出</a>").appendTo($(".mc-load"));
		}
		//点击退出之后的变化
		$(".mc-exit").click(function(){
			$(this).remove();
			$(".mc-showname").remove();
			$(".mc-denglu").css("display","block");			
			$(".mc-zhuce").css("display","block");
		})
		
		//二维码显示
		$(".mc-download").mouseover(function(){
			$(".mc-code").css({ display: "block" });
			$(".mc-code").animate({
				opacity : "1"
			},100)
			
		});
		$(".mc-download").mouseleave(function(){
			$(".mc-code").animate({
				opacity : "0"
			},100,function(){
				$(".mc-code").css({ display: "none" });
			});			
		})
		//购物单子显示
		$(".mc-shop").mouseover(function(){
			$(".mc-show").css("display","block");
			$(".mc-show").animate({
				opacity : "1"
			},100);
		});
		$(".mc-shop").mouseleave(function(){
			$(".mc-show").animate({
				opacity : "0"
			},100,function(){
				$(".mc-show").css("display","none");
			});
		})
		//商品列表 第一个 显示控制 新进单品
		$(".mc-slidedown1").hover(
			function(){
				$(".mc-nav-select1").css({display:"block"});
				$("#mc-shadow").css({display:"none"});
			},
			function(){
				$(".mc-nav-select1").css({display:"none"});
				$("#mc-shadow").css({display:"block"});				
			}		
		)
		//第二个
		$(".mc-slidedown2").hover(
			function(){
				$(".mc-nav-select2").css({display:"block"});
				$("#mc-shadow").css({display:"none"});
			},
			function(){
				$(".mc-nav-select2").css({display:"none"});
				$("#mc-shadow").css({display:"block"});				
			}		
		)
		//第三个
		$(".mc-slidedown3").hover(
			function(){
				$(".mc-nav-select3").css({display:"block"});
				$("#mc-shadow").css({display:"none"});
			},
			function(){
				$(".mc-nav-select3").css({display:"none"});
				$("#mc-shadow").css({display:"block"});				
			}		
		)
		//第四个
		$(".mc-slidedown4").hover(
			function(){
				$(".mc-nav-select4").css({display:"block"});
				$("#mc-shadow").css({display:"none"});
			},
			function(){
				$(".mc-nav-select4").css({display:"none"});
				$("#mc-shadow").css({display:"block"});				
			}		
		)
		//第五个
		$(".mc-slidedown5").hover(
			function(){
				$(".mc-nav-select5").css({display:"block"});
				$("#mc-shadow").css({display:"none"});
			},
			function(){
				$(".mc-nav-select5").css({display:"none"});
				$("#mc-shadow").css({display:"block"});				
			}		
		)
		//第六个
		$(".mc-slidedown6").hover(
			function(){
				$(".mc-nav-select6").css({display:"block"});
				$("#mc-shadow").css({display:"none"});
			},
			function(){
				$(".mc-nav-select6").css({display:"none"});
				$("#mc-shadow").css({display:"block"});				
			}		
		)
		//第七个
		$(".mc-slidedown7").hover(
			function(){
				$(".mc-nav-select7").css({display:"block"});
				$("#mc-shadow").css({display:"none"});
			},
			function(){
				$(".mc-nav-select7").css({display:"none"});
				$("#mc-shadow").css({display:"block"});				
			}		
		)		
		//轮播图
		var index = 0;
		var timer1 = null;
		var mcAllbanner = document.getElementById("mc-allbanner");				
		//aJax 获取轮播图 图片 并开始轮播	获取json文件 图片src
		$.getJSON("../json/index.json",function(data){
			//循环创建li标签
			for(let i = 0;i < data.banner.length;i ++){
				//将li添加到ul
				$("<li></li>").appendTo($("#mc-allbanner"));
				//设置每个li的宽高
				$("#mc-allbanner li").css({
					width:"1200px",
					height:"600px"
				})
			}
			//jQuery方法设置ul宽度
			$("#mc-allbanner").css({
				width:$("#mc-allbanner li").width() * data.banner.length
			})
			//原生方法设置ul宽度
			//var mcAllbanner = document.getElementById("mc-allbanner");		
			//mcAllbanner.style.width = mcAllbanner.childNodes[0].offsetWidth * data.length + 'px';
			//创建图片 添加到每个li里
			$("#mc-allbanner li").each(function(i){
				$(this).append($("<img/>").attr("src",data.banner[i]));
			})
		})
		//开启自动轮播
		autoPlay1();
		function autoPlay1(){
			timer1 = setInterval(function(){
				index ++;
				if(index >= $("#mc-allbanner").children("li").length){
					$("#mc-allbanner").css("left","0");
					index = 1;
				}
				$("#mc-allbanner").animate({
					left: -1200 * index
				},500)
			},3000)				
		}
		//左右点击按钮显示
		$("#mc-slideshow").mouseover(function(){
				clearInterval(timer1);
				$(".mc-leftBtn").css("display","block");
				$(".mc-rightBtn").css("display","block");
		});
		$("#mc-slideshow").mouseleave(function(){
			autoPlay1();
			$(".mc-leftBtn").css("display","none");
			$(".mc-rightBtn").css("display","none");
		})
		//右按钮点击
		var flag;//设置一个开关
		$(".mc-rightBtn").click(function(){
			//先清除轮播的定时器
			clearInterval(timer1);
			//如果flag ！= false 即可开始触发轮播图滚动
			if(flag != false){
				//修改控制变量
				flag = false;
				index ++;
				if(index >= $("#mc-allbanner").children("li").length){
//					$("#mc-allbanner").css("left","0");
					mcAllbanner.style.left = 0 + 'px';
					index = 1;
				}
				$("#mc-allbanner").animate({
					left: - $("#mc-allbanner li").width() * index
				},500,function(){
					//只有运动完成了才能改变控制变量 可以赋任何不是false的值(true见名知义)
					flag = true;
				})				
			}
		})
		//左按钮点击
		$(".mc-leftBtn").click(function(){
			clearInterval(timer1);
			if(flag != false){
				flag = false;
				index --;
				if(index < 0){
					mcAllbanner.style.left = - ($("#mc-allbanner").children("li").length - 1) * $("#mc-allbanner li").width() + 'px';
					index = $("#mc-allbanner").children("li").length - 2;
				}
				$("#mc-allbanner").animate({
					left: -$("#mc-allbanner li").width() * index
				},500,function(){
					flag = true;
				})	
			}
		})	
		//Ajax加载商品图片
		$.getJSON("../json/index.json",function(data){
			//第一个模块的商品信息
			var module1 = data.module1;
			$(".mc-mod1-left-top").append( $("<img/>").attr("src",module1[0]) );
			$(".mc-mod1-left-down").append( $("<img/>").attr("src",module1[1]) );
			$(".mc-mod1-middle").append( $("<img/>").attr("src",module1[2]) );
			$(".mc-mod1-right-top").append( $("<img/>").attr("src",module1[3]) );
			$(".mc-mod1-right-down").append( $("<img/>").attr("src",module1[4]) );
			//第二个模块的商品信息
			var module2 = data.module2;
			$(".mc-mod2-left-top").append( $("<img/>").attr("src",module2[0]) );
			$(".mc-mod2-left-down").append( $("<img/>").attr("src",module2[1]) );
			$(".mc-mod2-middle").append( $("<img/>").attr("src",module2[2]) );
			$(".mc-mod2-right-top").append( $("<img/>").attr("src",module2[3]) );
			$(".mc-mod2-right-down").append( $("<img/>").attr("src",module2[4]) );
			//第三个模块的商品信息
			var module3 = data.module3;
			$(".mc-mod3-left-top").append( $("<img/>").attr("src",module3[0]) );
			$(".mc-mod3-left-down").append( $("<img/>").attr("src",module3[1]) );
			$(".mc-mod3-middle").append( $("<img/>").attr("src",module3[2]) );
			$(".mc-mod3-right-top").append( $("<img/>").attr("src",module3[3]) );
			$(".mc-mod3-right-down").append( $("<img/>").attr("src",module3[4]) );
		})
		//轮播图
		$.getJSON("../json/index.json",function(data){
			//循环创建li 个数根据json数据
			for(var k = 0;k < data.goods.length;k ++){
				$("<li></li>").appendTo($(".mc-rollslideshow"));
			}
			//设置ul的宽度
			$(".mc-rollslideshow").css({
				width:($(".mc-rollslideshow li").width() + 40) * data.goods.length
			});
			$(".mc-rollslideshow li").each(function(i){
				$(this).append($("<img/>").attr("src",data.goods[i].src));
				$(this).append($("<p></p>").html( data.goods[i].brand ));
				$(this).append($("<p></p>").html(data.goods[i].descript));
				$(this).append($("<span></span>").html(data.goods[i].stage));
			})
		})
		//点击事件
		var count = 0;
		var timer2;
		var rollSlideShow = document.getElementsByClassName("mc-rollslideshow")[0];
		autoPlay2();
		//右点击
		$(".mc-nextBtn").click(function(){
			clearInterval(timer2);
			if(flag != false){
				flag = false;
				count ++;
				if(count >= $(".mc-rollslideshow").children("li").length - 6){
					rollSlideShow.style.left = 0 + 'px';
					count = 1;
				}
				$(".mc-rollslideshow").animate({
					left : -200 * count
				},500,function(){
					flag = true;
				})
			}
		})
		//左点击
		$(".mc-prevBtn").click(function(){
			clearInterval(timer2);
			if(flag != false){
				flag = false;
				count --;
				if(count <= 0){
					rollSlideShow.style.left = -200 * 20  + 'px';
					count = 19;
				}
				$(".mc-rollslideshow").animate({
					left : -200 * count
				},500,function(){
					flag = true;
				})
			}
		});
		$(".mc-rollshow").mouseover(function(){
			clearInterval(timer2);
		})
		$(".mc-rollshow").mouseleave(function(){
			autoPlay2();
		})
		//自动轮播
		function autoPlay2(){
			timer2 = setInterval(function(){
				count ++;
				if(count >= $(".mc-rollslideshow").children("li").length - 6){
					rollSlideShow.style.left = 0 + 'px';
					count = 1;
				}
				$(".mc-rollslideshow").animate({
					left : -200 * count
				},500)			
			},3000)
		}
	})
})
