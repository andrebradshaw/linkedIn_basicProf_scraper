function vld(elm, n) {  if (elm != null) {    return elm[n];  } else {    return '';  }}

var recommendationCont = document.getElementsByClassName("pv-profile-section pv-recommendations-section");
if(recommendationCont[0] != undefined){
	var rg = recommendationCont[0].getElementsByClassName("artdeco-scrolling-container")[0].getElementsByTagName("artdeco-tablist")[0].innerText;
	var given = vld(/(?<=Given \()\d+/.exec(rg),0);
	var received = vld(/(?<=Received \()\d+/.exec(rg),0);
	console.log(given);
}
