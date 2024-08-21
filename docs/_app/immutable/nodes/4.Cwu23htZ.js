import{s as ee,e as C,j as L,t as H,S as ye,c as x,d as k,l as M,a as w,b as O,k as K,m as E,u as Y,f as p,i as R,T as _e,U as X,g as G,B as ve,n as $,y as ae,r as ge,o as Q,V as fe,W as Ee}from"../chunks/scheduler.DO63BBG_.js";import{S as te,i as ne,t as U,g as ce,e as ue,b as J,c as de,a as pe,m as he,d as me}from"../chunks/index.BUITNENa.js";import{e as Z}from"../chunks/each.D6YF6ztN.js";import{d as be}from"../chunks/transform.BkPUWS7r.js";import{b as ke}from"../chunks/paths.DnZqzNZ_.js";class Ce extends Map{constructor(e,s=Te){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:s}}),e!=null)for(const[t,i]of e)this.set(t,i)}get(e){return super.get(se(this,e))}has(e){return super.has(se(this,e))}set(e,s){return super.set(xe(this,e),s)}delete(e){return super.delete(ze(this,e))}}function se({_intern:n,_key:e},s){const t=e(s);return n.has(t)?n.get(t):s}function xe({_intern:n,_key:e},s){const t=e(s);return n.has(t)?n.get(t):(n.set(t,s),s)}function ze({_intern:n,_key:e},s){const t=e(s);return n.has(t)&&(s=n.get(t),n.delete(t)),s}function Te(n){return n!==null&&typeof n=="object"?n.valueOf():n}function Se(n){return n}function we(n,...e){return Le(n,Array.from,Se,e)}function Le(n,e,s,t){return function i(o,v){if(v>=t.length)return s(o);const y=new Ce,c=t[v++];let l=-1;for(const m of o){const r=c(m,++l,o),a=y.get(r);a?a.push(m):y.set(r,[m])}for(const[m,r]of y)y.set(m,i(r,v));return e(y)}(n,0)}async function Me(n){if("clipboard"in navigator)await navigator.clipboard.writeText(n);else{const e=document.createElement("input");e.type="text",e.disabled=!0,e.style.setProperty("position","fixed"),e.style.setProperty("z-index","-100"),e.style.setProperty("pointer-events","none"),e.style.setProperty("opacity","0"),e.value=n,document.body.appendChild(e),e.click(),e.select(),document.execCommand("copy"),document.body.removeChild(e)}}const Ie=(n,e)=>{async function s(){if(i)try{await Me(i),n.dispatchEvent(new CustomEvent("svelte-copy",{detail:i}))}catch(o){n.dispatchEvent(new CustomEvent("svelte-copy:error",{detail:o}))}}let t=typeof e=="string"?["click"]:[e.events].flat(1),i=typeof e=="string"?e:e.text;return t.forEach(o=>{n.addEventListener(o,s,!0)}),{update:o=>{const v=typeof o=="string"?["click"]:[o.events].flat(1),y=typeof o=="string"?o:o.text,c=v.filter(m=>!t.includes(m)),l=t.filter(m=>!v.includes(m));c.forEach(m=>{n.addEventListener(m,s,!0)}),l.forEach(m=>{n.removeEventListener(m,s,!0)}),t=v,i=y},destroy:()=>{t.forEach(o=>{n.removeEventListener(o,s,!0)})}}};function Pe(n){let e,s,t,i,o,v,y,c,l,m,r,a="CSS Snippet",h,g,N,I,B,T,S="Copy CSS to Clipboard",j,z,P,F,W;return{c(){e=C("link"),s=L(),t=C("div"),i=C("h3"),o=H(n[0]),v=L(),y=C("p"),c=H(n[1]),l=L(),m=C("details"),r=C("summary"),r.textContent=a,h=L(),g=C("code"),N=H(n[2]),I=L(),B=C("p"),T=C("button"),T.textContent=S,z=C("span"),P=H(n[3]),this.h()},l(b){const f=ye("svelte-1uevrx3",document.head);e=x(f,"LINK",{rel:!0,href:!0}),f.forEach(k),s=M(b),t=x(b,"DIV",{style:!0,class:!0});var A=w(t);i=x(A,"H3",{class:!0});var u=w(i);o=O(u,n[0]),u.forEach(k),v=M(A),y=x(A,"P",{});var _=w(y);c=O(_,n[1]),_.forEach(k),l=M(A),m=x(A,"DETAILS",{class:!0});var d=w(m);r=x(d,"SUMMARY",{class:!0,"data-svelte-h":!0}),K(r)!=="svelte-1p4cxwi"&&(r.textContent=a),h=M(d),g=x(d,"CODE",{class:!0});var D=w(g);N=O(D,n[2]),D.forEach(k),d.forEach(k),I=M(A),B=x(A,"P",{});var q=w(B);T=x(q,"BUTTON",{class:!0,"data-svelte-h":!0}),K(T)!=="svelte-v2s51m"&&(T.textContent=S),z=x(q,"SPAN",{class:!0});var V=w(z);P=O(V,n[3]),V.forEach(k),q.forEach(k),A.forEach(k),this.h()},h(){E(e,"rel","external stylesheet"),E(e,"href",n[5]),E(i,"class","svelte-19ry7n"),Y(y,"font-size",n[4]),E(r,"class","svelte-19ry7n"),E(g,"class","svelte-19ry7n"),E(m,"class","svelte-19ry7n"),E(T,"class","svelte-19ry7n"),E(z,"class","svelte-19ry7n"),Y(t,"font-family","'"+n[0]+"'"),E(t,"class","svelte-19ry7n")},m(b,f){p(document.head,e),R(b,s,f),R(b,t,f),p(t,i),p(i,o),p(t,v),p(t,y),p(y,c),p(t,l),p(t,m),p(m,r),p(m,h),p(m,g),p(g,N),p(t,I),p(t,B),p(B,T),p(B,z),p(z,P),F||(W=[_e(j=Ie.call(null,T,n[2])),X(T,"svelte-copy",n[6])],F=!0)},p(b,[f]){f&1&&G(o,b[0]),f&2&&G(c,b[1]),f&16&&Y(y,"font-size",b[4]),f&4&&G(N,b[2]),j&&ve(j.update)&&f&4&&j.update.call(null,b[2]),f&8&&G(P,b[3]),f&1&&Y(t,"font-family","'"+b[0]+"'")},i:$,o:$,d(b){b&&(k(s),k(t)),k(e),F=!1,ae(W)}}}function Ae(n,e,s){let t,{id:i=""}=e,{family:o=""}=e,{size:v=16}=e,{text:y}=e,c="",l="";const m=`${ke}/assets/demo/fonts/${i}.css`,r=()=>{s(3,l="Copied!"),setTimeout(()=>{s(3,l="")},1e3)};return ge(async()=>{const a=await fetch(m);s(2,c=await a.text())}),n.$$set=a=>{"id"in a&&s(7,i=a.id),"family"in a&&s(0,o=a.family),"size"in a&&s(8,v=a.size),"text"in a&&s(1,y=a.text)},n.$$.update=()=>{n.$$.dirty&256&&s(4,t=`${v}px`)},[o,y,c,l,t,m,r,i,v]}class De extends te{constructor(e){super(),ne(this,e,Ae,Pe,ee,{id:7,family:0,size:8,text:1})}}const Be=[{id:"atkinson",family:"Atkinson",type:"sans-serif"},{id:"atlas",family:"Atlas Grotesk",type:"sans-serif"},{id:"baloo-bhai",family:"Baloo Bhai",type:"sans-serif"},{id:"canela",family:"Canela",type:"serif"},{id:"computer-modern",family:"Computer Modern",type:"serif"},{id:"cozette",family:"Cozette",type:"other"},{id:"inter",family:"Inter",type:"sans-serif"},{id:"jamboree",family:"Jamboree",type:"other"},{id:"jersey",family:"Jersey M54",type:"other"},{id:"lyon",family:"Lyon Display",type:"serif"},{id:"metropolis",family:"Metropolis",type:"sans-serif"},{id:"national",family:"National 2 Web",type:"sans-serif"},{id:"publico",family:"Publico Text",type:"serif"},{id:"recoleta",family:"Recoleta",type:"serif"},{id:"rubik",family:"Rubik",type:"sans-serif"},{id:"inconsolata",family:"Inconsolata",type:"mono"},{id:"spacemono",family:"Space Mono",type:"mono"},{id:"tiempos",family:"Tiempos Text",type:"serif"}];function le(n,e,s){const t=n.slice();return t[5]=e[s][0],t[6]=e[s][1],t}function oe(n,e,s){const t=n.slice();return t[9]=e[s].family,t[10]=e[s].id,t}function re(n){let e,s;return e=new De({props:{id:n[10],family:n[9],size:n[0],text:n[1]}}),{c(){de(e.$$.fragment)},l(t){pe(e.$$.fragment,t)},m(t,i){he(e,t,i),s=!0},p(t,i){const o={};i&1&&(o.size=t[0]),i&2&&(o.text=t[1]),e.$set(o)},i(t){s||(U(e.$$.fragment,t),s=!0)},o(t){J(e.$$.fragment,t),s=!1},d(t){me(e,t)}}}function ie(n){let e,s=n[5]+"",t,i,o,v,y,c=Z(n[6]),l=[];for(let r=0;r<c.length;r+=1)l[r]=re(oe(n,c,r));const m=r=>J(l[r],1,1,()=>{l[r]=null});return{c(){e=C("h2"),t=H(s),i=L(),o=C("section");for(let r=0;r<l.length;r+=1)l[r].c();v=L(),this.h()},l(r){e=x(r,"H2",{});var a=w(e);t=O(a,s),a.forEach(k),i=M(r),o=x(r,"SECTION",{class:!0});var h=w(o);for(let g=0;g<l.length;g+=1)l[g].l(h);v=M(h),h.forEach(k),this.h()},h(){E(o,"class","svelte-1lzc8ku")},m(r,a){R(r,e,a),p(e,t),R(r,i,a),R(r,o,a);for(let h=0;h<l.length;h+=1)l[h]&&l[h].m(o,null);p(o,v),y=!0},p(r,a){if(a&7){c=Z(r[6]);let h;for(h=0;h<c.length;h+=1){const g=oe(r,c,h);l[h]?(l[h].p(g,a),U(l[h],1)):(l[h]=re(g),l[h].c(),U(l[h],1),l[h].m(o,v))}for(ce(),h=c.length;h<l.length;h+=1)m(h);ue()}},i(r){if(!y){for(let a=0;a<c.length;a+=1)U(l[a]);y=!0}},o(r){l=l.filter(Boolean);for(let a=0;a<l.length;a+=1)J(l[a]);y=!1},d(r){r&&(k(e),k(i),k(o)),fe(l,r)}}}function je(n){let e,s,t="Hosted Fonts on The Pudding",i,o,v="<em>Do not use fonts hosted by The Pudding without written permission.</em>",y,c,l,m,r,a,h,g,N,I,B="text sample",T,S,j,z,P,F,W,b=Z(n[2]),f=[];for(let u=0;u<b.length;u+=1)f[u]=ie(le(n,b,u));const A=u=>J(f[u],1,1,()=>{f[u]=null});return{c(){e=C("div"),s=C("h1"),s.textContent=t,i=L(),o=C("p"),o.innerHTML=v,y=L(),c=C("form"),l=C("label"),m=H("font-size: "),r=H(n[0]),a=H("px"),h=L(),g=C("input"),N=L(),I=C("label"),I.textContent=B,T=L(),S=C("input"),j=L(),z=C("article");for(let u=0;u<f.length;u+=1)f[u].c();this.h()},l(u){e=x(u,"DIV",{id:!0,class:!0});var _=w(e);s=x(_,"H1",{"data-svelte-h":!0}),K(s)!=="svelte-1m2hcwq"&&(s.textContent=t),i=M(_),o=x(_,"P",{"data-svelte-h":!0}),K(o)!=="svelte-895ja5"&&(o.innerHTML=v),y=M(_),c=x(_,"FORM",{});var d=w(c);l=x(d,"LABEL",{for:!0,class:!0});var D=w(l);m=O(D,"font-size: "),r=O(D,n[0]),a=O(D,"px"),D.forEach(k),h=M(d),g=x(d,"INPUT",{id:!0,type:!0,min:!0,max:!0}),N=M(d),I=x(d,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),K(I)!=="svelte-16zo6eo"&&(I.textContent=B),T=M(d),S=x(d,"INPUT",{id:!0,type:!0,maxlength:!0}),d.forEach(k),_.forEach(k),j=M(u),z=x(u,"ARTICLE",{class:!0});var q=w(z);for(let V=0;V<f.length;V+=1)f[V].l(q);q.forEach(k),this.h()},h(){E(l,"for","size"),E(l,"class","svelte-1lzc8ku"),E(g,"id","size"),E(g,"type","range"),E(g,"min","12"),E(g,"max","48"),E(I,"for","text"),E(I,"class","svelte-1lzc8ku"),E(S,"id","text"),E(S,"type","text"),E(S,"maxlength","100"),E(e,"id","info"),E(e,"class","svelte-1lzc8ku"),E(z,"class","svelte-1lzc8ku")},m(u,_){R(u,e,_),p(e,s),p(e,i),p(e,o),p(e,y),p(e,c),p(c,l),p(l,m),p(l,r),p(l,a),p(c,h),p(c,g),Q(g,n[0]),p(c,N),p(c,I),p(c,T),p(c,S),Q(S,n[1]),R(u,j,_),R(u,z,_);for(let d=0;d<f.length;d+=1)f[d]&&f[d].m(z,null);P=!0,F||(W=[X(g,"change",n[3]),X(g,"input",n[3]),X(S,"input",n[4])],F=!0)},p(u,[_]){if((!P||_&1)&&G(r,u[0]),_&1&&Q(g,u[0]),_&2&&S.value!==u[1]&&Q(S,u[1]),_&7){b=Z(u[2]);let d;for(d=0;d<b.length;d+=1){const D=le(u,b,d);f[d]?(f[d].p(D,_),U(f[d],1)):(f[d]=ie(D),f[d].c(),U(f[d],1),f[d].m(z,null))}for(ce(),d=b.length;d<f.length;d+=1)A(d);ue()}},i(u){if(!P){for(let _=0;_<b.length;_+=1)U(f[_]);P=!0}},o(u){f=f.filter(Boolean);for(let _=0;_<f.length;_+=1)J(f[_]);P=!1},d(u){u&&(k(e),k(j),k(z)),fe(f,u),F=!1,ae(W)}}}function Ne(n,e,s){let t=18,i="The quick brown fox jumps over the lazy dog.";const o=we(Be,c=>c.type);o.sort((c,l)=>be(c[1].length,l[1].length));function v(){t=Ee(this.value),s(0,t)}function y(){i=this.value,s(1,i)}return[t,i,o,v,y]}class He extends te{constructor(e){super(),ne(this,e,Ne,je,ee,{})}}function Oe(n){let e,s;return e=new He({}),{c(){de(e.$$.fragment)},l(t){pe(e.$$.fragment,t)},m(t,i){he(e,t,i),s=!0},p:$,i(t){s||(U(e.$$.fragment,t),s=!0)},o(t){J(e.$$.fragment,t),s=!1},d(t){me(e,t)}}}class Je extends te{constructor(e){super(),ne(this,e,null,Oe,ee,{})}}export{Je as component};
