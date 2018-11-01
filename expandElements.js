function expander(classname){
  setTimeout(()=>{
	  var exp = document.getElementsByClassName(classname);
	  for(x=0; x<exp.length; x++){
		  exp[x].click();
	  }
  },800);
}
function expandCondition(classname){
	for(i=0; i<document.getElementsByClassName(classname).length; i++){
		var btn = document.getElementsByClassName(classname)[i].getElementsByTagName("button")[0];
		var btnTxt = btn.innerText;
		if(/fewer|\bless\b/.test(btnTxt) === false) btn.click();
	}
}

var dscClassExp = "lt-line-clamp__more";
var expClassExp = "pv-profile-section__actions-inline ember-view";
var sumClassExp = "pv-top-card-section__summary-toggle-button pv-profile-section__card-action-bar artdeco-container-card-action-bar mt4";
var sklClassExp = "pv-profile-section__card-action-bar pv-skills-section__additional-skills artdeco-container-card-action-bar";
var recClassExp = "pv-profile-section__see-more-inline pv-profile-section__text-truncate-toggle link";


var expExp = new Promise(res =>{	res(expandCondition(expClassExp));});

expExp.then(expander(dscClassExp))
