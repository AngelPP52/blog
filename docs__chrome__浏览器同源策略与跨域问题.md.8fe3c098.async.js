(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{T4Kx:function(e,l,n){"use strict";n.r(l);var t=n("ahKI"),a=n.n(t),c=n("s8Wh"),o=n("Fesk"),r=a.a.memo((e=>{e.demos;return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"markdown"},a.a.createElement("p",null,"\u540c\u6e90\u7b56\u7565\u6709\u52a9\u4e8e\u963b\u9694\u6076\u610f\u6587\u6863\uff0c\u51cf\u5c11\u53ef\u80fd\u88ab\u653b\u51fb\u7684\u5a92\u4ecb\u3002"),a.a.createElement("p",null,"\u540c\u6e90\u7b56\u7565\u6307\u7684\u662f\uff1a\u534f\u8bae+\u57df\u540d+\u7aef\u53e3\uff0c\u4e09\u8005\u7686\u76f8\u540c\uff0c\u624d\u662f\u540c\u4e00\u4e2a\u57df\uff0c\u5426\u5219\u90fd\u662f\u8de8\u57df\u3002"),a.a.createElement("p",null,"\u4e3a\u4ec0\u4e48\u8981\u6709\u540c\u6e90\u7b56\u7565\uff1f"),a.a.createElement("ul",null,a.a.createElement("li",null,"\u9632\u6b62\u70b9\u51fb\u7b2c\u4e09\u65b9\u7f51\u7ad9\uff0c\u5e76\u4e14\u5c06\u5305\u542b\u767b\u5f55\u4fe1\u606f\u7684cookie\u66b4\u9732\u51fa\u53bb"),a.a.createElement("li",null,"\u9632\u6b62\u7b2c\u4e09\u65b9\u7f51\u7ad9\uff0c\u901a\u8fc7",a.a.createElement("code",null,"iframe"),"\u53ef\u4ee5\u62ff\u5230\u4f60\u7f51\u7ad9\u7684\u771f\u5b9edom\uff0c\u8fdb\u884c\u64cd\u4f5c")),a.a.createElement("p",null,"\u89e3\u51b3\u8de8\u57df\u95ee\u9898\u7684\u65b9\u6848\uff1a"),a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement("strong",null,"jsonp"))),a.a.createElement("p",null,"\u539f\u7406\uff1a\u901a\u8fc7\u52a8\u6001\u521b\u5efa\u4e00\u4e2a",a.a.createElement("code",null,"<script>"),"\u5143\u7d20\uff0c\u5411\u670d\u52a1\u5668\u53d1\u9001\u8bf7\u6c42\uff0c\u8bf7\u6c42\u5730\u5740\u540e\u9762\u5e26\u4e0a",a.a.createElement("code",null,"?callback=xxx"),"\uff08\u8868\u793a\u8bf7\u6c42\u5b8c\u6210\u540e\u7684\u56de\u8c03\uff09\uff0c\u5e76\u4e14\u56de\u8c03\u7684\u53c2\u6570\u662fJSON\u5f62\u5f0f"),a.a.createElement(o["a"],{code:"function jsonp(url){\n    const script =document.createElement('script');\n\tscript.setArribute('type', 'text/javascript');\n    script.src = src;\n    document.body.appendChild(script);\n}\n\nwindow.onload = function(){\n    jsonp('localhost:8080/users?callback=foo');\n    function foo(data){\n\t\tconsole.log('users=', data)\n    }\n}",lang:"js"}),a.a.createElement("blockquote",null,a.a.createElement("ol",null,a.a.createElement("li",null,"\u5b58\u5728\u5b89\u5168\u6027\u7684\u95ee\u9898\uff0c\u9700\u8981\u7f51\u7ad9\u53cc\u65b9\u534f\u5546token\u7b49\u8eab\u4efd\u8ba4\u8bc1"),a.a.createElement("li",null,"\u53ea\u80fdget\uff0c\u4e0d\u80fdpost"),a.a.createElement("li",null,"\u53ef\u80fd\u56e0\u6b64\u88ab\u6ce8\u5165\u6076\u610f\u4ee3\u7801\uff08\u5e94\u91c7\u7528\u5b57\u7b26\u4e32\u8fc7\u6ee4\uff09"))),a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement("strong",null,"cors"))),a.a.createElement("p",null,"\u5c5e\u4e8e\u4e00\u79cdW3C\u6807\u51c6\uff0c\u201c\u8de8\u57df\u8d44\u6e90\u5171\u4eab\u201d\uff0c\u5b83\u53ef\u4ee5\u6307\u5b9a\u54ea\u4e9b\u57df\u540d\u548c\u54ea\u4e9b\u81ea\u5b9a\u4e49\u8bf7\u6c42\u5934\u88ab\u5141\u8bb8\u8de8\u57df\u8bbf\u95ee\u3002\u9700\u8981\u540e\u53f0\u4ee3\u7801\u7684\u914d\u5408\uff1a"),a.a.createElement("p",null,a.a.createElement("code",null,"Access-Control-Allow-Origin")," - \u88ab\u5141\u8bb8\u7684\u57df\u540d"),a.a.createElement("p",null,a.a.createElement("code",null,"Access-Control-Allow-Headers")," - \u88ab\u5141\u8bb8\u7684\u8bf7\u6c42\u5934"),a.a.createElement("p",null,a.a.createElement("code",null,"Access-Control-Allow-Methods")," - \u88ab\u5141\u8bb8\u7684\u8bf7\u6c42\u65b9\u6cd5"),a.a.createElement("p",null,a.a.createElement("code",null,"Access-Control-Max-Age")," - options\u8bf7\u6c42\u6700\u5927\u5b58\u6d3b\u65f6\u95f4\uff08\u4e00\u5b9a\u65f6\u95f4\u5185\u4e0d\u518d\u53d1\u9884\u68c0\u8bf7\u6c42\uff09"),a.a.createElement("p",null,"\u4e00\u822c\u662f\u5728\u9884\u68c0\u8bf7\u6c42\u9636\u6bb5\uff0c\u5e26\u4e0a\u8fd9\u4e9b\u5b57\u6bb5\uff1a",a.a.createElement("code",null,"Access-Control-Request-Headers"),"\uff0c",a.a.createElement("code",null,"Access-Control-Request-Method"),"\uff0c\u670d\u52a1\u5668\u624d\u80fd\u5224\u65ad\u8fd9\u4e2a\u8bf7\u6c42\u662f\u5426\u5141\u8bb8\u8de8\u57df"),a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement("strong",null,"nginx\u4ee3\u7406\u8f6c\u53d1")),a.a.createElement("li",null,a.a.createElement("strong",null,"nodejs\u4e2d\u95f4\u4ef6\u4ee3\u7406\u8de8\u57df")),a.a.createElement("li",null,a.a.createElement("strong",null,"document.domain + iframe"))),a.a.createElement("blockquote",null,a.a.createElement("p",null,"\u4f7f\u7528",a.a.createElement("code",null,"document.domain"),"\u6765\u5141\u8bb8\u5b50\u57df\u5b89\u5168\u8bbf\u95ee\u7236\u57df\u65f6\uff0c\u9700\u8981\u7236\u57df\u548c\u5b50\u57df\u8bbe\u7f6e\u76f8\u540c\u7684\u503c\u3002",a.a.createElement("strong",null,"\u53ea\u662f\u8bbe\u7f6e\u4e00\u4e2a\u90fd\u53ef\u80fd\u4f1a\u5bfc\u81f4\u6743\u9650\u9519\u8bef"),"\u3002")),a.a.createElement("p",null,"\u540c\u6e90\u7b56\u7565\uff0c\u9664\u4e86\u9650\u5236\u4e86ajax\u8bf7\u6c42\uff0c\u8fd8\u9650\u5236\u4e86\u6d4f\u89c8\u5668\u4e2d\u4e0d\u540c\u57df\u7684\u6846\u67b6\u4e4b\u95f4\u8fdb\u884cjs\u4ea4\u4e92\u3002"),a.a.createElement("p",null,"\u5c3d\u7ba1\u6211\u4eec\u80fd\u591f\u62ff\u5230\u4e0d\u540c\u6846\u67b6\u4e4b\u95f4\u5f7c\u6b64\u7684window\u5bf9\u8c61\uff0c\u4f46\u662f\u5374\u4e0d\u80fd\u83b7\u53d6window\u5bf9\u8c61\u7684\u5c5e\u6027\u548c\u65b9\u6cd5\uff08postMessage\u9664\u5916\uff09"),a.a.createElement("p",null,a.a.createElement("strong",null,"\u6848\u4f8b"),"\uff1a\u9875\u9762\u4e2d\u7684iframe\u6846\u67b6\uff08src\u5c5e\u6027\u5c31\u662f\u5b83\u7684\u5730\u5740\uff09\uff0c\u6211\u4eec\u65e0\u6cd5\u901a\u8fc7js\u6765\u83b7\u53d6iframe\u4e2d\u7684\u4e1c\u897f"),a.a.createElement("p",null,a.a.createElement("strong",null,"\u89e3\u51b3\u601d\u8def"),"\uff1a\u5c06\u8fd9\u4e24\u4e2a\u9875\u9762\u7684document.domain\u8bbe\u6210\u76f8\u540c\u7684\u57df\u540d\u3002\u9700\u8981\u6ce8\u610f\u7684\u662f\uff0cdocument.domain\u53ea\u80fd\u8bbe\u7f6e\u6210\u81ea\u8eab\u6216\u66f4\u9ad8\u4e00\u7ea7\u7684\u7236\u57df\u3002\uff08a.b.example.com\uff0c\u53ef\u4ee5\u8bbe\u6210b.example.com\uff0cexample.com\u7b49\uff0c\u4f46\u4e0d\u80fd\u8bbe\u6210c.a.b.example.com\u5b50\u57df\u6216\u8005baidu.com\u8fd9\u79cd\u4e0d\u540c\u4e3b\u57df\u7684\u503c\uff09"),a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement("strong",null,"document.name + iframe"))),a.a.createElement("p",null,"\u540c\u4e00\u4e2a\u7a97\u53e3\uff08window\uff09\u7684\u751f\u547d\u5468\u671f\u5185\uff0c\u7a97\u53e3\u8f7d\u5165\u7684\u6240\u6709\u9875\u9762\u90fd\u5171\u4eab\u4e00\u4e2awindow.name"),a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement("p",null,a.a.createElement("strong",null,"localtion.hash + iframe"))),a.a.createElement("li",null,a.a.createElement("p",null,a.a.createElement("strong",null,"postMessage")))),a.a.createElement("p",null,"\u4e0edocument.domain\u7c7b\u4f3c\uff0c\u90fd\u662f\u4e0d\u540c\u57df\u67b6\u6784\u4e4b\u95f4\u4ea4\u4e92\u3002"),a.a.createElement("p",null,"\u53d1\u9001\u6d88\u606f\u7684window\uff1a",a.a.createElement("code",null,"window.postMessage(message, targetOrigin)")),a.a.createElement("p",null,"\u63a5\u6536\u6d88\u606f\u7684window\uff1a",a.a.createElement("code",null,"window.message = fun() ","{","}"))))}));l["default"]=e=>{var l=a.a.useContext(c["context"]),n=l.demos;return a.a.useEffect((()=>{var l;null!==e&&void 0!==e&&null!==(l=e.location)&&void 0!==l&&l.hash&&c["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),a.a.createElement(r,{demos:n})}}}]);