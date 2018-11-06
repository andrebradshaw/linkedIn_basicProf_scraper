function scroller(){
setTimeout(()=>{
	window.scrollTo(0,(document.body.scrollHeight - document.body.scrollTop)/2);
},1);
setTimeout(()=>{
	window.scrollTo(0,document.getElementById("experience-section").scrollHeight);
},500);
setTimeout(()=>{
	window.scrollTo(0,document.body.scrollHeight);
},900);
setTimeout(()=>{
	window.scrollTo(0,document.getElementById("skill-categories-expanded").scrollHeight);
},1200);
}

function expander(classname){
  setTimeout(()=>{
	  var exp = document.getElementsByClassName(classname);
	  for(x=0; x<exp.length; x++){
		  exp[x].click();
	  }
  },2900);
}

function infiniteExpand(n){
setTimeout(()=>{
var actionBtns = document.getElementsByTagName("button");
for(a=0; a<actionBtns.length; a++){
	var btn = actionBtns[a];
	if(btn != undefined){
	if(/more(?!…)/i.test(btn.innerText) === true){
		btn.click();
	}
    }
}
},((n+1)*366));
}
function runFirstExpansion(){
for(x=0; x<8; x++){
	infiniteExpand(x);
}
}

var scr = new Promise(res =>{	res(scroller());});

scr.then(runFirstExpansion()).then(expander("lt-line-clamp__more"));
