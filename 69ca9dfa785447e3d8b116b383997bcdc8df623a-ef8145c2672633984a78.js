(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"0mN4":function(e,t,r){"use strict";r("OGtf")("fixed",(function(e){return function(){return e(this,"tt","","")}}))},"1jzt":function(e,t,r){(function(a){var i,n;r("hEkN"),r("a1Th"),r("h7Nl"),r("Btvt"),r("8+KV"),n=void 0!==a?a:"undefined"!=typeof window?window:this,void 0===(i=function(){return function(e){"use strict";var t={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},r=function(){var e={};return Array.prototype.forEach.call(arguments,(function(t){for(var r in t){if(!t.hasOwnProperty(r))return;e[r]=t[r]}})),e},a=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,r=String(e),a=r.length,i=-1,n="",o=r.charCodeAt(0);++i<a;){if(0===(t=r.charCodeAt(i)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");n+=1<=t&&t<=31||127==t||0===i&&48<=t&&t<=57||1===i&&48<=t&&t<=57&&45===o?"\\"+t.toString(16)+" ":128<=t||45===t||95===t||48<=t&&t<=57||65<=t&&t<=90||97<=t&&t<=122?r.charAt(i):"\\"+r.charAt(i)}return"#"+n},i=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},n=function(t,r,a){0===t&&document.body.focus(),a||(t.focus(),document.activeElement!==t&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),e.scrollTo(0,r))},o=function(t,r,a,i){if(r.emitEvents&&"function"==typeof e.CustomEvent){var n=new CustomEvent(t,{bubbles:!0,detail:{anchor:a,toggle:i}});document.dispatchEvent(n)}};return function(s,l){var c,u,d,f,h={cancelScroll:function(e){cancelAnimationFrame(f),f=null,e||o("scrollCancel",c)},animateScroll:function(a,s,l){h.cancelScroll();var u=r(c||t,l||{}),p="[object Number]"===Object.prototype.toString.call(a),m=p||!a.tagName?null:a;if(p||m){var g=e.pageYOffset;u.header&&!d&&(d=document.querySelector(u.header));var v,y,b,S,E,w,I,A,L=function(t){return t?(r=t,parseInt(e.getComputedStyle(r).height,10)+t.offsetTop):0;var r}(d),O=p?a:function(t,r,a,n){var o=0;if(t.offsetParent)for(;o+=t.offsetTop,t=t.offsetParent;);return o=Math.max(o-r-a,0),n&&(o=Math.min(o,i()-e.innerHeight)),o}(m,L,parseInt("function"==typeof u.offset?u.offset(a,s):u.offset,10),u.clip),k=O-g,T=i(),N=0,q=(v=k,b=(y=u).speedAsDuration?y.speed:Math.abs(v/1e3*y.speed),y.durationMax&&b>y.durationMax?y.durationMax:y.durationMin&&b<y.durationMin?y.durationMin:parseInt(b,10));0===e.pageYOffset&&e.scrollTo(0,0),I=a,A=u,p||history.pushState&&A.updateURL&&history.pushState({smoothScroll:JSON.stringify(A),anchor:I.id},document.title,I===document.documentElement?"#top":"#"+I.id),"matchMedia"in e&&e.matchMedia("(prefers-reduced-motion)").matches?n(a,Math.floor(O),!1):(o("scrollStart",u,a,s),h.cancelScroll(!0),e.requestAnimationFrame((function t(r){var i,l,c;S||(S=r),N+=r-S,w=g+k*(l=E=1<(E=0===q?0:N/q)?1:E,"easeInQuad"===(i=u).easing&&(c=l*l),"easeOutQuad"===i.easing&&(c=l*(2-l)),"easeInOutQuad"===i.easing&&(c=l<.5?2*l*l:(4-2*l)*l-1),"easeInCubic"===i.easing&&(c=l*l*l),"easeOutCubic"===i.easing&&(c=--l*l*l+1),"easeInOutCubic"===i.easing&&(c=l<.5?4*l*l*l:(l-1)*(2*l-2)*(2*l-2)+1),"easeInQuart"===i.easing&&(c=l*l*l*l),"easeOutQuart"===i.easing&&(c=1- --l*l*l*l),"easeInOutQuart"===i.easing&&(c=l<.5?8*l*l*l*l:1-8*--l*l*l*l),"easeInQuint"===i.easing&&(c=l*l*l*l*l),"easeOutQuint"===i.easing&&(c=1+--l*l*l*l*l),"easeInOutQuint"===i.easing&&(c=l<.5?16*l*l*l*l*l:1+16*--l*l*l*l*l),i.customEasing&&(c=i.customEasing(l)),c||l),e.scrollTo(0,Math.floor(w)),function(t,r){var i=e.pageYOffset;if(t==r||i==r||(g<r&&e.innerHeight+i)>=T)return h.cancelScroll(!0),n(a,r,p),o("scrollStop",u,a,s),!(f=S=null)}(w,O)||(f=e.requestAnimationFrame(t),S=r)})))}}},p=function(t){if(!t.defaultPrevented&&!(0!==t.button||t.metaKey||t.ctrlKey||t.shiftKey)&&"closest"in t.target&&(u=t.target.closest(s))&&"a"===u.tagName.toLowerCase()&&!t.target.closest(c.ignore)&&u.hostname===e.location.hostname&&u.pathname===e.location.pathname&&/#/.test(u.href)){var r,i;try{r=a(decodeURIComponent(u.hash))}catch(t){r=a(u.hash)}if("#"===r){if(!c.topOnEmptyHash)return;i=document.documentElement}else i=document.querySelector(r);(i=i||"#top"!==r?i:document.documentElement)&&(t.preventDefault(),function(t){if(history.replaceState&&t.updateURL&&!history.state){var r=e.location.hash;r=r||"",history.replaceState({smoothScroll:JSON.stringify(t),anchor:r||e.pageYOffset},document.title,r||e.location.href)}}(c),h.animateScroll(i,u))}},m=function(e){if(null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(c)){var t=history.state.anchor;"string"==typeof t&&t&&!(t=document.querySelector(a(history.state.anchor)))||h.animateScroll(t,null,{updateURL:!1})}};return h.destroy=function(){c&&(document.removeEventListener("click",p,!1),e.removeEventListener("popstate",m,!1),h.cancelScroll(),f=d=u=c=null)},function(){if(!("querySelector"in document&&"addEventListener"in e&&"requestAnimationFrame"in e&&"closest"in e.Element.prototype))throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";h.destroy(),c=r(t,l||{}),d=c.header?document.querySelector(c.header):null,document.addEventListener("click",p,!1),c.updateURL&&c.popstate&&e.addEventListener("popstate",m,!1)}(),h}}(n)}.apply(t,[]))||(e.exports=i)}).call(this,r("yLpj"))},"9H8W":function(e,t,r){},"9eSz":function(e,t,r){"use strict";r("rGqo"),r("yt8O"),r("Btvt"),r("XfO3"),r("EK0E"),r("INYr"),r("0mN4");var a=r("TqRt");t.__esModule=!0,t.default=void 0;var i,n=a(r("PJYZ")),o=a(r("VbXa")),s=a(r("8OQS")),l=a(r("pVnL")),c=a(r("q1tI")),u=a(r("17x9")),d=function(e){var t=(0,l.default)({},e),r=t.resolutions,a=t.sizes,i=t.critical;return r&&(t.fixed=r,delete t.resolutions),a&&(t.fluid=a,delete t.sizes),i&&(t.loading="eager"),t.fluid&&(t.fluid=w([].concat(t.fluid))),t.fixed&&(t.fixed=w([].concat(t.fixed))),t},f=function(e){var t=e.media;return!!t&&(y&&!!window.matchMedia(t).matches)},h=function(e){var t=e.fluid,r=e.fixed;return p(t||r).src},p=function(e){if(y&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(f);if(-1!==t)return e[t];var r=e.findIndex((function(e){return void 0===e.media}));if(-1!==r)return e[r]}return e[0]},m=Object.create({}),g=function(e){var t=d(e),r=h(t);return m[r]||!1},v="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,y="undefined"!=typeof window,b=y&&window.IntersectionObserver,S=new WeakMap;function E(e){return e.map((function(e){var t=e.src,r=e.srcSet,a=e.srcSetWebp,i=e.media,n=e.sizes;return c.default.createElement(c.default.Fragment,{key:t},a&&c.default.createElement("source",{type:"image/webp",media:i,srcSet:a,sizes:n}),c.default.createElement("source",{media:i,srcSet:r,sizes:n}))}))}function w(e){var t=[],r=[];return e.forEach((function(e){return(e.media?t:r).push(e)})),[].concat(t,r)}function I(e){return e.map((function(e){var t=e.src,r=e.media,a=e.tracedSVG;return c.default.createElement("source",{key:t,media:r,srcSet:a})}))}function A(e){return e.map((function(e){var t=e.src,r=e.media,a=e.base64;return c.default.createElement("source",{key:t,media:r,srcSet:a})}))}function L(e,t){var r=e.srcSet,a=e.srcSetWebp,i=e.media,n=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(i?'media="'+i+'" ':"")+'srcset="'+(t?a:r)+'" '+(n?'sizes="'+n+'" ':"")+"/>"}var O=function(e,t){var r=(void 0===i&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=new window.IntersectionObserver((function(e){e.forEach((function(e){if(S.has(e.target)){var t=S.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(i.unobserve(e.target),S.delete(e.target),t())}}))}),{rootMargin:"200px"})),i);return r&&(r.observe(e),S.set(e,t)),function(){r.unobserve(e),S.delete(e)}},k=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',r=e.sizes?'sizes="'+e.sizes+'" ':"",a=e.srcSet?'srcset="'+e.srcSet+'" ':"",i=e.title?'title="'+e.title+'" ':"",n=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",s=e.height?'height="'+e.height+'" ':"",l=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",c=e.loading?'loading="'+e.loading+'" ':"",u=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?L(e,!0):"")+L(e)})).join("")+"<img "+c+o+s+r+a+t+n+i+l+u+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},T=function(e){var t=e.src,r=e.imageVariants,a=e.generateSources,i=e.spreadProps,n=e.ariaHidden,o=c.default.createElement(N,(0,l.default)({src:t},i,{ariaHidden:n}));return r.length>1?c.default.createElement("picture",null,a(r),o):o},N=c.default.forwardRef((function(e,t){var r=e.sizes,a=e.srcSet,i=e.src,n=e.style,o=e.onLoad,u=e.onError,d=e.loading,f=e.draggable,h=e.ariaHidden,p=(0,s.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return c.default.createElement("img",(0,l.default)({"aria-hidden":h,sizes:r,srcSet:a,src:i},p,{onLoad:o,onError:u,ref:t,loading:d,draggable:f,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},n)}))}));N.propTypes={style:u.default.object,onError:u.default.func,onLoad:u.default.func};var q=function(e){function t(t){var r;(r=e.call(this,t)||this).seenBefore=y&&g(t),r.isCritical="eager"===t.loading||t.critical,r.addNoScript=!(r.isCritical&&!t.fadeIn),r.useIOSupport=!v&&b&&!r.isCritical&&!r.seenBefore;var a=r.isCritical||y&&(v||!r.useIOSupport);return r.state={isVisible:a,imgLoaded:!1,imgCached:!1,fadeIn:!r.seenBefore&&t.fadeIn},r.imageRef=c.default.createRef(),r.handleImageLoaded=r.handleImageLoaded.bind((0,n.default)(r)),r.handleRef=r.handleRef.bind((0,n.default)(r)),r}(0,o.default)(t,e);var r=t.prototype;return r.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:g(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},r.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},r.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=O(e,(function(){var e=g(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){t.setState({imgLoaded:e,imgCached:!(!t.imageRef.current||!t.imageRef.current.currentSrc)})}))})))},r.handleImageLoaded=function(){var e,t,r;e=this.props,t=d(e),r=h(t),m[r]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},r.render=function(){var e=d(this.props),t=e.title,r=e.alt,a=e.className,i=e.style,n=void 0===i?{}:i,o=e.imgStyle,s=void 0===o?{}:o,u=e.placeholderStyle,f=void 0===u?{}:u,h=e.placeholderClassName,m=e.fluid,g=e.fixed,v=e.backgroundColor,y=e.durationFadeIn,b=e.Tag,S=e.itemProp,w=e.loading,L=e.draggable,O=!1===this.state.fadeIn||this.state.imgLoaded,q=!0===this.state.fadeIn&&!this.state.imgCached,x=(0,l.default)({opacity:O?1:0,transition:q?"opacity "+y+"ms":"none"},s),C="boolean"==typeof v?"lightgray":v,V={transitionDelay:y+"ms"},R=(0,l.default)({opacity:this.state.imgLoaded?0:1},q&&V,{},s,{},f),j={title:t,alt:this.state.isVisible?"":r,style:R,className:h,itemProp:S};if(m){var z=m,M=p(m);return c.default.createElement(b,{className:(a||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden"},n),ref:this.handleRef,key:"fluid-"+JSON.stringify(M.srcSet)},c.default.createElement(b,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/M.aspectRatio+"%"}}),C&&c.default.createElement(b,{"aria-hidden":!0,title:t,style:(0,l.default)({backgroundColor:C,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},q&&V)}),M.base64&&c.default.createElement(T,{ariaHidden:!0,src:M.base64,spreadProps:j,imageVariants:z,generateSources:A}),M.tracedSVG&&c.default.createElement(T,{ariaHidden:!0,src:M.tracedSVG,spreadProps:j,imageVariants:z,generateSources:I}),this.state.isVisible&&c.default.createElement("picture",null,E(z),c.default.createElement(N,{alt:r,title:t,sizes:M.sizes,src:M.src,crossOrigin:this.props.crossOrigin,srcSet:M.srcSet,style:x,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:S,loading:w,draggable:L})),this.addNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:k((0,l.default)({alt:r,title:t,loading:w},M,{imageVariants:z}))}}))}if(g){var Q=g,H=p(g),X=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:H.width,height:H.height},n);return"inherit"===n.display&&delete X.display,c.default.createElement(b,{className:(a||"")+" gatsby-image-wrapper",style:X,ref:this.handleRef,key:"fixed-"+JSON.stringify(H.srcSet)},C&&c.default.createElement(b,{"aria-hidden":!0,title:t,style:(0,l.default)({backgroundColor:C,width:H.width,opacity:this.state.imgLoaded?0:1,height:H.height},q&&V)}),H.base64&&c.default.createElement(T,{ariaHidden:!0,src:H.base64,spreadProps:j,imageVariants:Q,generateSources:A}),H.tracedSVG&&c.default.createElement(T,{ariaHidden:!0,src:H.tracedSVG,spreadProps:j,imageVariants:Q,generateSources:I}),this.state.isVisible&&c.default.createElement("picture",null,E(Q),c.default.createElement(N,{alt:r,title:t,width:H.width,height:H.height,sizes:H.sizes,src:H.src,crossOrigin:this.props.crossOrigin,srcSet:H.srcSet,style:x,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:S,loading:w,draggable:L})),this.addNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:k((0,l.default)({alt:r,title:t,loading:w},H,{imageVariants:Q}))}}))}return null},t}(c.default.Component);q.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var x=u.default.shape({width:u.default.number.isRequired,height:u.default.number.isRequired,src:u.default.string.isRequired,srcSet:u.default.string.isRequired,base64:u.default.string,tracedSVG:u.default.string,srcWebp:u.default.string,srcSetWebp:u.default.string,media:u.default.string}),C=u.default.shape({aspectRatio:u.default.number.isRequired,src:u.default.string.isRequired,srcSet:u.default.string.isRequired,sizes:u.default.string.isRequired,base64:u.default.string,tracedSVG:u.default.string,srcWebp:u.default.string,srcSetWebp:u.default.string,media:u.default.string});q.propTypes={resolutions:x,sizes:C,fixed:u.default.oneOfType([x,u.default.arrayOf(x)]),fluid:u.default.oneOfType([C,u.default.arrayOf(C)]),fadeIn:u.default.bool,durationFadeIn:u.default.number,title:u.default.string,alt:u.default.string,className:u.default.oneOfType([u.default.string,u.default.object]),critical:u.default.bool,crossOrigin:u.default.oneOfType([u.default.string,u.default.bool]),style:u.default.object,imgStyle:u.default.object,placeholderStyle:u.default.object,placeholderClassName:u.default.string,backgroundColor:u.default.oneOfType([u.default.string,u.default.bool]),onLoad:u.default.func,onError:u.default.func,onStartLoad:u.default.func,Tag:u.default.string,itemProp:u.default.string,loading:u.default.oneOf(["auto","lazy","eager"]),draggable:u.default.bool};var V=q;t.default=V},EK0E:function(e,t,r){"use strict";var a,i=r("dyZX"),n=r("CkkT")(0),o=r("KroJ"),s=r("Z6vF"),l=r("czNK"),c=r("ZD67"),u=r("0/R4"),d=r("s5qY"),f=r("s5qY"),h=!i.ActiveXObject&&"ActiveXObject"in i,p=s.getWeak,m=Object.isExtensible,g=c.ufstore,v=function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},y={get:function(e){if(u(e)){var t=p(e);return!0===t?g(d(this,"WeakMap")).get(e):t?t[this._i]:void 0}},set:function(e,t){return c.def(d(this,"WeakMap"),e,t)}},b=e.exports=r("4LiD")("WeakMap",v,y,c,!0,!0);f&&h&&(l((a=c.getConstructor(v,"WeakMap")).prototype,y),s.NEED=!0,n(["delete","has","get","set"],(function(e){var t=b.prototype,r=t[e];o(t,e,(function(t,i){if(u(t)&&!m(t)){this._f||(this._f=new a);var n=this._f[e](t,i);return"set"==e?this:n}return r.call(this,t,i)}))})))},EXIE:function(e,t,r){"use strict";r.d(t,"c",(function(){return l})),r.d(t,"a",(function(){return c})),r.d(t,"b",(function(){return u}));var a,i=r("1jzt"),n=r.n(i),o=r("dwco"),s=r.n(o);function l(){return s.a.polyfill(),a=new n.a('a[href*="#"]',{speed:500,speedAsDuration:!0})}function c(){if(!a)throw Error("Not founded SmoothScroll instance");return a.destroy(),a=null}function u(e){if(!a)throw Error("Not founded SmoothScroll instance");return a.animateScroll(e),a}},"G+iy":function(e){e.exports=JSON.parse('{"data":{"avatar":{"childImageSharp":{"fixed":{"base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEz0lEQVQ4ywHEBDv7ALanc56OYIt8WpOFaZiKb8G1muDXv8K3mpeLc4N3ZbKsnMi9pJqDWZuQdpyVgc7Gr9bGptnIp+vixqGchQDs3cHu3rvYyKjo2bzy48TQxap8dGVEPTUuKSQqIx4iGxQrJBxRRjeTiHOjnozMw63Xx6fi0rDn3sKjm4UA6+bW7+7m6efc09DDc25gIBsSFxIQOS8qUkQ9SjszNykhLyMcHxYPSj0znJB/va+WzsStyL+pvbGUk4dvAO7v6/Ly7uvq5F9aUQoIAyEhHkU5NHddVHxhV3paTnlaToVlWXtcUGJLQIh1aLWhkaGaipiRfqqfg5CCagDs7ej7+/aemo0PDQcbGhcqJyNkS0GphXuif3ebdWqjf3KmgnWog3anhnq3pZ3s6+Lh39LUz8DNyLSup5QA7u/q9PTuXFdNEg8MJyUiLSQfhGNXn3lpl29llG1fmHBipYB0pYF1qYZ7uJqQjop/l5iMycrB8/f0+Pr3APDw7eXm3kZANh8bFxgXEyccFXFQQpNsWplyZKF6b5pyZJdsXpxzZpx1abOQhIJ2b2RaQqyli/T27Pv79gD3+PHv7uNIPzQSDwsPDwolGhR0T0GTalqRbF+AXlJsTUBoRDZ7UD+AVUNhQDNoVUqstMGyweHF0u3k6vAAys/Xw8jSOzIrAQIACwwJQC8ok2pbgVdIZT0rTS8hLhsTNhgOdEw9eFRHJQ0EVkE8kKjth6TwlK3rqL3qAI+aunSBtlFHTkEuJS4hG2FHPJdsWoJZTG9LP107MlAyKk0uI4JaTKeDe0YrIoqAfeD1/9jr+9nt/cni/QCqrbR+m8WIU0+EQzB1TTxzUUKJXk2LYFCUaV+OY1qNZFqLX1KMXlGthX2dfXShkJCUxPaGuvdxpfNUiOwAqrO5XIm+aTs9ZSQSbD8vZ0k5d1FBgFZEhVhIlWVYl2lbhlZGc0U3dko6kWpdoYeBwtHgwdXoucvgr8PdAKipnJWPhJJ5cHQ+L287K2BAL2hHNndTQXpVQ4FWRYxfTpFmV04sIz0mG4BcTJN7cbTU8Lze+8Hg+MXi+ADAxLLDtp7LuaSLnZBzYVZoQjJkQjFlQzJrSTd1TjpuSjhmRDZNMCQ8IRhmSjqAbGGYss6evNydvNqZuNsAvcKyr6mPv7WitcOOqalsaEo6WzwsZEEuXz4sZUIwUzIhVjIjYTctbkQ/TzQoeG5ju87PlqO0doWYZXJ+ALvCqaiqiaqnkM+/Y9rHTm5VOUApHFc4Jlg5KEguIFs8LH9SPFk0JFo8L1tAMYCEfX+Yqk5icj5JRjg+OQDGyKPEwYKbnXXCt17gzlOBZj87JBo/Kh1FLSA8KBxGMidkRThhPzFbPS5WSz12iplUaoZ4jotOWVIzOjsAsqyEpZVrk414wbNV28tFim5BSSsiPykaNyUaNCQZOCgeQS0jPyofNyYbYWt2ZH2ducTH5erkp7CwRVJUAKaqnqmsqKarq8CzVNnHP492Qk8wJkMrGzwoGjYkGCkcFCUbEiQYD11JPXB+midDZ0hQVGxtaXV+hFZqfABbZnRWY3V3gIfKuU7cyT2Nd0dePDJcOihVNidTNidNMiRLLyFSMyaAYVW0loiRgH5naHI9T2orP144S2hUAC6rd+avPwAAAABJRU5ErkJggg==","width":72,"height":72,"src":"/kontrolqa/static/0e4c6168a1048177fc19978c932ae478/e5b88/profile.png","srcSet":"/kontrolqa/static/0e4c6168a1048177fc19978c932ae478/e5b88/profile.png 1x,\\n/kontrolqa/static/0e4c6168a1048177fc19978c932ae478/e7bd6/profile.png 1.5x,\\n/kontrolqa/static/0e4c6168a1048177fc19978c932ae478/a12fc/profile.png 2x"}}},"site":{"siteMetadata":{"author":"kostyrko","introduction":"Tu niedługo pojawi się treść dotycząca testowania oraz kontroli jakości aplikacji webowych oraz mobilnych","social":{"twitter":"","github":"kostyrko","medium":"","facebook":"","linkedin":"","instagram":""}}}}}')},Gy9e:function(e,t,r){},INYr:function(e,t,r){"use strict";var a=r("XKFU"),i=r("CkkT")(6),n="findIndex",o=!0;n in[]&&Array(1)[n]((function(){o=!1})),a(a.P+a.F*o,"Array",{findIndex:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),r("nGyu")(n)},OGtf:function(e,t,r){var a=r("XKFU"),i=r("eeVq"),n=r("vhPU"),o=/"/g,s=function(e,t,r,a){var i=String(n(e)),s="<"+t;return""!==r&&(s+=" "+r+'="'+String(a).replace(o,"&quot;")+'"'),s+">"+i+"</"+t+">"};e.exports=function(e,t){var r={};r[e]=t(s),a(a.P+a.F*i((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3})),"String",r)}},ZD67:function(e,t,r){"use strict";var a=r("3Lyj"),i=r("Z6vF").getWeak,n=r("y3w9"),o=r("0/R4"),s=r("9gX7"),l=r("SlkY"),c=r("CkkT"),u=r("aagx"),d=r("s5qY"),f=c(5),h=c(6),p=0,m=function(e){return e._l||(e._l=new g)},g=function(){this.a=[]},v=function(e,t){return f(e.a,(function(e){return e[0]===t}))};g.prototype={get:function(e){var t=v(this,e);if(t)return t[1]},has:function(e){return!!v(this,e)},set:function(e,t){var r=v(this,e);r?r[1]=t:this.a.push([e,t])},delete:function(e){var t=h(this.a,(function(t){return t[0]===e}));return~t&&this.a.splice(t,1),!!~t}},e.exports={getConstructor:function(e,t,r,n){var c=e((function(e,a){s(e,c,t,"_i"),e._t=t,e._i=p++,e._l=void 0,null!=a&&l(a,r,e[n],e)}));return a(c.prototype,{delete:function(e){if(!o(e))return!1;var r=i(e);return!0===r?m(d(this,t)).delete(e):r&&u(r,this._i)&&delete r[this._i]},has:function(e){if(!o(e))return!1;var r=i(e);return!0===r?m(d(this,t)).has(e):r&&u(r,this._i)}}),c},def:function(e,t,r){var a=i(n(t),!0);return!0===a?m(e).set(t,r):a[e._i]=r,e},ufstore:m}},dwco:function(e,t,r){r("Oyvg"),r("eM6i"),r("2Spj"),function(){"use strict";e.exports={polyfill:function(){var e=window,t=document;if(!("scrollBehavior"in t.documentElement.style)||!0===e.__forceSmoothScrollPolyfill__){var r,a=e.HTMLElement||e.Element,i={scroll:e.scroll||e.scrollTo,scrollBy:e.scrollBy,elementScroll:a.prototype.scroll||s,scrollIntoView:a.prototype.scrollIntoView},n=e.performance&&e.performance.now?e.performance.now.bind(e.performance):Date.now,o=(r=e.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(r)?1:0);e.scroll=e.scrollTo=function(){void 0!==arguments[0]&&(!0!==l(arguments[0])?p.call(e,t.body,void 0!==arguments[0].left?~~arguments[0].left:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:e.scrollY||e.pageYOffset):i.scroll.call(e,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:e.scrollY||e.pageYOffset))},e.scrollBy=function(){void 0!==arguments[0]&&(l(arguments[0])?i.scrollBy.call(e,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):p.call(e,t.body,~~arguments[0].left+(e.scrollX||e.pageXOffset),~~arguments[0].top+(e.scrollY||e.pageYOffset)))},a.prototype.scroll=a.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==l(arguments[0])){var e=arguments[0].left,t=arguments[0].top;p.call(this,this,void 0===e?this.scrollLeft:~~e,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},a.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==l(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},a.prototype.scrollIntoView=function(){if(!0!==l(arguments[0])){var r=f(this),a=r.getBoundingClientRect(),n=this.getBoundingClientRect();r!==t.body?(p.call(this,r,r.scrollLeft+n.left-a.left,r.scrollTop+n.top-a.top),"fixed"!==e.getComputedStyle(r).position&&e.scrollBy({left:a.left,top:a.top,behavior:"smooth"})):e.scrollBy({left:n.left,top:n.top,behavior:"smooth"})}else i.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function s(e,t){this.scrollLeft=e,this.scrollTop=t}function l(e){if(null===e||"object"!=typeof e||void 0===e.behavior||"auto"===e.behavior||"instant"===e.behavior)return!0;if("object"==typeof e&&"smooth"===e.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+e.behavior+" is not a valid value for enumeration ScrollBehavior.")}function c(e,t){return"Y"===t?e.clientHeight+o<e.scrollHeight:"X"===t?e.clientWidth+o<e.scrollWidth:void 0}function u(t,r){var a=e.getComputedStyle(t,null)["overflow"+r];return"auto"===a||"scroll"===a}function d(e){var t=c(e,"Y")&&u(e,"Y"),r=c(e,"X")&&u(e,"X");return t||r}function f(e){for(;e!==t.body&&!1===d(e);)e=e.parentNode||e.host;return e}function h(t){var r,a,i,o,s=(n()-t.startTime)/468;o=s=s>1?1:s,r=.5*(1-Math.cos(Math.PI*o)),a=t.startX+(t.x-t.startX)*r,i=t.startY+(t.y-t.startY)*r,t.method.call(t.scrollable,a,i),a===t.x&&i===t.y||e.requestAnimationFrame(h.bind(e,t))}function p(r,a,o){var l,c,u,d,f=n();r===t.body?(l=e,c=e.scrollX||e.pageXOffset,u=e.scrollY||e.pageYOffset,d=i.scroll):(l=r,c=r.scrollLeft,u=r.scrollTop,d=s),h({scrollable:l,method:d,startTime:f,startX:c,startY:u,x:a,y:o})}}}}()},fAKB:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var a=r("q1tI"),i=r.n(a),n=(r("Gy9e"),function(e){var t=e.tags,r=e.thumbnail,a=t||[];if(a)return i.a.createElement("div",{className:"tags"},a.map((function(e,t){return i.a.createElement("span",{key:t,className:"tag"+(r?" thumbnail-tag":"")},e)})))})},hEkN:function(e,t,r){"use strict";r("OGtf")("anchor",(function(e){return function(t){return e(this,"a","name",t)}}))},lbRd:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));r("0mN4");var a=r("G+iy"),i=r("q1tI"),n=r.n(i),o=r("Wbzz"),s=r("9eSz"),l=r.n(s),c=(r("9H8W"),Object(i.forwardRef)((function(e,t){return n.a.createElement(o.StaticQuery,{query:u,render:function(e){var r=e.site.siteMetadata,a=r.author,i=r.social,s=r.introduction;return n.a.createElement("div",{ref:t,className:"bio"},n.a.createElement("div",{className:"author"},n.a.createElement("div",{className:"author-description"},n.a.createElement(l.a,{className:"author-image",fixed:e.avatar.childImageSharp.fixed,alt:a,style:{borderRadius:"100%"}}),n.a.createElement("div",{className:"author-name"},n.a.createElement("span",{className:"author-name-prefix"},"Autor"),n.a.createElement(o.Link,{to:"/about",className:"author-name-content"},n.a.createElement("span",null,"@",a)),n.a.createElement("div",{className:"author-introduction"},s),n.a.createElement("p",{className:"author-socials"},i.instagram&&n.a.createElement("a",{href:"https://www.instagram.com/"+i.instagram},"Instagram"),i.github&&n.a.createElement("a",{href:"https://github.com/"+i.github},"GitHub"),i.medium&&n.a.createElement("a",{href:"https://medium.com/"+i.medium},"Medium"),i.twitter&&n.a.createElement("a",{href:"https://twitter.com/"+i.twitter},"Twitter"),i.facebook&&n.a.createElement("a",{href:"https://www.facebook.com/"+i.facebook},"Facebook"),i.linkedin&&n.a.createElement("a",{href:"https://www.linkedin.com/in/"+i.linkedin+"/"},"LinkedIn"))))))},data:a})}))),u="2466699377"}}]);
//# sourceMappingURL=69ca9dfa785447e3d8b116b383997bcdc8df623a-ef8145c2672633984a78.js.map