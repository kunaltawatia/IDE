(this.webpackJsonppclub=this.webpackJsonppclub||[]).push([[0],{10:function(e,t,n){},11:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var c=n(0),u=n(1),r=n.n(u),l=n(4),i=n.n(l),o=(n(10),n(3));n(11);var a=function(){var e=Object(u.useState)(""),t=Object(o.a)(e,2),n=t[0],r=t[1],l=Object(u.useState)(!1),i=Object(o.a)(l,2),a=i[0],s=i[1],j=Object(u.useRef)(null),d=Object(u.useRef)(null),b=Object(u.useRef)(null);return Object(c.jsxs)("div",{className:"container",children:[Object(c.jsx)("span",{children:"Code:"}),Object(c.jsx)("textarea",{id:"code",ref:j,placeholder:"Code",defaultValue:"print('Hello World!')"}),Object(c.jsx)("span",{children:"Input:"}),Object(c.jsx)("textarea",{id:"input",ref:d,placeholder:"Input"}),Object(c.jsxs)("select",{id:"lang",ref:b,children:[Object(c.jsx)("option",{value:"py",children:"Python 3.6.8"}),Object(c.jsx)("option",{value:"cpp",children:"C++ 14"}),Object(c.jsx)("option",{value:"c",children:"C"})]}),a?Object(c.jsx)("p",{children:"Loading"}):Object(c.jsx)("button",{onClick:function(){s(!0),fetch("/",{method:"POST",body:JSON.stringify({code:j.current.value,input:d.current.value,lang:b.current.value})}).then((function(e){return e.text()})).then((function(e){r(e)})).catch((function(e){return console.error(e)})).finally((function(){return s(!1)}))},children:"Submit"}),Object(c.jsx)("span",{children:"Output:"}),Object(c.jsx)("textarea",{id:"output",value:n,readOnly:!0,placeholder:"Output"})]})},s=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,13)).then((function(t){var n=t.getCLS,c=t.getFID,u=t.getFCP,r=t.getLCP,l=t.getTTFB;n(e),c(e),u(e),r(e),l(e)}))};i.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(a,{})}),document.getElementById("root")),s()}},[[12,1,2]]]);
//# sourceMappingURL=main.db3c6758.chunk.js.map