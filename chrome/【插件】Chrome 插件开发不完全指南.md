# 背景

最近团队在建设可视化埋点平台，我们需要使用 Chrome 插件的技术实现点选页面元素的功能，于是开始探索 Chrome 插件开发的相关技术。

另一方面，为了补全前端技能树，学习开发 Chrome 插件是其中一个非常重要的分支。

此文会总结常用 API 的用法，并且使用例子来帮助讲述如何帮助大家快速开始 Chrome 插件开发。

# 前言

## Chrome 插件是啥？

> 官网解释：
>
> [What are extensions](https://developer.chrome.com/docs/extensions/mv2/overview/)

Chrome 插件基于 Web 技术，只要懂 `JS/CSS/HTML` 即可开始开发。

Chrome 插件在单独的沙盒执行环境中运行，可以直接与 Chrome 浏览器进行交互，例如：修改网络请求、操作选项卡、读取 Cookies 等等。

通过使用 Chrome 插件技术定制用户需要的功能，包括但不限于：

- 提高生产力的工具
- 丰富网页的功能
- 信息/接口聚合
- 游戏开发

官网推荐的两个链接，关于初步认识 Chrome 插件：

- [插件 Demo](https://github.com/GoogleChrome/chrome-extensions-samples)
- [插件 API](https://developer.chrome.com/docs/extensions/reference/)

到 [开发与调试](#开发与调试) 部分将会介绍完整插件开发和调试的流程。

# 正文

## Chrome 插件的关键

> 官网链接：
>
> [Manifest file format](https://developer.chrome.com/docs/extensions/mv2/manifest/)

### manifest.json

`manifest.json` 文件是 Chrome 插件的关键，我们可以从文件中读取很多重要的信息，以下是 `Manifest V2` 的内容，包括但不限于。

```json
{
  // 必需字段
  "manifest_version": 3, //  指定 manifest 字段的 Version 2 或者 Version 3。
  "name": "My Extension",  // 插件名。
  "version": "versionString", // 插件的版本号。

  // 常用字段 
  // Manifest V3
  "action": {...},  // 工具栏图标，对应 API：chrome.action。
  // Manifest V2
  "browser_action": { … }, // 工具栏图标，对应 API：chrome.browserAction。
  "page_action": { … }, // 工具栏图标，对应 API：chrome.pageAction。
  "default_locale": "en", // 
  "description": "A plain text description", // 插件描述，在浏览器扩展页面（chrome://extensions/）能看到。
  "icons": {...}, // 插件管理页面、权限警告和 favicon，支持 128*128，48*48，16*16 的分辨率。

  // 可选字段
  "background": { // 使用 service_worker 的后台工作线程，可以在这里监听浏览器事件：导航到新页面、移除书签、关闭选项卡等。
    // Required
    "service_worker":
  },
  
  "content_scripts": [{...}], // 运行于网页上下文的脚本，可以在这里调用 DOM API，操作页面的变化等。
  
  "devtools_page": "devtools.html", // 可以为 chrome devtools 添加功能

  "event_rules": [{...}], // 配置一些规则，根据页面内容/行为采取不同行为

  "minimum_chrome_version": "versionString", // 支持最小的版本

  "optional_permissions": ["tabs"],
  "options_page": "options.html", // 可以提供一个选项页面，自定义插件的行为，打开的是一个新的页面
  "options_ui": { // 同 options_page，打开的是一个弹出式页面
    "chrome_style": true,
    "page": "options.html"
  },
    
  "permissions": ["tabs"], // 需要向浏览器申请的权限
  
  "update_url": "http://path/to/updateInfo.xml", // 插件自动更新策略

  "web_accessible_resources": [...] // 配置网络资源
}
```

## 主要字段介绍

### action、page_action、browser_action

> 官网链接：
>
> [action](https://developer.chrome.com/docs/extensions/reference/action/)
>
> [page_action](https://developer.chrome.com/docs/extensions/reference/pageAction/)
>
> [brower_action](https://developer.chrome.com/docs/extensions/reference/browserAction/)

配置工具栏处插件图标的属性：

- `default_icon` 图标图像
- `default_popup` 操作页面
- `default_title` 鼠标悬浮时的提示

```js
// Manifest V2
// manifest.json
{
  "browser_action": { … },
  "page_action": { … }
}
// background.js
chrome.browserAction.onClicked.addListener(tab => { … });
chrome.pageAction.onClicked.addListener(tab => { … });

// Manifest V3
// manifest.json
{
  "action": { … }
}
// background.js
chrome.action.onClicked.addListener(tab => { … });
```

通过对应的 `API`，动态设置/获取 `Icon`、`Title`、`Popup`，自定义触发 `Popup` 的展示和隐藏。

用法：`chrome.browserAction.*`

### background

> 官网链接：
>
> [background](https://developer.chrome.com/docs/extensions/mv2/background_pages/)

background 可以理解作为为插件的 后台（后台运行程序，或后台管理页面），是生命周期最长的运行程序。

配置 `persistent: false`，使后台可以在需要时被加载，空闲时被卸载。如第一次安装、插件更新、后台监听的事件被触发时、`content script` 向它发送消息、在 `Popup` 中调用 `runtime.getBackgroundPage`

可以通过 `chrome-extension://xxx/background.html `直接打开后台页，并且调试它的代码。

通过在 `manifest.json` 配置 `background` 字段，配置后台运行程序。

```json
// 直接配置 scripts
{  
  "background": {
    "scripts": ["background.js"], // 数组
    "persistent": false
  },
}

// 配置一个 page，通过 script 标签加载所需脚本：background.js
{  
  "background": {
      "page": "background.html"
    },
}
```

在后台程序中添加监听。

```js
chrome.runtime.onInstalled.addListener(function(){})
// This will run when a bookmark is created.
chrome.bookmarks.onCreated.addListener(function() {});
```

**所有的监听事件，请在同步代码中注册，如果在异步代码中写的注册将不会生效。**

```js
chrome.runtime.onInstalled.addListener(function() {
  // ERROR! Events must be registered synchronously from the start of
  // the page.
  chrome.bookmarks.onCreated.addListener(function() {
    // do something
  });
});
```

有些场景下，用户并不希望对所有的选项卡监听，所以插件允许用户过滤监听事件。

```js
chrome.webNavigation.onCompleted.addListener(function() {
    alert("This is my favorite website!");
}, {url: [{urlMatches : 'https://www.google.com/'}]});
```

通过监听 `onSuspend` 事件，防止后台程序卸载后，造成数据丢失，或者在卸载前做一些清理工作，如注销长连接的端口。

```js
chrome.runtime.onSuspend.addListener(function() {
  console.log("Unloading.");
  chrome.browserAction.setBadgeText({text: ""});
});
```

### content_scripts

> 官网链接：
>
> [content scripts](https://developer.chrome.com/docs/extensions/mv2/content_scripts/)

在当前页面上下文运行的脚本，可以直接操作 DOM 对象，而不会与页面脚本发生冲突。

content_scripts 可以直接调用的 Chrome API：

- [i18n](https://developer.chrome.com/docs/extensions/reference/i18n/)
- [storage](https://developer.chrome.com/docs/extensions/reference/storage/)
- [runtime:](https://developer.chrome.com/docs/extensions/reference/runtime/)
  - [connect](https://developer.chrome.com/docs/extensions/reference/runtime#method-connect)、[getManifest](https://developer.chrome.com/docs/extensions/reference/runtime#method-getManifest)、[getURL](https://developer.chrome.com/docs/extensions/reference/runtime#method-getURL)、[id](https://developer.chrome.com/docs/extensions/reference/runtime#property-id)、[onConnect](https://developer.chrome.com/docs/extensions/reference/runtime#event-onConnect)、[onMessage](https://developer.chrome.com/docs/extensions/reference/runtime#event-onMessage)、[sendMessage](https://developer.chrome.com/docs/extensions/reference/runtime#method-sendMessage)

其他的 API 都无法直接调用，需要通过 **消息通信** 的发方式，让插件程序把结果通过消息的方式返回。

#### 静态注入

静态注入指，使用 manifest.json 配置文件字段的方式定义的 content scripts。

```json
{
    "content_scripts": [
    {
      "js": [
        "/js/vapi.js",
        "/js/vapi-client.js",
        "/js/contentscript.js"
      ],
       "matches": [
        "http://*/*",
        "https://*/*"
      ],
      "run_at": "document_start"
    }
  ],
}
```

自定义字段：

- `matches`: 必选，指定哪些页面（URL）才可以注入此脚本。类似的还有 `exclude_matches`。

- `css`: 可选，注入 css 样式文件。

- `js`: 可选，注入 js 脚本文件。

- `run_at`: 可选，指定内容脚本加载的时机。可以指定:
  -  `document_idle`，默认值。表示在 `document_end` 与 `window.onload` 事件后 之间。在 `document_idle` 运行的脚本中监听的 `window.onload` 将不会生效。
  - `document_start`，表示在 CSS 解析后，DOM 构建和 Script 执行前。
  - `document_end`，表示在 DOM 构建完成后，img、frame 加载前。

- `all_frames`: 可选。
  - `true` 表示内容脚本会被注入到当前选项卡的所有 frames（同时需要满足 URL 要求）。
  - `false` 则只会注入到顶层 frame。

#### 动态注入

在动态注入 `content-script` 前，需要在 `manifast.json` 中添加 `activeTab` 权限，使内容脚本能够在当前活动选项卡上下文运行，而无需指定跨域权限。

```json
{
  ...
  "permissions": [
    "activeTab"
  ],
  ...
}
```

未指定 `activeTab` 权限时调用动态注入 API 时，会报以下错：

![image-20210818150207925](/Users/guohualiang/Desktop/md/blog/chrome/exexecuteScript-error.png)

动态注入脚本代码、脚本文件的示例代码:

```js
chrome.runtime.onMessage.addListener(
  function(message, callback) {
    if (message == "executeScript"){
      // 注入脚本代码
      chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="orange"'
      });
      // 注入脚本文件
      chrome.tabs.executeScript({
        file: 'contentScript.js'
      });
    }
  });
```

### devtools_page

> 官网链接：
>
> [devtools_page](https://developer.chrome.com/docs/extensions/mv2/devtools/#devtools-page)

可以通过配置 `devtools_page` 字段，增强 `Chrome Devtools` 的能力。类似于我们在控制台上看到的 `network`、`source` 等面单。而且在所有选项卡下的控制台都能看到此面板。

对于配置了 `devtools_page` 字段的插件，可以称之为开发者工具插件（`DevTools extensions`）。

开发者工具插件可以直接访问 `DevTools APIs`: 

- [devtools.inspectedWindow](https://developer.chrome.com/docs/extensions/reference/devtools_inspectedWindow/)，获取当前审查window，以及在其上下文运行脚本代码。
- [devtools.network](https://developer.chrome.com/docs/extensions/reference/devtools_network/)，获取网络请求信息。
- [devtools.panels](https://developer.chrome.com/docs/extensions/reference/devtools_panels/)，创建面板与面板交互的 API。

此外，`DevTools page` 一般不能直接调用其他 API，除了 `chrome.extension.*`、`chrome.runtime.*`，所以需要通过消息通信的方式，让 `background` 页面把计算后的结果返回。

这是官网介绍 `background`、`content-script`、`devtool-page` 之间关系的图:

![devtools-page](/Users/guohualiang/Desktop/md/blog/chrome/devtools-page.png)

定制开发者面板有关代码：

![devtools-panel-sidebar](/Users/guohualiang/Desktop/md/blog/chrome/devtools-panel-sidebar.png)

1、添加面板 js / devtools.js

```js
chrome.devtools.panels.create("My Panel",
  null,
  "panel.html",
  function (panel) {
    // code invoked on panel creation
  }
);
```

2、添加侧边栏 js / devtools.js

```js
chrome.devtools.panels.elements.createSidebarPane("My Sidebar",
  function (sidebar) {
    // sidebar initialization code here
    sidebar.setPage("sidebar.html"); // 设置一个页面
    sidebar.setHeight("8ex");
  }
);
```

### options_page、options_ui

> 官网链接：
>
> [Give users options](https://developer.chrome.com/docs/extensions/mv2/options/)

用户可以给插件定制配置页面，配置页面可以通过 **右击** 插件图标，然后点击 **选项** 打开 `option page`。如果插件没有配置 `options_page`、`options_ui` 字段，此选项会直接置灰。

或者，通过 `chrome://extensions` 进入插件详情，找到并点击 **扩展程序选项** 打开。

通常，可以使用配置页面，管理一些后台数据、用户交互习惯等数据等，结合 `storage.sync` API 一起使用。

<img src="/Users/guohualiang/Desktop/md/blog/chrome/click-option-page.png" alt="click-option-page" style="zoom: 80%;" />

1、以页面的方式打开 `option page`

manifest.json

```json
{
  "options_page": "options.html"
}
```

2、以弹出的方式打开 `option page`

manifest.json

```json
{  
 "options_ui": {
    "page": "options.html",
    "open_in_tab": false
  }
}
```

3、使用 Chrome API 打开 `option page`

打开的形式，会根据 `options_page` 还是 `options_ui` 决定。如果都没有配置，插件会报以下错误: `Unchecked runtime.lastError: Could not create an options page.`

```js
(async () => {
  chrome.runtime.onMessage.addListener(
    function (message, callback) {
      console.log('onMessage', message);=
      } else if (message == 'optionPage') {
        if (chrome.runtime.openOptionsPage) {
          chrome.runtime.openOptionsPage();
        } else {
          window.open(chrome.runtime.getURL('options.html'));
        }
      }
    });
})();
```

### update_url

> 官网链接：
>
> [Autoupdating](https://developer.chrome.com/docs/apps/autoupdate/)

可以通过两种方式实现插件更新：

1、使用 Chrome 插件平台托管，通过平台发布更新版本，实现插件的更新。

2、通过指定 `update_url` 字段，随浏览器的自动检查更新机制（每个几个小时），拉取 `xml` 清单，决定是否更新最新版本。

很遗憾的是，我没有在本地调试成功，根据网上的说法，Chrome 更新机制不认本地文件服务（与端口号非80有关），感兴趣可以自行探索一下。

## 主要 API 介绍

### chrome.action、chrome.pageAction、chrome.browserAction

这三个 API 均与插件在浏览器地址栏右侧的 icon 有关，但并不是完全一样的东西。

三者的关系可以使用官网的一个说法：

> The chrome.action API replaced the [browserAction](https://developer.chrome.com/docs/extensions/reference/browserAction/) and [pageAction](https://developer.chrome.com/docs/extensions/reference/pageAction/) APIs in Manifest V3. By default, actions are similar to browser actions, but it is possible to emulate the behavior of a page action using the action API.
>
> 在 Manifest V3 中，使用 chrome.action 代替 V2 中的其他两个 API。 `chrome.action` 更像是 `chrome.browserAction`，同时，可以使用 `chrome.action` 模拟 `chrome.browserAction` 中的能力。

`chrome.pageAction` 与 `chrome.browserAction` 的差异在于：

browserAction 以常驻 icon 的形式，在所有的选项卡中，行为都是一样。而 pageAction 则通常用于某些 url/tab 才展示 icon 的场景。

**chrome.browserAction 相关 API**

- **Methods**
  - `disable` − browserAction.disable(integer tabId)
  - `enable` − browserAction.enable(integer tabId)
  - `getBadgeBackgroundColor` − browserAction.getBadgeBackgroundColor(object details, function callback)
  - `getBadgeText` − browserAction.getBadgeText(object details, function callback)
  - `getPopup1` − browserAction.getPopup(object details, function callback)
  - `getTitle1` − browserAction.getTitle(object details, function callback)
  - `setBadgeBackgroundColor` − browserAction.setBadgeBackgroundColor(object details)
  - `setBadgeText` − browserAction.setBadgeText(object details)
  - `setIcon1` − browserAction.setIcon(object details, function callback)
  - `setPopup1` − browserAction.setPopup(object details)
  - `setTitle1` − browserAction.setTitle(object details)
- **Events**
  - `onClicked1`

**chrome.pageAction 相关 API**

- **Methods**
  - `getPopup1` − pageAction.getPopup(object details, function callback)
  - `getTitle1` − pageAction.getTitle(object details, function callback)
  - `hide` − chrome.pageAction.hide(integer tabId)
  - `setIcon1` − pageAction.setIcon(object details, function callback)
  - `setPopup1` − pageAction.setPopup(object details)
  - `setTitle1` − pageAction.setTitle(object details)
  - `show` − pageAction.show(integer tabId)
- **Events**
  - `onClicked1`

### chrome.runtime

`chrome.runtime` API 允许用户拿到后台程序页面、manifest 信息、实现消息通信、插件生命周期等，包括但不限于以下能力：

**Message passing （常用）**

实现[消息通信](#消息通信)， 包括 `connect, connectNative, sendMessage, and sendNativeMessage`。

**Accessing extension and platform metadata**

获取 后台页面，manifest 配置，平台参数等，包括 `getBackgroundPage, getManifest, getPackageDirectoryEntry, and getPlatformInfo`。

**Managing extension lifecycle and options**

重新加载插件，执行立即更新检查，控制 option 页面展示等，包括 `reload, requestUpdateCheck, setUninstallURL, and openOptionsPage`。

**Device restart support**

重启插件，但只能在 `Chrome OS` 系统上生效，包括 `restart, restartAfterDelay`。

**Helper utilities**

其他一些工具函数，包括 `getURL`。

**有关 API**

- **Methods**
  - `connect` - connect(extensionId, connectInfo)
  - `connectNative` - connectNative(application)
  - `getBackgroundPage` - getBackgroundPage(callback)
  - `getManifest` - getManifest()
  - `getPackageDirectoryEntry` - getPackageDirectoryEntry(callback)
  - `getPlatformInfo` - getPlatformInfo(callback)
  - `getURL` - getURL(path)
  - `openOptionsPage` - openOptionsPage(callback)
  - `reload` - reload()
  - `requestUpdateCheck` - requestUpdateCheck(callback)
  - `restart` - restart()
  - `restartAfterDelay` - restartAfterDelay(seconds, callback)
  - `sendMessage` - sendMessage(extensionId, message, options, responseCallback)
  - `sendNativeMessage` - sendNativeMessage(application, message, responseCallback)
  - `setUninstallURL` - setUninstallURL(url, callback)
- **Events**
  - `onBrowserUpdateAvailable`
  - `onConnect`
  - `onConnectExternal`
  - `onConnectNative`
  - `onInstalled`
  - `onMessage`
  - `onMessageExternal`
  - `onRestartRequired`
  - `onStartup`
  - `onSuspend`
  - `onSuspendCanceled`
  - `onUpdateAvailable`

### chrome.tabs

chrome.tabs API 允许用户新建、编辑、重新排版选项卡，以及获取选项卡信息等。

操作选项卡需要在 manife.json 中申请 tabs 权限："permissions": [ "tabs"  ]。

**有关 API**

- **Methods**
  - `captureVisibleTab` - captureVisibleTab(windowId, options, callback)
  - `connect` - connect(tabId, connectInfo, callback)
  - `create` - create(createProperties, callback)
  - `detectLanguage` - detectLanguage(tabId, callback)
  - `discard` - discard(tabId, callback)
  - `duplicate` - duplicate(tabId, callback)
  - `executeScript` - executeScript(tabId, details, callback)
  - `get` - get(tabId, callback)
  - `getAllInWindow` - getAllInWindow(windowId, callback)
  - `getCurrent` - getCurrent(callback)
  - `getSelected` - getSelected(windowId, callback)
  - `getZoom` - getZoom(tabId, callback)
  - `getZoomSettings` - getZoomSettings(tabId, callback)
  - `goBack` - goBack(tabId, callback)
  - `goForward` - goForward(tabId, callback)
  - `group` - group(options, callback)
  - `highlight` - highlight(highlightInfo, callback)
  - `insertCSS` - insertCSS(tabId, details, callback)
  - `move` - move(tabIds, moveProperties, callback)
  - `query` - query(queryInfo, callback)
  - `reload` - reload(tabId, reloadProperties, callback)
  - `remove` - remove(tabIds, callback)
  - `removeCSS` - removeCSS(tabId, details, callback)
  - `sendMessage` - sendMessage(tabId, message, options, responseCallback)
  - `sendRequest` - sendRequest(tabId, request, responseCallback)
  - `setZoom` - setZoom(tabId, zoomFactor, callback)
  - `setZoomSettings` - setZoomSettings(tabId, zoomSettings, callback)
  - `ungroup` - ungroup(tabIds, callback)
  - `update` - update(tabId, updateProperties, callback)
- **Events**
  - `onActivated`
  - `onActiveChanged`
  - `onAttached`
  - `onCreated`
  - `onDetached`
  - `onHighlightChanged`
  - `onHighlighted`
  - `onMoved`
  - `onRemoved`
  - `onReplaced`
  - `onSelectionChanged`
  - `onUpdated`
  - `onZoomChange`

### chrome.contextMenus

一般只在需要右键面板添加一些菜单时使用到这个 API，操作右键菜单面板需要申请权限："permissions": [ "contextMenus" ]。

**有关 API**

- **Methods**

  - `create` - create(createProperties, callback)
  - `remove` - remove(menuItemId, callback)
  - `removeAll` - removeAll(callback)
  - `update` - update(id, updateProperties, callback)

- **Events**
- `onClicked`

## 消息通信

> 扩展程序和内容脚本间的通信使用消息传递的方式。两边均可以监听另一边发来的消息，并通过同样的通道回应。消息可以包含任何有效的 JSON 对象（null、boolean、number、string、array 或 object）。

#### 短链接

主要是`runtime.sendMessage`或`tabs.sendMessage` 方法。

**1、发送方**

在`内容脚本`中发送请求，或从`扩展程序`向`内容脚本`发送请求。

```js
chrome.runtime.sendMessage({greeting: "您好"}, function(response) {
  console.log(response.farewell);
});
```

向`指定标签页`中的内容脚本中发送请求。

```js
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "您好"}, function(response) {
    console.log(response.farewell);
  });
});
```

**2、接收方**

```js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab 
                "来自内容脚本：" + sender.tab.url :
                "来自扩展程序");
    if (request.greeting == "您好")
      sendResponse({farewell: "再见"});
  });
```

#### 长连接

主要是`runtime.connect`或`tabs.connect`方法。

**1、发送方**

在`内容脚本`中发送请求，或从`扩展程序`向`内容脚本`发送请求。

**建立连接后，两端都将得到一个 `runtime.Port`对象，用来通过建立的连接发送和接收消息。**

```js
var port = chrome.runtime.connect({name: "敲门"});
port.postMessage({joke: "敲门"}); // 发送消息
port.onMessage.addListener(function(msg) { // 接收消息
  if (msg.question == "是谁？")
    port.postMessage({answer: "女士"});
  else if (msg.question == "哪位女士？")
    port.postMessage({answer: "Bovary 女士"});
});
```

向`指定标签页`中的内容脚本中发送请求，使用`tabs.connect`替换上述的`runtime.connect`。

**2、接收方**

设置一个`runtime.onConnect`事件监听器，监听发送方调用 `connect` 后，建立连接并得到一个`runtime.Port`对象。

```js
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "敲门");
  port.onMessage.addListener(function(msg) {
    if (msg.joke == "敲门")
      port.postMessage({question: "是谁？"});
    else if (msg.answer == "女士")
      port.postMessage({question: "哪位女士？"});
    else if (msg.answer == "Bovary 女士")
      port.postMessage({question: "我没听清楚。"});
  });
});
```

**3、断开连接**

其中一端监听`runtime.Port.onDisconnect`事件，当连接的另一端调用`runtime.Port.disconnect`或包含该端口的页面已结束（例如标签页转到了另一个页面）时，对于每一个端口确保都会发生一次该事件。

#### 非插件页面向内容脚本发送消息

`Inner.html`

```js
document.getElementById("theButton").addEventListener("click",
    function() {
  window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
}, false);
```

`contentScript.js`

```js
var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    port.postMessage(event.data.text);
  }
}, false);
```

## 开发与调试

> 官网链接：
>
> [Getting started](https://developer.chrome.com/docs/extensions/mv2/getstarted/)
>
> [Debugging extensions](https://developer.chrome.com/docs/extensions/mv2/tut_debugging/)

### 开发前准备

1. 通过导航打开扩展管理页面：`chrome://extensions`
   - 也可以通过单击 Chrome 菜单，将鼠标悬停在 “**更多工具**” 上，然后选择 ”**扩展程序**” 来打开 “**扩展管理**” 页面。
2. 通过单击 **开发者模式** 旁边的切换开关启用。
3. 单击 **加载已解压的扩展程序** 按钮并选择扩展目录。

4. 如果修改了本地的代码，通过点击 **刷新** 图标按钮，重新加载插件。

<img src="/Users/guohualiang/Desktop/md/blog/chrome/open-chrome-extensions.png" alt="start a chrome etension" style="zoom: 50%;" />

### 创建项目 (React)

Chrome 插件的开发可以直接使用原生 JS，但是由于使用原生来写交互事件着实让人头痛。

于是，本次项目的搭建以 `React + Antd` 作为基本技术选型。

1. 初始化 npm

```bash
npm init -y
```

2. 安装依赖

```bash
# dev 依赖
npm install --save-dev @babel/core @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-react babel-loader copy-webpack-plugin clean-webpack-plugin html-loader html-webpack-plugin webpack webpack-cli webpack-dev-server
# 非 dev 依赖
npm install react react-dom react-router-dom
```

3. 添加 `scripts`

```json
{
   ...
  "scripts": {
    "start": "webpack-dev-server",
    "build:prod": "webpack --mode=production",
    "build:watch": "webpack --watch --mode=production"
  }
  ...
}
```

4. 创建 React 文件

目录结构如下：

```text
📦src
 ┣ 📂assets
 ┃ ┗ 📜eye-dropper-solid.svg
 ┣ 📂background
 ┃ ┗ 📜index.ejs
 ┣ 📂components
 ┣ 📂epicker-ui
 ┃ ┣ 📜api.ts
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.ejs
 ┃ ┗ 📜index.tsx
 ┣ 📂popup
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.ejs
 ┃ ┗ 📜index.tsx
 ┣ 📜declares.d.ts
 ┣ 📜default.css
 ┣ 📜manifest.json
 ┗ 📜request.ts
```

由于我们需要插入一些第三方的 js 包，所以我们的 HTML 模版采用 ejs 文件来写。

popup.ejs

```ejs
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Document</title>
</head>

<body>
  <div id="popup"></div>
  <%
    for (let i=0; i<htmlWebpackPlugin.options.jsScripts.length; i++) {
  %>
    <script defer="defer" src="<%= htmlWebpackPlugin.options.jsScripts[i] %>"></script>
  <% } %>
</body>

</html>
```

epicker-ui.js

```ejs
<!DOCTYPE html>
<html id="tracker-epicker" lang="en">

<head>
  <meta charset="utf-8">
</head>

<body>
  <div id="epicker-ui"></div>
  <%
    for (let i=0; i<htmlWebpackPlugin.options.jsScripts.length; i++) {
  %>
  <script defer="defer" src="<%= htmlWebpackPlugin.options.jsScripts[i] %>"></script>
  <% } %>
</body>

</html>
```

background.ejs

```ejs
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
</head>

<body>
  <%
  for (let i=0; i<htmlWebpackPlugin.options.jsScripts.length; i++) {
  %>
  <script defer="defer" src="<%= htmlWebpackPlugin.options.jsScripts[i] %>"></script>
  <% } %>
</body>

</html>
```

5. 创建 Chrome 插件文件

manifest.json

```json
{
  "description": "Tracker Creator for SSC",
  "manifest_version": 2,
  "minimum_chrome_version": "55.0",
  "name": "Tracker Creator 2",
  "version": "0.0.1",

  "background": {
    "page": "background.html"
  },
  "browser_action": {
    "default_icon": "img/icon.png",
    "default_popup": "popup.html",
    "default_title": "Tracker Creator"
  },
  "icons": {
    "32": "img/icon.png"
  },
  "content_scripts": [
    {
      "all_frames": true,
      "js": [
        "/js/vapi.js",
        "/js/vapi-client.js",
        "/js/contentscript.js"
      ],
      "match_about_blank": true,
      "matches": [
        "http://*/*",
        "https://*/*"
      ],
      "run_at": "document_start"
    }
  ],

  "content_security_policy": "script-src 'self'; object-src 'self'",

  "permissions": [
    "cookies",
    "storage",
    "tabs",
    "unlimitedStorage",
    "webNavigation",
    "webRequest",
    "webRequestBlocking",
    "<all_urls>"
  ],

  "web_accessible_resources": [
    "/web_accessible_resources/*"
  ]
}
```

`content_scripts`: 这里配置了一些上下文脚本。

`permissions`: 需要向浏览器申请的权限。

`web_accessible_resources`: 资源文件，如 `epicker-ui.html`。

6. 配置 `tsconfig.json`

```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "jsx": "react",
    "lib": ["es2015", "dom"],
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist/js",
    "rootDir": "src",
    "sourceMap": true,
    "target": "es5"
  }
}
```

7. 配置 `webpack.config.js`

本次项目开发涉及三个页面：popup.html（参数面板），epicker-ui.html（选择器面板），background.html（后台）。

配置 externals: {vAPI: 'vAPI', cTracker: 'cTracker', chrome: 'chrome',} 以在项目中通过 import 的方式直接使用第三方 API。

同时，记得需要在 declares.d.ts 文件中配置：declare module 'vAPI'; declare module 'cTracker'; declare module 'chrome'; 使不会报 ts 的异常。

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    historyApiFallback: true
  },
  entry: {
    popup: path.resolve(__dirname, "./src/popup/index.tsx"),
    'epicker-ui': path.resolve(__dirname, "./src/epicker-ui/index.tsx"),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    mainFields: ['module', 'main', 'browser'],
    alias: {
      root: path.resolve(__dirname),
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.tsx', '.d.ts', '.ts', '.jsx', '.json', '.css'],
  },
  externals: {
    vAPI: 'vAPI',
    cTracker: 'cTracker',
    chrome: 'chrome',
  },
  optimization: {
	...
  },
  module: {
   ...
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'src/popup/index.ejs',
      chunks: ['popup'],
      jsScripts: ["js/vapi.js", "js/vapi-common.js", "js/vapi-client.js"],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      filename: 'web_accessible_resources/epicker-ui.html',
      template: 'src/epicker-ui/index.ejs',
      chunks: ['epicker-ui'],
      jsScripts: ["../js/vapi.js", "../js/vapi-common.js", "../js/vapi-client.js", "../js/vapi-client-extra.js", "../js/lib/optimal-select.min.js"],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      filename: 'background.html',
      template: 'src/background/index.ejs',
      chunks: ['background'],
      jsScripts: ["js/webext.js", "js/vapi.js", "js/vapi-common.js", "js/vapi-background.js", "js/background.js", "js/cTracker.js", "js/messaging.js", "js/start.js"],
      inject: 'body',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: '[name][ext]' },
      ]
    }),
    new CleanWebpackPlugin()
    ...
  ],
  performance: {
    hints: false,
  },
}
```

8. 打包

```bash
npm run build
```

加载已解压的扩展程序，选择 dist 的打包结果。

### 调试 content scripts

可以在 `source > Content scripts` 中找到插件的所有的 `Content scripts`，任意添加断点进行调试 `JS`。

![debug content scripts](/Users/guohualiang/Desktop/md/blog/chrome/debug-conten-script.png)

### 调试 Background

可以在插件界面，找到 **background.html** 的链接，点击便可打开背景页的调试控制台。

![debug backgound](/Users/guohualiang/Desktop/md/blog/chrome/debug-backgound.png)

### 调试 Popup.js

Popup 与普通的 Web 调试类似，可以在右击 **工具栏插件图标** 后，在展开的内容上选择 **审查弹出内容**，即可打开 **Popup 页面** 的调试控制台。

![debug popup.js](/Users/guohualiang/Desktop/md/blog/chrome/debug-popup.png)

# 参考

- [谷歌插件文档](https://developer.chrome.com/docs/extensions/reference/)
- [chrome 插件调试技巧](https://blog.spoock.com/2016/04/03/chrome-extension-debugging/)
- https://crxdoc-zh.appspot.com/extensions/messaging
- [Build a Chrome Extension Using ReactJS](https://dev.to/anobjectisa/build-a-chrome-extension-using-reactjs-38o7)
- [How to Build a Chrome Extension With React, TypeScript, and Webpack](https://medium.com/swlh/how-to-build-a-chrome-extension-with-react-typescript-and-webpack-92e806ce2e16)
- [Create Chrome Extension in React](https://dev.to/bayardlouis470/create-chrome-extension-in-react-3pna)
- [What are the differences between page action and browser action](https://stackoverflow.com/questions/44712495/what-are-the-differences-between-page-action-and-browser-action/44713058)