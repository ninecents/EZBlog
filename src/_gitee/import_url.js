
let my_webview = null          //    web页面


window.addEventListener('DOMContentLoaded', () => {
// window.onload = () => {
    if(my_webview == null){
        my_webview = document.querySelector('#my_blog_view')
    }

    setInterval(() => {
        // my_webview.openDevTools()
        if(my_webview && my_webview.getURL() == 'https://gitee.com/login'){
            var script = "$('.login-password__account-input').val('kinghzking@qq.com');" + 
            "$('#user_password').val('修改为您的密码');" + 
            "$('#new_user > div.session-login__body > div > div > div:nth-child(4) > input').click()";
            my_webview.executeJavaScript(script)
        }
    }, 1*1000);
  })
  