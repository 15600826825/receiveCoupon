var codeCount = 60;
var codeText = '';
var timer;
$(".coupon-toast-operation").click(function(){
    $('.coupon-toast-operation').hide();
})

$(".getCode-operation").click(function(){
    if($(".phone-operation").val().length){
        var re = /^1[3,4,5,7,8]\d{9}$/; 
        if(re.test($(".phone-operation").val())){
            if(codeCount == 60){
                $.ajax({
                    type:"get",
                    url:"https://study.sporit.cn/school/sms/get/"+$(".phone-operation").val(),
                    success:function(data){ 
                        if(data.code==0){
                            $('.coupon-message-operation').show();
                            setTimeout(function(){
                                $('.coupon-message-operation').hide();                        
                            },3000)
    
                            codeText = codeCount-- + '秒后重新获取';
                            $(".getCode-operation").text(codeText);
              
                            timer = window.setInterval( () => {
                              if ( codeCount > 0 ) {
                               codeText = codeCount-- + '秒后重新获取';
                               $(".getCode-operation").text(codeText);
                              }
                              else {
                                window.clearInterval( timer );
                                codeText =  '重新获取验证码';
                                codeCount = 60;
                                $(".getCode-operation").text(codeText);
                              }
                            }, 1000)
                        }                 
                    }
                });
            }          
            // 验证码已发送至您的手机，请注意查收      
        }else{        
            $('.coupon-toast-operation').show();
            $('.coupon-toast-text-tip').text('电话号码格式不正确')
        }
    }
    else{
        $('.coupon-toast-operation').show();
        $('.coupon-toast-text-tip').text('电话号码不能为空')
    }
})

$(".submit-operation").click(function(){ 
    if($(".phone-operation").val().length){
        if($(".code-operation").val().length){
            $.ajax({
                url:"https://study.sporit.cn/school/usercoupon/get",
                data:{
                    phone: $(".phone-operation").val(),
                    couponId: getUrlParam('id'),
                    smsCode: $(".code-operation").val()
                },
                success:function(data){
                    if(data.code == 0){
                        $('.coupon-toast-operation').show();
                        $('.coupon-toast-text-tip').text('优惠券领取成功')   
                        $(".phone-operation").val('');
                        $(".code-operation").val('');  
                        window.clearInterval( timer );
                        codeText = '获取验证码';
                        codeCount = 60;
                        $(".getCode-operation").text('获取验证码');
                    }
                    else{
                        $('.coupon-toast-operation').show();
                        $('.coupon-toast-text-tip').text(data.message);
                        window.clearInterval( timer );
                        codeText = '获取验证码';
                        codeCount = 60;
                        $(".getCode-operation").text('获取验证码');
                    }
                }
            });
        }
        else{
            $('.coupon-toast-operation').show();
            $('.coupon-toast-text-tip').text('验证码不能为空')
        }
    }
    else{
        $('.coupon-toast-operation').show();
        $('.coupon-toast-text-tip').text('电话号码不能为空') 
    }
    
})

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
