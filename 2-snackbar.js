import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as t}from"./assets/vendor-BbbuE1sJ.js";const s=document.querySelector("form");console.dir(s);s.addEventListener("submit",r=>{r.preventDefault(),(()=>{const e=Number(s.elements.delay.value),i=s.elements.state.value;return new Promise((o,m)=>{setTimeout(()=>{i==="fulfilled"?o(e):m(e)},e)})})().then(e=>{t.success({title:"Done",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{t.error({title:"Error",message:`❌ Rejected promise in ${e}ms`})}),s.reset()});
//# sourceMappingURL=2-snackbar.js.map
