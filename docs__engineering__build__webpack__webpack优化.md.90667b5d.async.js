(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[45],{CUj7:function(e,n,l){"use strict";var a=l("ahKI"),t=l.n(a),r=l("bIC1"),c=l.n(r);l("tkuz");function i(e,n){return E(e)||s(e,n)||m(e,n)||u()}function u(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function m(e,n){if(e){if("string"===typeof e)return o(e,n);var l=Object.prototype.toString.call(e).slice(8,-1);return"Object"===l&&e.constructor&&(l=e.constructor.name),"Map"===l||"Set"===l?Array.from(e):"Arguments"===l||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l)?o(e,n):void 0}}function o(e,n){(null==n||n>e.length)&&(n=e.length);for(var l=0,a=new Array(n);l<n;l++)a[l]=e[l];return a}function s(e,n){var l=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var a,t,r=[],c=!0,i=!1;try{for(l=l.call(e);!(c=(a=l.next()).done);c=!0)if(r.push(a.value),n&&r.length===n)break}catch(u){i=!0,t=u}finally{try{c||null==l["return"]||l["return"]()}finally{if(i)throw t}}return r}}function E(e){if(Array.isArray(e))return e}var d=function(e){var n=e.children,l=Object(a["useRef"])(),r=Object(a["useState"])(!1),u=i(r,2),m=u[0],o=u[1],s=Object(a["useState"])(!1),E=i(s,2),d=E[0],p=E[1];return Object(a["useEffect"])((function(){var e=l.current,n=c()((function(){o(e.scrollLeft>0),p(e.scrollLeft<e.scrollWidth-e.offsetWidth)}),100);return n(),e.addEventListener("scroll",n),window.addEventListener("resize",n),function(){e.removeEventListener("scroll",n),window.removeEventListener("resize",n)}}),[]),t.a.createElement("div",{className:"__dumi-default-table"},t.a.createElement("div",{className:"__dumi-default-table-content",ref:l,"data-left-folded":m||void 0,"data-right-folded":d||void 0},t.a.createElement("table",null,n)))};n["a"]=d},Jeb7:function(e,n,l){"use strict";l.r(n);var a=l("ahKI"),t=l.n(a),r=l("s8Wh"),c=l("sPhZ"),i=l("Fesk"),u=l("CUj7"),m=t.a.memo((e=>{var n=e.demos,a=n["webpack\u4f18\u5316-demo"].component;return t.a.createElement(t.a.Fragment,null,t.a.createElement(t.a.Fragment,null,t.a.createElement("div",{className:"markdown"},t.a.createElement("h1",{id:"webpack-\u4f18\u5316"},t.a.createElement(r["AnchorLink"],{to:"#webpack-\u4f18\u5316","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"webpack \u4f18\u5316"),t.a.createElement("h2",{id:"\u7f29\u5c0f\u67e5\u627e\u8303\u56f4"},t.a.createElement(r["AnchorLink"],{to:"#\u7f29\u5c0f\u67e5\u627e\u8303\u56f4","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u7f29\u5c0f\u67e5\u627e\u8303\u56f4"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("p",null,t.a.createElement("code",null,"resolve"),"\uff0c\u89e3\u6790\u6a21\u5757\u65f6\u7684\u914d\u7f6e"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("code",null,"extensions"),"\uff0c\u6269\u5c55\u540d\uff08\u6570\u7ec4\uff09")),t.a.createElement("p",null,"\u5728\u67e5\u627e\u6a21\u5757\u65f6\uff0c\u901a\u8fc7\u914d\u7f6e\u6587\u4ef6\u6269\u5c55\u540d\uff0c\u53ef\u4ee5\u52a0\u5feb\u6269\u5c55\u540d\u5339\u914d"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("code",null,"alias"),"\uff0c\u522b\u540d\uff08\u5bf9\u8c61\uff09")),t.a.createElement("p",null,"\u914d\u7f6e\u6a21\u5757\u7684\u522b\u540d\uff0c\u6307\u5b9a\u52a0\u8f7d\u6a21\u5757\u7684\u7edd\u5bf9\u8def\u5f84\uff0c\u5219\u4e0d\u9700\u8981\u4ece",t.a.createElement("code",null,"node_modules"),"\u6587\u4ef6\u5939\u4e2d\u67e5\u627e\u4e86"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("code",null,"modules"),"\uff0c\u76ee\u5f55\uff08\u6570\u7ec4\uff09")),t.a.createElement("p",null,"\u6307\u5b9a\u6a21\u5757\u67e5\u627e\u65f6\u7684\u76ee\u5f55\u8303\u56f4"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("code",null,"mainFields"),"\uff0cpackage.json \u6587\u4ef6\u7684\u5165\u53e3\u5b57\u6bb5\uff08\u6570\u7ec4\uff09")),t.a.createElement("p",null,"\u53ef\u4ee5\u914d\uff1a['browser', 'module', 'main']"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("code",null,"mainFiles"),"\uff0c\u6ca1\u6709 package.json \u65f6\u6307\u5b9a\u7684\u5165\u53e3\u6587\u4ef6\u540d\uff08\u6570\u7ec4\uff09")),t.a.createElement("p",null,"\u53ef\u4ee5\u914d\uff1a['index'] \u6216\u66f4\u591a")),t.a.createElement("li",null,t.a.createElement("p",null,t.a.createElement("code",null,"resolveLoader"),"\uff0c\u89e3\u6790 loader \u65f6\u7684\u914d\u7f6e\uff08\u5bf9\u8c61\uff09"),t.a.createElement("p",null,"\u914d\u7f6e\u9879\u7c7b\u4f3c resolve"))),t.a.createElement("h2",{id:"\u8df3\u8fc7\u6307\u5b9a\u6a21\u5757\u89e3\u6790"},t.a.createElement(r["AnchorLink"],{to:"#\u8df3\u8fc7\u6307\u5b9a\u6a21\u5757\u89e3\u6790","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u8df3\u8fc7\u6307\u5b9a\u6a21\u5757\u89e3\u6790"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("code",null,"noParse"),"\uff0c\u8fd9\u4e9b\u6a21\u5757\u4e0d\u4f1a\u88ab\u89e3\u6790\u4f9d\u8d56\uff08\u6b63\u5219\u8868\u8fbe\u5f0f\u6216\u8fd4\u56de bool \u7c7b\u578b\u7684\u51fd\u6570\uff09")),t.a.createElement("h2",{id:"\u914d\u7f6e\u5168\u5c40\u53d8\u91cfwebpack-\u6ce8\u5165\u5f0f"},t.a.createElement(r["AnchorLink"],{to:"#\u914d\u7f6e\u5168\u5c40\u53d8\u91cfwebpack-\u6ce8\u5165\u5f0f","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u914d\u7f6e\u5168\u5c40\u53d8\u91cf\uff08webpack \u6ce8\u5165\u5f0f\uff09"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("p",null,t.a.createElement("code",null,"DefinePlugin"),"\uff0c\u6307\u5b9a\u6ce8\u5165\u7684\u5c5e\u6027\uff08\u63d2\u4ef6\uff09"),t.a.createElement("p",null,"\u5185\u90e8\u4f7f\u7528 eval \u6765\u8f6c\u5316\u6bcf\u4e00\u4e2a\u5c5e\u6027"),t.a.createElement(i["a"],{code:'new webpack.DefinePlugin({\n    PRODUCTION: JSON.stringify(true),\n    VERSION: "1",\n    EXPRESSION: "1+2",\n    COPYRIGHT: {\n        AUTHOR: JSON.stringify("Angel \u5c41\u5c41")\n    }\n})',lang:"js"}))),t.a.createElement("h2",{id:"\u6253\u5305\u65f6\u5ffd\u7565\u6307\u5b9a\u6a21\u5757\u7684\u5927\u6587\u4ef6\u5939"},t.a.createElement(r["AnchorLink"],{to:"#\u6253\u5305\u65f6\u5ffd\u7565\u6307\u5b9a\u6a21\u5757\u7684\u5927\u6587\u4ef6\u5939","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u6253\u5305\u65f6\u5ffd\u7565\u6307\u5b9a\u6a21\u5757\u7684\u5927\u6587\u4ef6\u5939"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("p",null,t.a.createElement("code",null,"IgnorePlugin"),"\uff0c\u4e0d\u6253\u5305\u6307\u5b9a\u6a21\u5757\u7684\u67d0\u4e2a\u5927\u6587\u4ef6\u5939\uff08\u63d2\u4ef6\uff09"),t.a.createElement("p",null,"\u7b2c\u4e00\u4e2a\u53c2\u6570\u662f\u5339\u914d\u5f15\u5165\u6a21\u5757\u8def\u5f84\u7684\u6b63\u5219"),t.a.createElement("p",null,"\u7b2c\u4e8c\u4e2a\u53c2\u6570\u662f\u5339\u914d\u6a21\u5757\u76ee\u5f55\u540d\u7684\u6b63\u5219"),t.a.createElement(i["a"],{code:"new webpack.IgnorePlugin(/^\\.\\/locale/, /coments$/)",lang:"js"}))),t.a.createElement("h2",{id:"\u5c01\u88c5\u6253\u5370\u65e5\u5fd7\u6a21\u5757"},t.a.createElement(r["AnchorLink"],{to:"#\u5c01\u88c5\u6253\u5370\u65e5\u5fd7\u6a21\u5757","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u5c01\u88c5\u6253\u5370\u65e5\u5fd7\u6a21\u5757"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("p",null,t.a.createElement("code",null,"log")),t.a.createElement("p",null,"\u5f00\u53d1\u73af\u5883\u4e0b\uff0c\u624d\u9700\u8981\u6253\u5370\u65e5\u5fd7"),t.a.createElement("p",null,"\u914d\u7f6e",t.a.createElement("code",null,"mode: 'development'"),"\u6216",t.a.createElement("code",null,"webpack-dev-server --env=development")),t.a.createElement("p",null,"webpack \u6253\u5305\u4e86\u4e00\u4e2a@process \u6a21\u5757"),t.a.createElement(i["a"],{code:"function log(..args){\n    if(process.env.MODE_ENV === 'development'){\n        console.log.apply(console, ...args);\n    }\n}\nlog('\u5f00\u53d1\u6a21\u5f0f\u4e0b\uff0c\u624d\u9700\u8981\u6253\u5370\u65e5\u5fd7')",lang:"js"}))),t.a.createElement("h2",{id:"\u4f18\u5316\u548c\u538b\u7f29\u56fe\u7247"},t.a.createElement(r["AnchorLink"],{to:"#\u4f18\u5316\u548c\u538b\u7f29\u56fe\u7247","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u4f18\u5316\u548c\u538b\u7f29\u56fe\u7247"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("code",null,"image-webpack-loader"),"\uff0c\u538b\u7f29\u548c\u4f18\u5316\u56fe\u7247\uff08loader\uff09")),t.a.createElement("h2",{id:"\u4f18\u5316\u65e5\u5fd7\u8f93\u51fa"},t.a.createElement(r["AnchorLink"],{to:"#\u4f18\u5316\u65e5\u5fd7\u8f93\u51fa","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u4f18\u5316\u65e5\u5fd7\u8f93\u51fa"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("code",null,"friendly-errors-webpack-plugin"),"\uff0c\u53cb\u597d\u8f93\u51fa\u65e5\u5fd7\uff08\u63d2\u4ef6\uff09")),t.a.createElement("h2",{id:"\u8d39\u65f6\u5206\u6790"},t.a.createElement(r["AnchorLink"],{to:"#\u8d39\u65f6\u5206\u6790","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u8d39\u65f6\u5206\u6790"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("p",null,t.a.createElement("code",null,"SpeedMeasureWebpackPlugin"),"\uff0c\u5206\u6790\u7f16\u8bd1\u6d41\u7a0b\u5404\u90e8\u4ef6\u7684\u8017\u65f6\uff08\u63d2\u4ef6\uff09"),t.a.createElement(i["a"],{code:"const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');\nconst swv = new SpeedMeasureWebpackPlugin();\nmodule.exports = swv.wrap({\n    //...\n})",lang:"js"}))),t.a.createElement("img",{src:l("PtHo")}),t.a.createElement("h2",{id:"\u6253\u5305\u6587\u4ef6\u5927\u5c0f\u5206\u6790"},t.a.createElement(r["AnchorLink"],{to:"#\u6253\u5305\u6587\u4ef6\u5927\u5c0f\u5206\u6790","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u6253\u5305\u6587\u4ef6\u5927\u5c0f\u5206\u6790"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("p",null,t.a.createElement("code",null,"webpack-bundle-analyzer"),"\uff0c\u751f\u6210\u4ee3\u7801\u5206\u6790\u62a5\u544a\uff08\u63d2\u4ef6\uff09"),t.a.createElement(i["a"],{code:"const BundleAnalyzerPlugin = require('webapck-bundle-analyzer').BundleAnalyzerPlugin;\n\nmodule.exports = {\n    plugins: [\n        new BundleAnalyzerPlugin() // \u4f7f\u7528\u9ed8\u8ba4\u914d\u7f6e\uff0c\u4e5f\u53ef\u4ee5\u81ea\u5df1\u5b9a\u4e49\u914d\u7f6e\n        // \u9ed8\u8ba4\u914d\u7f6e\u7684\u5177\u4f53\u914d\u7f6e\u9879\n        // new BundleAnalyzerPlugin({\n        //   analyzerMode: 'server',\n        //   analyzerHost: '127.0.0.1',\n        //   analyzerPort: '8888',\n        //   reportFilename: 'report.html',\n        //   defaultSizes: 'parsed',\n        //   openAnalyzer: true,\n        //   generateStatsFile: false,\n        //   statsFilename: 'stats.json',\n        //   statsOptions: null,\n        //   excludeAssets: null,\n        //   logLevel: info\n        // })\n    ]\n}",lang:"js"}),t.a.createElement("p",null,"\u751f\u6210 stats.json"),t.a.createElement(i["a"],{code:'{\n "scripts": {\n    "generateAnalyzFile": "webpack --profile --json > stats.json", // \u751f\u6210\u5206\u6790\u6587\u4ef6\n    "analyz": "webpack-bundle-analyzer --port 8888 ./dist/stats.json" // \u542f\u52a8\u5c55\u793a\u6253\u5305\u62a5\u544a\u7684 http \u670d\u52a1\u5668\n  }\n}',lang:"json"}))),t.a.createElement("h2",{id:"\u6253\u5305\u81ea\u5b9a\u4e49\u5e93"},t.a.createElement(r["AnchorLink"],{to:"#\u6253\u5305\u81ea\u5b9a\u4e49\u5e93","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u6253\u5305\u81ea\u5b9a\u4e49\u5e93"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("p",null,t.a.createElement("code",null,"library"),"\u548c",t.a.createElement("code",null,"libraryTarget"),"\uff0c\u914d\u7f6e output \u5bf9\u8c61\u7684\u5c5e\u6027"),t.a.createElement(u["a"],null,t.a.createElement("thead",null,t.a.createElement("tr",null,t.a.createElement("th",{align:"left"},"libraryTarget"),t.a.createElement("th",{align:"left"},"\u4f7f\u7528\u8005\u7684\u5f15\u5165\u65b9\u5f0f"),t.a.createElement("th",{align:"left"},"\u4f7f\u7528\u8005\u63d0\u4f9b\u7ed9\u88ab\u4f7f\u7528\u8005\u7684\u6a21\u5757\u7684\u65b9\u5f0f"))),t.a.createElement("tbody",null,t.a.createElement("tr",null,t.a.createElement("td",{align:"left"},"* var\uff0c\u9ed8\u8ba4"),t.a.createElement("td",{align:"left"},"\u53ea\u80fd\u4ee5 script \u6807\u7b7e"),t.a.createElement("td",{align:"left"},"\u4ee5\u5168\u5c40\u53d8\u91cf\u7684\u5f62\u5f0f\u4f7f\u7528")),t.a.createElement("tr",null,t.a.createElement("td",{align:"left"},"* commonjs"),t.a.createElement("td",{align:"left"},"\u53ea\u80fd\u6309\u7167 commonjs \u89c4\u8303"),t.a.createElement("td",{align:"left"},"\u6309\u7167 commonjs \u89c4\u8303\u5f15\u5165\uff0c\u65e0\u6cd5\u76f4\u63a5\u5728\u6d4f\u89c8\u5668\u4e2d\u4f7f\u7528")),t.a.createElement("tr",null,t.a.createElement("td",{align:"left"},"..."),t.a.createElement("td",{align:"left"}),t.a.createElement("td",{align:"left"})))),t.a.createElement("p",null,t.a.createElement("em",null,"libraryTarget \u8bbe\u7f6e this\uff0cwindow\uff0cglobal\uff0c\u6302\u8f7d\u5230\u8fd9\u4e9b\u5bf9\u8c61\u4e0a"))),t.a.createElement("li",null,t.a.createElement("p",null,t.a.createElement("code",null,"libraryExport"),"\uff0c\u914d\u7f6e\u5bfc\u51fa\u7684\u5b50\u6a21\u5757"),t.a.createElement("p",null,"\u53ea\u6709 libraryTarget \u88ab\u8bbe\u4e3a commonjs \u6216 commonjs2 \u624d\u6709\u610f\u4e49"))),t.a.createElement("h2",{id:"dll-\u52a8\u6001\u94fe\u63a5\u5e93"},t.a.createElement(r["AnchorLink"],{to:"#dll-\u52a8\u6001\u94fe\u63a5\u5e93","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"DLL \u52a8\u6001\u94fe\u63a5\u5e93"),t.a.createElement("ul",null,t.a.createElement("li",null,"DllPlugin\uff1a\u7528\u4e8e\u6253\u5305\u51fa\u4e00\u4e2a\u52a8\u6001\u94fe\u63a5\u5e93"),t.a.createElement("li",null,"DllReferencePlugin\uff1a\u5728\u914d\u7f6e\u6587\u4ef6\u4e2d\u5f15\u5165 DllPlugin \u6253\u5305\u597d\u7684\u52a8\u6001\u94fe\u63a5\u5e93"),t.a.createElement("li",null,"AutdllWebpackPlugin\uff1a\u4e0d\u7528\u914d\u7f6e\u4e24\u4efd\u914d\u7f6e\u6587\u4ef6\u4e86\uff0c\u76f4\u63a5\u5728 webpack.config.js \u4e2d\u6dfb\u52a0\u6b64\u63d2\u4ef6\u5c31\u53ef\u4ee5\u81ea\u52a8\u5b8c\u6210\u52a8\u6001\u94fe\u63a5\u5e93\u7684\u6253\u5305\u548c\u4f7f\u7528")),t.a.createElement("p",null,"\u6253\u5305\u52a8\u6001\u94fe\u63a5\u5e93"),t.a.createElement("p",null,"webpack.dll.config.js"),t.a.createElement(i["a"],{code:"const path = require('path');\n\nconst DllPlugin = require('webpack/lib/DllPlugin');\nmodule.exports = {\n    mode: 'development',\n    entry: {\n        react: ['react', 'react-dom'] // \u53ef\u4ee5\u914d\u591a\u4e2a dll\uff0c\u4e14\u5fc5\u987b\u662f\u6570\u7ec4\u5f62\u5f0f\n    },\n    output: {\n        path: path.resolve(__dirname, 'dist'),\n       \tfilename: '[name].dll.js',\n        library: '_dll_[name]'\n\t},\n    plugins: [\n        new DllPlugin({\n            name: '_dll_[name]',\n            path: path.join(__dirname, 'dist', '[name].manifest.json')\n        })\n    ]\n}",lang:"js"}),t.a.createElement("p",null,"\u4f7f\u7528\u52a8\u6001\u94fe\u63a5\u5e93"),t.a.createElement("p",null,"webpack.config.js"),t.a.createElement(i["a"],{code:"const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');\n\nmodule.exports = {\n    ...\n    plugins: [\n        new DllReferencePlugin({\n            manifest: require('./dist/react.manifest.json')\n        })\n    ]\n}",lang:"js"}),t.a.createElement("p",null,"\u4e00\u4e2a\u914d\u7f6e\u6587\u4ef6\u641e\u5b9a Dll"),t.a.createElement("p",null,"webpack.config.js"),t.a.createElement(i["a"],{code:"const path = require('path');\nconst AutodllWebpackPlugin = require('autodll-webpack-plugin');\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\n\nmodule.exports = {\n    mode: 'development',\n    devtool: false,\n    entry: './src/index.js',\n    output: {\n        path: path.resolve(__dirname, 'dist'),\n        filename: 'bundle.js',\n        publicPath: ''\n    },\n    plugins: [\n        new HtmlWebpackPlugin({ // \u5982\u679c\u914d\u7f6e\u4e86\u8fd9\u4e2a\u63d2\u4ef6\uff0cdll \u52a8\u6001\u94fe\u63a5\u5e93\u4e5f\u4f1a\u81ea\u52a8\u88ab\u6dfb\u52a0\u5230 index.html \u4e2d\u53bb\n            inject: true,\n            template: './src/index.html'\n        }),\n        new AutodllWebpackPlugin({\n            inject: true,\n            filename: '[name].dll.js',\n            entry: {\n            \treact: ['react', 'react-dom']    \n            }\n        })\n    ]\n}",lang:"js"}),t.a.createElement("h2",{id:"\u53bb\u9664\u672a\u4f7f\u7528-css"},t.a.createElement(r["AnchorLink"],{to:"#\u53bb\u9664\u672a\u4f7f\u7528-css","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u53bb\u9664\u672a\u4f7f\u7528 css"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("p",null,t.a.createElement("code",null,"purgecss-webpack-plugin"),"\u548c",t.a.createElement("code",null,"mini-css-extract-plugin"),"\uff0c\u4e0e ",t.a.createElement("code",null,"glob"),"\u3001",t.a.createElement("code",null,"glob-all")," \u914d\u5408\u4f7f\u7528"),t.a.createElement(i["a"],{code:"const glob = require('glob');\nconst PurgecssWebpackPlugin = require('purgecss-webpack-plugin');\nconst MiniCssExtractPlugin = require('mini-css-extract-plugin');\n\nmodule.exports = {\n    ...\n    module: {\n        rules: [\n            {\n                test: /\\.css$/,\n                include: path.resolve(__dirname, 'src'),\n                exclude: /node_modules/,\n                use: [\n                    {\n                        loader: MiniCssExtractPlugin.loader\n                    },\n                    'css-loader'\n                ]\n            }\n        ]\n    },\n    plugins:[\n        new HtmlWebpackPlugin({\n            template: './src/index.html'\n        }),\n        new MiniCssExtractPlugin({\n            filename: '[name].css'\n        }),\n        new PurgecssWebpackPlugin({\n            paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*`)\n        })\n    ]\n}",lang:"js"}))),t.a.createElement("h2",{id:"polyfill"},t.a.createElement(r["AnchorLink"],{to:"#polyfill","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"polyfill"),t.a.createElement("ul",null,t.a.createElement("li",null,"require('babel-polyfill')\uff0c\u5b98\u7f51\u5df2\u4e0d\u63a8\u8350\u4f7f\u7528")),t.a.createElement("blockquote",null,t.a.createElement("p",null,"polyfill-service")),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("p",null,"polyfill-service\uff0c\u6839\u636e\u6d4f\u89c8\u5668\u7248\u672c\u8fd4\u56de polyfll \u57ab\u7247\u4ee3\u7801\u65ad"),t.a.createElement(i["a"],{code:'<script src="https://polyfill.io/v3/polyfill.min.js"><\/script>',lang:"html"}))),t.a.createElement("blockquote",null,t.a.createElement("p",null,"babel\uff0cpolyfill\uff0ccore-js")),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("p",null,"babel-loader")),t.a.createElement("li",null,t.a.createElement("p",null,"@babel/polyfill\uff0c",t.a.createElement("em",null,"\u52a1\u5f00\u53d1\u5e38\u7528")),t.a.createElement("p",null,"\u63d0\u4f9b\u4e86\u4f4e\u7248\u672c\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u7684 api\uff0c",t.a.createElement("strong",null,"\u6c61\u67d3\u5168\u5c40\u5bf9\u8c61")),t.a.createElement(i["a"],{code:"// \u65b9\u6cd5\u4e00\uff1a\nrequire('@babel/polyfill');\n// \u65b9\u6cd5\u4e8c\uff1a\nmodule.exports = {\n    ...\n    entry: {\n        polyfill: '@babel/polyfill',\n        main: './src/index.js'\n    },\n    ...\n}",lang:"js"})),t.a.createElement("li",null,t.a.createElement("p",null,"@babel/runtime\uff0c",t.a.createElement("em",null,"\u7ec4\u4ef6\u5e93\u5e38\u7528")),t.a.createElement("p",null,"\u5728\u9700\u8981\u4f7f\u7528\u7684\u5730\u65b9\u624b\u52a8 require\uff0c\u5176\u4e0b core-js \u5b9a\u4e49\u4e86\u5404\u79cd api \u7684\u517c\u5bb9\u4ee3\u7801\uff0c",t.a.createElement("strong",null,"\u907f\u514d\u4e86\u6c61\u67d3\u5168\u5c40\u5bf9\u8c61"),"\uff0c\u4f46\u662f\u9700\u8981\u81ea\u5df1\u4e00\u4e2a\u4e00\u4e2a\u5f15\u7528")),t.a.createElement("li",null,t.a.createElement("p",null,"@babel/plugin-transform-runtime"),t.a.createElement("p",null,"babel-loader \u7684\u63d2\u4ef6\uff0c",t.a.createElement("strong",null,"\u907f\u514d\u624b\u52a8\u5f15\u5165\uff0c\u5e76\u4e14\u53ef\u4ee5\u62bd\u79bb\u516c\u7528\u65b9\u6cd5")),t.a.createElement("p",null,"\u8fd8\u4e0d\u80fd\u8f6c\u6362 class \u8bed\u6cd5\uff0c\u9700\u8981\u914d\u5408@babel/preset-env \u4f7f\u7528"),t.a.createElement(i["a"],{code:'{\n    loader: "babel-loader",\n        options: {\n            "plugins": [\n                [\n                    "@babel/plugin-transform-runtime",\n                    {\n                        "corejs": 2, // \u817b\u5b50\u6a21\u5757\u3002\u81ea\u52a8\u5f15\u5165 babel-runtime/core-js\n                        "helpers": false, // \u63d0\u51fa\u516c\u7528\u65b9\u6cd5\u3002\u79fb\u9664\u5185\u8054 babel helpers\u5e76\u66ff\u6362\u4f7f\u7528babel-runtime/helpers \u6765\u66ff\u6362\n                        "regenerator": false // generator \u7684\u517c\u5bb9\u3002true \u5f00\u542f generator \u51fd\u6570\u8f6c\u4e3a\u6210\u4f7f\u7528 regenerator\n                    }\n                ]\n            ]\n        }\n}',lang:"js"})),t.a.createElement("li",null,t.a.createElement("p",null,"@babel/preset-env"),t.a.createElement("p",null,"\u901a\u8fc7\u5f00\u542f useBuiltIns \u6765\u8f6c\u5316 API \u548c\u5b9e\u4f8b\u65b9\u6cd5\u3002\u6839\u636e\u7279\u5b9a\u7684\u73af\u5883\u5f15\u5165 polyfill"),t.a.createElement("ul",null,t.a.createElement("li",null,"ES \u8bed\u6cd5\uff0c\u5982\u7bad\u5934\u51fd\u6570"),t.a.createElement("li",null,"ES API\uff0c\u5982 Promise"),t.a.createElement("li",null,"ES \u5b9e\u4f8b\u65b9\u6cd5\uff0c\u5982 String.prototype.includes")),t.a.createElement(i["a"],{code:'{\n    loader: "babel-loader",\n        options: {\n            "presets": [\n                [\n                    "@babel/preset-env",\n                    {\n                        "useBuiltIns": "usage", // \u662f\u5426\u4f7f\u7528\u817b\u5b50\u6a21\u5757\uff0cfalse\uff08\u4e0d\u4f7f\u7528\uff09\uff0cusage\uff08\u6309\u9700\u52a0\u8f7d\uff09\uff0centry\uff08\u53e6\u5916\u52a0\u4e00\u4e2a\u5165\u53e3\u6587\u4ef6\uff09\n                        "corejs": { version: 2 },\n                        "targets": {\n                            "node": "current", // \u5f53\u524d\u7248\u672c\n                            "chrome": 52, // \u8c37\u6b4c 52 \u7248\u672c\n                            "browsers": ["last 2 versions", "safari 7"] // \u6d4f\u89c8\u5668\u5217\u8868\n                        }\n                    }\n                ]\n            ]\n        }\n}',lang:"js"}))),t.a.createElement("h2",{id:"\u591a\u7ebf\u7a0b\u8fdb\u884c\u7f16\u8bd1"},t.a.createElement(r["AnchorLink"],{to:"#\u591a\u7ebf\u7a0b\u8fdb\u884c\u7f16\u8bd1","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u591a\u7ebf\u7a0b\u8fdb\u884c\u7f16\u8bd1"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("p",null,"\u591a\u7ebf\u7a0b\u5904\u7406 loader\uff0cthread-loader"),t.a.createElement(i["a"],{code:"{\n    loader: 'thread-loader',\n    options: [\n\t\tworker: 3\n    ]\n}",lang:"js"}))),t.a.createElement("h2",{id:"\u6447\u6811tree-shaking"},t.a.createElement(r["AnchorLink"],{to:"#\u6447\u6811tree-shaking","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u6447\u6811\uff08tree shaking\uff09"),t.a.createElement("p",null,"\u53ea\u80fd\u751f\u4ea7\u6a21\u5f0f\u4e0b\uff0c\u53ea\u80fd\u6447 ES6 Module \u7684\u4ee3\u7801\uff0cCommonjs \u4e0d\u53ef\u4ee5\uff0c\u4ee5\u4e0b\u56db\u79cd\u60c5\u51b5\u90fd\u4f1a\u88ab\u6447\u6389\uff1a"),t.a.createElement("ul",null,t.a.createElement("li",null,"\u6ca1\u6709\u88ab\u5bfc\u5165\u4f7f\u7528"),t.a.createElement("li",null,"\u4ee3\u7801\u4e0d\u53ef\u8fbe\uff0c\u4e0d\u4f1a\u88ab\u6267\u884c\u7684\u4ee3\u7801"),t.a.createElement("li",null,"\u4ee3\u7801\u7684\u8fd4\u56de\u503c\u6ca1\u6709\u88ab\u4f7f\u7528"),t.a.createElement("li",null,"\u90a3\u4e9b\u53ea\u5199\u4e0d\u8bfb\u7684\u53d8\u91cf")),t.a.createElement("h2",{id:"\u4ee3\u7801\u5206\u5272\u591a\u5165\u53e3"},t.a.createElement(r["AnchorLink"],{to:"#\u4ee3\u7801\u5206\u5272\u591a\u5165\u53e3","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u4ee3\u7801\u5206\u5272\uff08\u591a\u5165\u53e3\uff09"),t.a.createElement("h3",{id:"\u5165\u53e3\u70b9\u5206\u5272"},t.a.createElement(r["AnchorLink"],{to:"#\u5165\u53e3\u70b9\u5206\u5272","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u5165\u53e3\u70b9\u5206\u5272"),t.a.createElement("ul",null,t.a.createElement("li",null,"\u91cd\u590d\u6a21\u5757\u540c\u6837\u4f1a\u88ab\u6253\u5305"),t.a.createElement("li",null,"\u4e0d\u7075\u6d3b\uff0c\u5e76\u4e0d\u80fd\u62c6\u5206\u6838\u5fc3\u4ee3\u7801")),t.a.createElement("h3",{id:"\u52a8\u6001\u5bfc\u5165\u548c\u61d2\u52a0\u8f7d"},t.a.createElement(r["AnchorLink"],{to:"#\u52a8\u6001\u5bfc\u5165\u548c\u61d2\u52a0\u8f7d","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u52a8\u6001\u5bfc\u5165\u548c\u61d2\u52a0\u8f7d"),t.a.createElement("ul",null,t.a.createElement("li",null,"import \u8bed\u6cd5"),t.a.createElement("li",null,"\u6bd4\u5982\u8def\u7531\u8df3\u8f6c\u7684\u65f6\u5019\u624d\u6309\u9700\u52a0\u8f7d")),t.a.createElement("h4",{id:"\u6309\u9700\u52a0\u8f7d"},t.a.createElement(r["AnchorLink"],{to:"#\u6309\u9700\u52a0\u8f7d","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u6309\u9700\u52a0\u8f7d"),t.a.createElement("ul",null,t.a.createElement("li",null,"\u5982\u4f55\u5728 react \u9879\u76ee\u4e2d\u5b9e\u73b0\u6309\u9700\u52a0\u8f7d\uff1f",t.a.createElement("ul",null,t.a.createElement("li",null,"React.lazy \u61d2\u52a0\u8f7d\u7ec4\u4ef6"),t.a.createElement("li",null,"Suspense \u7ec4\u4ef6\uff1a\u7ec4\u4ef6\u672a\u52a0\u8f7d\u51fa\u6765\u4e4b\u524d\uff0c\u53ef\u4ee5\u901a\u8fc7\u914d\u7f6e fallback \u5c5e\u6027\u6765\u6307\u5b9a loading \u7ec4\u4ef6"))))),t.a.createElement(c["default"],n["webpack\u4f18\u5316-demo"].previewerProps,t.a.createElement(a,null)),t.a.createElement("div",{className:"markdown"},t.a.createElement("h4",{id:"\u9884\u5148\u62c9\u53d6\u9884\u5148\u52a0\u8f7d"},t.a.createElement(r["AnchorLink"],{to:"#\u9884\u5148\u62c9\u53d6\u9884\u5148\u52a0\u8f7d","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u9884\u5148\u62c9\u53d6/\u9884\u5148\u52a0\u8f7d"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("p",null,"prefetch"),t.a.createElement("p",null,"\u6d4f\u89c8\u5668\u7a7a\u95f2\u65f6\u62c9\u53d6"))),t.a.createElement(i["a"],{code:"import(\n    './utils.js'\n    /* webpackPrefetch: true */\n    /* webpackChunkName: 'utils' */\n)",lang:"js"}),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("p",null,"preload"),t.a.createElement("p",null,"\u8d44\u6e90\u4f18\u5148\u4e0b\u8f7d\uff0c\u5f02\u6b65 chunk \u548c\u7236\u7ea7 chunk \u5e76\u884c\u52a0\u8f7d\u3002\u5982\u679c\u7236\u7ea7 chunk \u5148\u4e0b\u8f7d\u597d\uff0c\u9875\u9762\u4f1a\u5148\u663e\u793a\uff0c\u4f46\u540c\u65f6\u4f1a\u7b49\u5f85\u5f02\u6b65 chunk \u7684\u4e0b\u8f7d"))),t.a.createElement(i["a"],{code:"import(\n    './utils.js'\n    /* webpackPreload: true */\n    /* webpackChunkName: 'utils' */\n)",lang:"js"}),t.a.createElement("h2",{id:"\u63d0\u53d6\u516c\u5171\u4ee3\u7801"},t.a.createElement(r["AnchorLink"],{to:"#\u63d0\u53d6\u516c\u5171\u4ee3\u7801","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u63d0\u53d6\u516c\u5171\u4ee3\u7801"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("p",null,"\u7b2c\u4e09\u65b9\u6a21\u5757 vendors")),t.a.createElement("li",null,t.a.createElement("p",null,"\u516c\u5171\u6a21\u5757 commons"),t.a.createElement(i["a"],{code:'optimization: {\n        splitChunks: {\n            chunks: "all",// \u9ed8\u8ba4\u4f5c\u7528\u4e8e\u5f02\u6b65 chunk\uff0c\u503c\u4e3a all\uff08\u5168\u5e94\u7528\uff09/initial\uff08\u521d\u59cb/\u540c\u6b65\u6a21\u5757\uff09/async\uff08import/\u5f02\u6b65\u6a21\u5757\uff09\n            minSize: 30000,  // ****\u6700\u5c0f\u5c3a\u5bf8\uff0c\u5c0f\u4e8e\u8fd9\u4e2a\u503c\u5219\u4e0d\u5206\u5272\n            minChunks: 1,  // ****\u6700\u5c0f\u5f15\u7528\u6570\uff0c\u5c0f\u4e8e\u8fd9\u4e2a\u503c\u5219\u4e0d\u5206\u5272\n            maxAsyncRequests: 5,  // ****\u914d\u7f6e\u6309\u9700\u52a0\u8f7d\u5f02\u6b65\u6a21\u5757\u4e00\u6b21\u6700\u5927\u8bf7\u6c42\u6570\u91cf\n            maxInitialRequests: 3,  // ****\u5165\u53e3\u6a21\u5757\u6700\u5927\u540c\u6b65\u4e00\u6b21\u6700\u5927\u8bf7\u6c42\u6570\u91cf\n            name: true,  // ****\u6253\u5305\u540e\u7684\u540d\u79f0\uff0c\u9ed8\u8ba4\u662f chunk \u7684\u540d\u5b57\u901a\u8fc7\u5206\u9694\u7b26\uff08\u9ed8\u8ba4\u662f\uff5e\uff09\u5206\u9694\u5f00\uff0c\u5982 vendor~\uff0c\n            automaticNameDelimiter: \'~\',// ****\u5206\u9694\u7b26\n            cacheGroups: { //\u8bbe\u7f6e\u7f13\u5b58\u7ec4\u7528\u6765\u62bd\u53d6\u6ee1\u8db3\u4e0d\u540c\u89c4\u5219\u7684 chunk\uff0c\u4e0b\u9762\u4ee5\u751f\u6210 common \u4e3a\u4f8b\n                vendors: { // ****\u7b2c\u4e09\u65b9\u6a21\u5757\n                    chunks: "initial",\n                    test: /node_modules/, // ****\u7b5b\u9009\u6761\u4ef6\n                    priority: -10 /// ****\u6ee1\u8db3\u591a\u4e2a\u914d\u7f6e\u7f13\u5b58\u7ec4\u65f6\uff0c\u91c7\u53d6\u4f18\u5148\u7ea7\u6570\u503c\u5927\u7684\n                },\n                commons: { // ****\u81ea\u5b9a\u4e49\u6a21\u5757\n                    chunks: "initial",\n                    minSize: 0,\n                    minChunks: 2,\n                    priority: -20,\n                    reuseExistingChunk: true// ****\u8bbe\u7f6e true\uff0c\u907f\u514d chunk \u5df2\u88ab\u62bd\u79bb\u4ecd\u91cd\u590d\u6253\u5305\uff0c\u4f18\u5316\u6253\u5305\u901f\u5ea6\n                }\n            }\n        },\n}',lang:"js"}))),t.a.createElement("h2",{id:"\u4f5c\u7528\u57df\u63d0\u5347"},t.a.createElement(r["AnchorLink"],{to:"#\u4f5c\u7528\u57df\u63d0\u5347","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u4f5c\u7528\u57df\u63d0\u5347"),t.a.createElement("ul",null,t.a.createElement("li",null,"\u5c06\u6240\u6709\u7684\u6a21\u5757\u6309\u7167\u5f15\u7528\u987a\u5e8f\u653e\u5728\u4e00\u4e2a\u51fd\u6570\u4f5c\u7528\u57df\u91cc\uff0c\u7136\u540e\u9002\u5f53\u5730\u91cd\u547d\u540d\u4e00\u4e9b\u53d8\u91cf\u4ee5\u9632\u6b62\u547d\u540d\u51b2\u7a81"),t.a.createElement("li",null,"production \u6a21\u5f0f\u4e0b\u9ed8\u8ba4\u5f00\u542f"),t.a.createElement("li",null,"\u53ea\u6709 es \u6a21\u5757\uff0ccommonJs \u6a21\u5757\u4e0d\u652f\u6301")),t.a.createElement("h2",{id:"\u5f00\u542f\u7f13\u5b58\u4f18\u5316\u6784\u5efa\u901f\u5ea6"},t.a.createElement(r["AnchorLink"],{to:"#\u5f00\u542f\u7f13\u5b58\u4f18\u5316\u6784\u5efa\u901f\u5ea6","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"\u5f00\u542f\u7f13\u5b58\uff0c\u4f18\u5316\u6784\u5efa\u901f\u5ea6"),t.a.createElement("ul",null,t.a.createElement("li",null,t.a.createElement("p",null,"babel-loader\uff0coptions:","{","cacheDirectory: true","}")),t.a.createElement("li",null,t.a.createElement("p",null,"cache-loader\uff0c\u518d\u9700\u8981\u7f13\u5b58\u7684 loader \u524d\u6dfb\u52a0")),t.a.createElement("li",null,t.a.createElement("p",null,"hard-source-webpack-plugin\uff0c\u63d2\u4ef6")),t.a.createElement("li",null,t.a.createElement("p",null,"oneOf"),t.a.createElement("p",null,"\u5728 rules \u5c5e\u6027\u4e2d\u914d\u7f6e oneOf: [...,","{","}",",","{","}","]\uff0c\u5728\u904d\u5386\u89c4\u5219\u7684\u65f6\u5019\uff0c\u53ea\u8981\u5339\u914d\u5230\u4e00\u4e2a\u5c31\u4f1a\u9000\u51fa"))))))}));n["default"]=e=>{var n=t.a.useContext(r["context"]),l=n.demos;return t.a.useEffect((()=>{var n;null!==e&&void 0!==e&&null!==(n=e.location)&&void 0!==n&&n.hash&&r["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),t.a.createElement(m,{demos:l})}},MZF8:function(e,n,l){"use strict";var a=l("ogwx");l.d(n,"a",(function(){return a["b"]}));l("VCU9")},PtHo:function(e,n,l){e.exports=l.p+"static/speed-measure-webpack-plugin \u6253\u5305\u8017\u65f6.ce79fe30.png"},tkuz:function(e,n,l){}}]);