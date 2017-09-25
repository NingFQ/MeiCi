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
	//jquery方法
	$(function(){
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
//		//商品列表 第一个 显示控制 新进单品
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
		//点击title展开子项 改变符号
		$(".mc-sort-title").click(function(){
			$(".mc-sort-item").slideToggle(200,function(){
				if( $(".mc-sort-item").css("display") == "block"){
					$(".mc-sort-title span:eq(1)").html("-");
				}
				if( $(".mc-sort-item").css("display") == "none"){
					$(".mc-sort-title span:eq(1)").html("+");
				}
			});
		})
		$(".mc-sort-select>li:eq(0) a").click(function(){
			$(".mc-sort-select li:eq(0) div").slideToggle(300);
		})
		$(".mc-sort-select>li:eq(1) a").click(function(){
			$(".mc-sort-select li:eq(1) div").slideToggle(300);
		})
		$(".mc-sort-select>li:eq(2) a").click(function(){
			$(".mc-sort-select li:eq(2) div").slideToggle(300);
		})
		$(".mc-sort-select>li:eq(3) a").click(function(){
			$(".mc-sort-select li:eq(3) div").slideToggle(300);
		})
		//
		$(".mc-gender-title").click(function(){
			$(".mc-gender-item").slideToggle(200,function(){
				if( $(".mc-gender-item").css("display") == "block"){
					$(".mc-gender-title span:eq(1)").html("-");
				}
				if( $(".mc-gender-item").css("display") == "none"){
					$(".mc-gender-title span:eq(1)").html("+");
				}
			});
			$(".mc-gender-select li div").slideToggle(300);
		})
		$(".mc-gender-select li div p span").click(function(){
			if( $(this).css("background-position-x") == "-14px" ){
				$(this).css("background-position-x","0px");
				return;
			}
			if(parseInt($(this).css("background-position-x")) == 0){
				$(this).css("background-position-x","-14px");
				return;
			}			
		})
		//选择按钮
		$(".mc-sort-select li div p span:even").click(function(){
			if( $(this).css("background-position-x") == "-14px" ){
				$(this).css("background-position-x","0px");
				return;
			}
			if(parseInt($(this).css("background-position-x")) == 0){
				$(this).css("background-position-x","-14px");
				return;
			}			
		})
		//小三角行变换
		$(".mc-sort-select li a span").click(function(){
			console.log(2);
			if($(this).css("background-position-x") == "-14px" ){
				$(this).css("background-position-x","0px");
				return;
			}
			if($(this).css("background-position-x") == "0px"){
				$(this).css("background-position-x","-14px");
				return;
			}		
		})
		//Ajax获取图片
		$.getJSON("../json/productList.json",function(data){
			for(var i = 0;i < data.product.length;i ++){
				$('<li><div class="mc-items-img"><img src="'+ data.product[i].src +'"/></div><div class="mc-items-stage"></div><div class="mc-items-brand">'+ data.product[i].brand +'</div><div class="mc-items-name">'+ data.product[i].name +'</div><div class="mc-items-price">'+data.product[i].price+'</div></li>').appendTo($(".mc-morething-items"));
			}
			//点击li跳转
			$(".mc-morething-items li").eq(0).click(function(){
				$.cookie("goodnum","1");
				location.href = "../html/mc-details.html";
			})
			$(".mc-morething-items li").eq(1).click(function(){
				$.cookie("goodnum","2");
				location.href = "../html/mc-details.html";
			})
		})
		
		//滚动条事件
		window.onscroll = function(){
				var num = document.documentElement.scrollTop || document.body.scrollTop;
				var mcClassify = document.getElementsByClassName("mc-list-classify")[0];
				if(num >= 260){
					mcClassify.style.top = 0+ "px";
					mcClassify.style.marginTop = 10 + 'px';
					$(".mc-list-classify").css("position","fixed");
				}else{
					$(".mc-list-classify").css("position","relative");
					mcClassify.style.marginTop = 0 + 'px';
					
				}
		}
		//侧边栏 固定 滑过事件
		$("#mc-part5 ul li:eq(0)").mouseover(function(){
			$("#mc-part5 ul div").css("display","block");
			$("#mc-part5 ul li:eq(0)").css({
				backgroundColor: "#999",
			});
			$("#mc-part5 ul li:eq(0) a").css({
				backgroundPositionX : "-35px"
			})
			$("#mc-part5 ul div").animate({
				opacity : "1"
			},100)
		})
		$("#mc-part5 ul li:eq(0)").mouseleave(function(){
			$("#mc-part5 ul div").animate({
				opacity : "0"
			},100,function(){
				$("#mc-part5 ul div").css("display","none");
			})
			$("#mc-part5 ul li:eq(0)").css({
				backgroundColor: "#fff",
			});
			$("#mc-part5 ul li:eq(0) a").css({
				backgroundPositionX : "0px"
			})
		})
		//
		$("#mc-part5 ul li:eq(1)").mouseover(function(){
			$("#mc-part5 ul li:eq(1)").css({
				backgroundColor: "#999",
			});
			$("#mc-part5 ul li:eq(1) a").css({
				backgroundPositionX : "-35px"
			})
		})
		$("#mc-part5 ul li:eq(1)").mouseleave(function(){
			$("#mc-part5 ul li:eq(1)").css({
				backgroundColor: "#fff",
			});
			$("#mc-part5 ul li:eq(1) a").css({
				backgroundPositionX : "0px"
			})
		})
		//
		$("#mc-part5 ul li:eq(2)").mouseover(function(){
			$("#mc-part5 ul li:eq(2)").css({
				backgroundColor: "#999",
			});
			$("#mc-part5 ul li:eq(2) a").css({
				backgroundPositionX : "-35px"
			})
		})
		$("#mc-part5 ul li:eq(2)").mouseleave(function(){
			$("#mc-part5 ul li:eq(2)").css({
				backgroundColor: "#fff",
			});
			$("#mc-part5 ul li:eq(2) a").css({
				backgroundPositionX : "0px"
			})
		})
		$("#mc-part5 ul li:eq(3)").mouseover(function(){
			$("#mc-part5 ul li:eq(3)").css({
				backgroundColor: "#999",
			});
			$("#mc-part5 ul li:eq(3) a").css({
				backgroundPositionX : "-35px"
			})
		})
		$("#mc-part5 ul li:eq(3)").mouseleave(function(){
			$("#mc-part5 ul li:eq(3)").css({
				backgroundColor: "#fff",
			});
			$("#mc-part5 ul li:eq(3) a").css({
				backgroundPositionX : "0px"
			})
		})
		$("#mc-part5 ul li:eq(3)").click(function(){
			(document.documentElement.scrollTop = 0) || (document.body.scrollTop = 0);
		})
	})
})
