// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.huya.com/raini
// @icon         http://huya.com/favicon.ico
// @grant        none
// ==/UserScript==

let removelist = []
let list_CSS = ["#sections-vm"]

window.onload = function() {
  init();
  console.log(removelist);
  removelist.forEach(removebylist)
};

function removebylist(dom){
  console.log(dom);
  let timerId = setInterval(remove(dom,timerId), 1000);
  setTimeout(clearInterval(timerId), 10000);
}

function remove(dom,timerId){
  if(dom){
      dom.style.display = "none";
      clearInterval(timerId)
  }
}

function init() {
  list_CSS.forEach((e)=>{removelist.push(document.querySelector(e))})
}
