
function checkElmText(elm,n){if(elm[n] != undefined){return elm[n].innerText.trim();}else{ return '';}}

var infoCont = document.getElementsByClassName("pv-top-card-v2-section__info");

var fullname = checkElmText(infoCont[0].getElementsByTagName("h1"),0);
var headline = checkElmText(infoCont[0].getElementsByTagName("h2"),0);
var geo = checkElmText(infoCont[0].getElementsByTagName("h3"),0);
var summary = checkElmText(document.getElementsByClassName("pv-top-card-section__summary-text"),0);

var pidInformation = [];

function clickContact(){
setTimeout(() => {
	var contCont = document.getElementsByClassName("pv-top-card-v2-section__links")[0];
	if(contCont != undefined){
		var atags = contCont.getElementsByTagName("a");
		for(i=0; i<atags.length; i++){
			if(/contact-info/.test(atags[i].href) === true){
				atags[i].click();
			}
		}
	}
},2980);
}

function getContact(){
	setTimeout(() => {
		var container = document.getElementById("artdeco-modal-outlet").getElementsByClassName("pv-profile-section__section-info section-info")[0];		
		var phones = checkElmText(container.getElementsByClassName("ci-phone"),0);
		var websites = checkElmText(container.getElementsByClassName("ci-websites"),0);
		var emails = checkElmText(container.getElementsByClassName("ci-email"),0);
		var twitter = checkElmText(container.getElementsByClassName("ci-twitter"),0);

		pidInformation.push({"fullname": fullname, "headline": headline, "city": geo, "summary": summary, "phones": phones, "websites": websites, "emails": emails, "twitter": twitter});
console.log(JSON.stringify(pidInformation));

    },3500);
}
function killDialog(){
setTimeout(()=>{
document.getElementById("artdeco-modal-outlet").getElementsByClassName("artdeco-dismiss")[0].click();
},3800);
}
var openContact = new Promise(res=>{ res(clickContact());});


openContact.then(getContact()).then(killDialog());
