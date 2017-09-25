require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"cookie":"jquery.cookie"
	}
})
require(['jquery','cookie'],function($,cookie){
	$(function(){
		var a = false;
		var b = true;
		var c = false;
		var d = false;
		//输入手机号文本框获得焦点时 提示内容清空
		$('.mc-register-phone input').focus(function(){
			$('.mc-register-hint').html('');
		})
		//手机号输入框正则判断 必须是11位手机号  a = true
		var reg1 = /^\d{11}$/;
		$('.mc-register-phone input').blur(function(){
			if( reg1.test( $('.mc-register-phone input').val() ) == true){
				a = true;
			}else{
				$('.mc-register-hint').html('请输入正确的手机号码');
			}
		})
		//手机号输入框失去焦点 判断此手机号是否已经存在
		$('.mc-register-phone input').blur(function(){
			var str = $('.mc-register-phone input').val();
			if( $.cookie("users") == str ){
				$('.mc-register-hint').html("已经被注册过了");
				b = false;
			}
		})
		//验证码输入框获得焦点时 判断是否输入了手机号
		$('.mc-register-authcode input').focus(function(){
			if($('.mc-register-phone input').val() == '' ){
				$('.mc-register-hint').html('请先输入手机号码');
			}
		})
		//输入密码时 正则验证  不能有汉字
		var reg2 = /^\w{6,20}$/;
		$('.mc-register-password1 input').blur(function(){
			if( reg2.test( $('.mc-register-password1 input').val() ) == true){
				c = true;
			}else{
				$('.mc-register-hint').html('密码不符合规范！');
			}
		})
		//点击输入密码时 清空提示内容
		$('.mc-register-password1 input').focus(function(){
			$('.mc-register-hint').html('');
			if($('.mc-register-phone input').val() == '' ){
				$('.mc-register-hint').html('请输入手机号码');
			}
		})
		//再次输入密码获得焦点时判断是否输入了第一次密码
		$('.mc-register-password2 input').focus(function(){
			if($('.mc-register-password1 input').val() == '' ){
				$('.mc-register-hint').html('请先设置密码');
			}
		})
		//再次输入密码时 失去焦点时判断 是否输入一致
		$('.mc-register-password2 input').blur(function(){
			if( $('.mc-register-password1 input').val() != $('.mc-register-password2 input').val() ){
				$('.mc-register-hint').html("两次输入密码不一致！");
			}
			if( $('.mc-register-password1 input').val() == $('.mc-register-password2 input').val() ){
				$('.mc-register-hint').html("");
				d = true;
				if($('.mc-register-phone input').val() == '' ){
					$('.mc-register-hint').html('请输入手机号码');
				}
			}
		})
		//点击注册按钮时 判断是否全部填写完毕
		$(".mc-register-click").click(function(){
			if($('.mc-register-phone input').val() == '' ){
				$('.mc-register-hint').html('请先输入手机号');
			}
		})
		//如果全部项目填写完毕 则注册成功 生成cookie
		$(".mc-register-click").click(function(){
			if(a && b && c && d ){
				//生成cookie
				$.cookie("users",$('.mc-register-phone input').val(),{expirse : 7,path:"/"} );
				$.cookie("psw",$('.mc-register-password1 input').val(),{expirse : 7,path:"/"} );
				alert("尊敬的"+ $.cookie("users") +"恭喜你注册成功！请牢记账号密码！");
				location.href = "../html/index.html";
			}else{
				alert("请仔细查看每一项！请再次填写！")
			}
		})
	})
})