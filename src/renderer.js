// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { remote } = require('electron')
var fs = require('fs')

var rigthTemplate = [
    {
        label: 'EZ2markdown',      // turndown, to-markdown
        accelerator: `ctrl+1`,
        click: () => {
            // on_my_save_md()
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
