// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { remote } = require('electron')
var fs = require('fs')

let blog_view = null

/**
 * 点击按钮事件：打开网址
 *
 */
function on_my_load_url() {
    // 获取标签URL
    var my_url = document.querySelector('#my_url')
    var url = my_url.value
    console.log(url)

    // 使用blog_view打开网页
    blog_view.loadURL(url)
}

/**
 * 点击按钮事件：保存网址
 *
 */
function on_my_load_url() {
    // 获取设置的网页URL
    var my_url = document.querySelector('#my_url')
    var url = my_url.value
    console.log(url)

    // 使用blog_view打开网页
    blog_view.loadURL(url)
}


/**
 * 保存markdown文件
 *
 * @param {*} pth 保存路径
 * @param {*} title 保存标题
 * @param {*} md_data 保存内容
 */
function write_md(pth, title, md_data) {
    fs.mkdir(pth + title, (err, data) => {
        fs.writeFile(pth + title + '/README.md', md_data, (err, data) => {
            // alert('err: ' + err + '\n, data: ' + data)
        })
    })
}

/**
 * 获取markdown：csdn
 *
 */
function get_markdown_csdn() {
    var blog_save_path = document.querySelector('#my_blog_save_path').value
    if (blog_view == null || blog_save_path == null) {
        alert('blog_view == null || blog_save_path == null')
        return
    }

    // 获取文章标题
    blog_view.executeJavaScript("document.querySelector('#mainBox > main > div.blog-content-box > div > div > div.article-title-box > h1').innerHTML").then((title) => {
        // 获取文章内容
        blog_view.executeJavaScript("document.querySelector('#content_views').innerHTML").then((html_data) => {
            // 将文章内容转为markdown
            var tds = new require('turndown')();
            var md_data = tds.turndown(html_data);

            // 将文章内容保存到本地
            write_md(blog_save_path, title, md_data)
        })
    })
}


/**
 * 页面加载完成，执行初始化任务
 *      绑定按钮点击事件、获取全局对象blog_view
 */
window.onload = function () {
    blog_view = document.querySelector('#my_blog_view')
    document.querySelector('#my_btn_load_url').onclick = on_my_load_url
    document.querySelector('#my_btn_save_md').onclick = on_my_save_md

    // 打开DevTools
    // blog_view.openDevTools()
}

var rigthTemplate = [
    {
        label: 'EZ2markdown',      // turndown, to-markdown
        accelerator: `ctrl+1`,
        click: () => {
            on_my_save_md()
        }
    },
    { type: 'separator' },
    {
        label: '后退',
        onclick: () => {
            blog_view.goBack()
        }
    },
    {
        label: '前进',
        onclick: () => {
            blog_view.goForward()
        }
    }
]

const m = remote.Menu.buildFromTemplate(rigthTemplate)

window.addEventListener('contextmenu', function (e) {

    //阻止当前窗口默认事件
    e.preventDefault();
    //把菜单模板添加到右键菜单
    m.popup({ window: remote.getCurrentWindow() })

})
