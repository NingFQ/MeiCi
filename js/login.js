require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"cookie":"jquery.cookie"
	}
})
require(['jquery','cookie'],function($,cookie){
	$(function(){
		//判断点击登录时的输入框不能为空
		$(".mc-logclick").click(function(){
			if( $("#mc-loguser").val() == '' || $("#mc-logpass").val() == '' ){
				$(".mc-loghint").html("  请输入账号或密码！")
			}else{
				$(".mc-loghint").html("");
			}
			if( $.cookie("users") != $("#mc-loguser").val() ){
				alert("该账户尚未注册，请前去注册。");	
				return;		
			}
			if( $.cookie("users") == $("#mc-loguser").val() && $.cookie("psw") == $("#mc-logpass").val() ){
				alert("亲爱的"+ $.cookie("users") + "登录成功，欢迎~");
				location.href = "../html/index.html";
			}else{
				alert("账号或密码不正确，请重新输入！");
			}
		})
		//账户名文本框和密码框获得焦点时提示文字消失
		$("#mc-loguser").focus(function(){
			$(".mc-loghint").html("");
		});
		$("#mc-logpass").focus(function(){
			$(".mc-loghint").html("");
		})
		
	})
});
