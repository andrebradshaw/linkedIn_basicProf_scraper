function formatNow(){	var d = new Date();	var m = /(?<=\w{3}\s+)\w{3}/.exec(d)[0];	return "15 "+m+' '+d.getFullYear();}
function dateParser(str){	var xmonths = /Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/;	var xPres = /Present/;	if(/\d+/.test(str) === true || xPres.test(str)){		if(xmonths.test(str) === true){			return ("15 "+str).trim();		}else if(xPres.test(str) === true){
			return formatNow();		}else{
			return ("15 Jul "+str).trim();		}
	}else{		return '';	}}
function vld(elm, n) {  if (elm != null) {    return elm[n];  } else {    return '';  }}
function checker(elm, n){	if(elm[n] != undefined) {	return elm[n].getElementsByTagName("p")[0].innerText.replace(/\n/g, '__ ').replace(/"/g, "'").replace(/,/g, ';');} else {	return '';}}
function checker2(elm, n){	if(elm[n] != undefined) {	return elm[n].getElementsByTagName("span")[1].innerText.trim();;} else {	return '';}}

var rxs = /^.{0,9}(?=\s+–)/;
var rxe = /(?<=\s+–\s+).{0,9}/;

var eduContainArr = [];

var educationExperience = document.getElementById("education-section");

var edu_exp = educationExperience.getElementsByClassName("pv-education-entity");

function parseEdu(obj) {
  for (w = 0; w < edu_exp.length; w++) {
	let eduId = vld(/\d+/.exec(edu_exp[w].getElementsByTagName("a")[0].href),0);
	let eduInfo = edu_exp[w].getElementsByClassName("pv-entity__degree-info")[0]
	let eduName = eduInfo.getElementsByTagName("h3")[0].innerText;
	let eduDeg = vld(/Degree Name\n(.+)/.exec(eduInfo.innerText),1) +' '+ vld(/Field Of Study\n(.+)/.exec(eduInfo.innerText),1).trim();
	let dates = checker2(edu_exp[w].getElementsByClassName("pv-entity__dates"),0);
		let start = dateParser(vld(rxs.exec(dates),0));
		let end = dateParser(vld(rxe.exec(dates),0));
	eduContainArr.push({"eduName": eduName, "eduId": eduId, "eduDeg": eduDeg, "start": start, "end": end});
  }

}
parseEdu(edu_exp);

var nowPlus = new Date().getTime() + 60000;

var education = eduContainArr.sort((a, b) => Number(new Date(b.end).getTime(),nowPlus) - Number(new Date(a.end).getTime(),nowPlus));
JSON.stringify(education);
