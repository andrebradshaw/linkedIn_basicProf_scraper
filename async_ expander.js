var cn = (ob, nm) => ob.getElementsByClassName(nm);
var tn = (ob, nm) => ob.getElementsByTagName(nm);
var gi = (ob, nm) => ob.getElementById(nm);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var reg = (elm, n) => elm != null ? elm[n] : '';
var doc = document;
var docb = doc.body;


var scrids = docb.innerHTML.match(/ember\d+/g);

async function smoothScrollUp(){
  for(var i=0; i<10000; i=i+100){
    await delay((Math.round(Math.random()) + 1));
	await window.scrollTo(0, (docb.scrollTop + i) / 2);
  }
}

async function smoothScrollDown(){
  for(var i=0; i<10000; i=i+100){
    await delay((Math.round(Math.random()) + 1));
	await window.scrollTo(0, (docb.scrollHeight + i) / 2);
  }
}
async function initScrolls(){
  await smoothScrollDown();
  await runrun();
  await smoothScrollUp();
}

function expander(classname) {
  var exp = document.getElementsByClassName(classname);
  for (var x = 0; x < exp.length; x++) {
    exp[x].click();
  }
}

function infiniteExpand(n) {
  var actionBtns = tn(doc, "button");
  for (var a = 0; a < actionBtns.length; a++) {
    var btn = actionBtns[a];
    if (btn != undefined && /more(?!…)/i.test(btn.innerText) === true) btn.click();
  }
}

async function runFirstExpansion() {
  for (x = 0; x < 10; x++) {
    await delay((Math.round(Math.random() * 100) + 1));
    infiniteExpand(x);
  }
  expander("lt-line-clamp__more");
}

async function runrun(){
  await runFirstExpansion();
  await expander("lt-line-clamp__more");
}

initScrolls()\
