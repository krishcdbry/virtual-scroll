!function(e){var t={};function n(a){if(t[a])return t[a].exports;var l=t[a]={exports:{},id:a,loaded:!1};return e[a].call(l.exports,l,l.exports,n),l.loaded=!0,l.exports}n.m=e,n.c=t,n.p="",n(0)}([function(e,t){try{window.virtualList=function(e,t){const n=t.getElementById("container"),a=(t.getElementById("header"),t.getElementById("content")),l=t.getElementById("place-holder"),r=t.getElementById("loader"),i={author:{name:"name",photoUrl:null},content:null,id:null,updated:null};let o=e.innerWidth,s=(e.innerHeight,null),d={x:0,y:0,time:0},p={x:0,y:0,time:0},c="http://message-list.appspot.com",m=null,u=100,h=!1,g=0,f=[],y={},L=0,N=[],C=0,E=0,O=!1,T=!1,v=0,x=0,I=0,b=0,D=0;const M=()=>{o=e.innerWidth,o=e.innerHeight},B=e=>{let t=Math.floor((new Date-e)/1e3),n=Math.floor(t/31536e3);return n>1?n+" years ago":(n=Math.floor(t/monthsRange))>1?n+" months ago":(n=Math.floor(t/86400))>1?n+" days ago":(n=Math.floor(t/3600))>1?n+" hours ago":(n=Math.floor(t/60))>1?n+" minutes ago":Math.floor(t)+" seconds ago"},_=(e,t)=>{if("[object Object]"!==Object.prototype.toString.call(t))return"Not a valid needle(object)";if("[object Array]"!==Object.prototype.toString.call(e))return"Not a valid array";for(var n=-1,a=Object.keys(t)[0],l=t[a],r=0;r<e.length;r++){if(e[r][a]==l){n=r;break}}return n},w=e=>{let t=o-65,n=e-d.x,a=p.time-d.time;return a>150&&e>t&&n>100||a<150&&n>30},S=(e,t)=>{let n=e.target,a=e.target.parentNode;n.remove(),((e,t)=>{if(y[e]){let n=y[e],a=_(n,{id:t});a>-1&&n.splice(a,1),y[e]=n}})(a.id,n.id);let l=n.offsetHeight;b-=l,D-=l,s=null},j=e=>{if("message-card"==e.target.classList[0])return e.target;{let t=e.target;for(;t;){if("message-card"==t.classList[0])return t;t=t.parentNode}}return null},k=e=>{let t=e.touches[0].pageX,n=e.touches[0].pageY;p={x:t,x:t,time:(new Date).getTime()},w(t)&&(e=>{return Math.abs(e-d.y)<50})(n)&&s&&s.parentNode&&(s.classList.add("slide-off"),s.style.opacity="0.2")},H=()=>{d={y:0,y:0,time:0},p={x:0,y:0,time:0}},R=(e="LOAD_BOTTOM")=>{let n=t.getElementsByTagName("section"),l=n[0],r=C=l.offsetHeight;if("LOAD_BOTTOM"==e&&g>2)f[2]<g&&(()=>{let e=f[f.length-1],n=(t.getElementById("p"+e),"p"+(e+1)),l=W(y[n],n);a.appendChild(l),f.push(e+1)})(),E>0&&(r=Number(E)+Number(C)),N.push(C),f.length>2&&((e,t)=>{e.parentNode.removeChild(e),E=t,a.style.paddingTop=t+"px",f.shift()})(l,r);else{if(1==f[0])return;(()=>{let e=f[0],n=t.getElementById("p"+e),a="p"+(e-1);if(n){let t=W(y[a],a);n.parentNode.insertBefore(t,n),f.unshift(e-1)}})(),(r=E-(N.length>0?N.pop():C))<0&&(t.getElementById("p1")||(r=0)),f.length>2&&((e,t)=>{e.parentNode.removeChild(e),E=t,a.style.paddingTop=t+"px",f.pop()})(n[n.length-1],r)}},G=e=>{let n=t.createElement("div");return n.className="author-pic",e&&(n.style.opacity=0,((e,t)=>{let n=new Image;n.onload=(()=>{e.style.background=`url(${t})`,e.style.backgroundSize="cover",e.style.backgroundPosition="center",e.style.opacity=1}),n.src=t})(n,c+e)),n},P=e=>{let n=t.createElement("div");n.className="author-section";let a=G(e.author.photoUrl),l=((e,n)=>{let a=t.createElement("div");a.className="name-section";let l=t.createElement("span");l.className="username",l.innerHTML=e.name;let r=t.createElement("span");return r.className="timestamp",r.innerHTML=n?B(new Date(n)):"",a.appendChild(l),a.appendChild(r),a})(e.author,e.updated);return n.appendChild(a),n.appendChild(l),n},A=(e,n)=>{let a=t.createElement("div");return a.className="story",a.innerHTML=e.content,a},W=(e,n)=>{let a=t.createDocumentFragment(),l=t.createElement("section");l.id=n;for(let n of e){let e=t.createElement("div"),a=P(n),r=A(n);e.className="message-card",e.id=n.id,e.appendChild(a),e.appendChild(r),l.appendChild(e)}return a.appendChild(l),a},F=()=>{h||(h=!0,url=c+"/messages?limit="+u,m&&(url+="&pageToken="+m),m=null,fetch(url).then(e=>e.json()).then(e=>{e.messages?(h=!1,g++,m=e.pageToken,L+=e.messages.length,((e,t)=>{y["p"+e]=t})(g,e.messages),g>3&&f.length>=3&&g>f[2]||((e,t)=>{let n=W(e,"p"+t);a.appendChild(n),f.push(g)})(e.messages,g),T||(()=>{let e=t.createDocumentFragment(),n=0;for(;n<1;){let a=i,l=t.createElement("div"),r=P(a),o=A(a);l.className="message-card",l.id="loader-"+n,l.appendChild(r),l.appendChild(o),e.appendChild(l),n++}r.appendChild(e),T=!0})()):O=!0}).catch(e=>{O=!0,h=!1,setTimeout(()=>{F()},15e3)}))};let z=(e=!1)=>{if(g>3){v>5*C&&v-E>(e?5*C:1.5*C)&&setTimeout(()=>{E=v-C,a.style.paddingTop=E+"px"},100)}e&&g>4&&f.length>1&&1==f[0]&&2==f[1]&&v>7*C&&setTimeout(()=>{E=0,a.style.paddingTop=E+"px",n.scrollTop=0,b=C,D=0},100)},U=e=>{let t="SCROLLING_TOP";if((v=e.target.scrollTop)>x&&(t="SCROLLING_DOWN"),x=v,I){if(g<3?b=I+C/3:3==g&&(b=I+C),"SCROLLING_DOWN"==t&&(g<3||L<100)&&F(),"SCROLLING_DOWN"==t&&v>b&&v>C){if(I=v,g>2&&(b+=C,D=I),f.length>2&&g>f[2]+3||F(),O)return;R()}else"SCROLLING_TOP"==t&&v<D&&(D-=C,b=I=v,R("LOAD_TOP"));if("SCROLLING_TOP"==t)z("LOAD_TOP");else{if(O)return;z()}}else I=v};const X=()=>{n.addEventListener("scroll",U),a.addEventListener("touchstart",function(e){let t=j(e);t&&((e,t)=>{s=t,d={x:e.touches[0].pageX,y:e.touches[0].pageY,time:(new Date).getTime()}})(e,t)}),a.addEventListener("touchmove",k),a.addEventListener("touchend",H),a.addEventListener("animationend",function(e){let t=j(e);t&&S(e)}),e.addEventListener("resize",M)};return{init:(e={})=>{(e=>{e.api&&(c=e.api),e.limit&&(u=e.limit>=10?e.limit:10)})(e),(e=>{let n=t.createDocumentFragment(),a=0;for(;a<e;){let e=i,l=t.createElement("div"),r=P(e),o=A(e);l.className="message-card",l.id="fake-"+a,l.appendChild(r),l.appendChild(o),n.appendChild(l),a++}l.appendChild(n)})(3),X(),F()}}}(window,document)}catch(e){console.error("Error loading plugin",e)}virtualList.init()}]);