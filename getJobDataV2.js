function vld(elm, n) {  if (elm != null) {    return elm[n];  } else {    return '';  }}
function checker(elm, n){	if(elm[n] != undefined) {	return elm[n].getElementsByTagName("p")[0].innerText.replace(/\n/g, '__ ').replace(/"/g, "'").replace(/,/g, ';');} else {	return '';}}

var workExperience = document.getElementById("experience-section");

var work_exp_v1 = workExperience.getElementsByClassName("pv-entity__summary-info");
var work_exp_v2 = workExperience.getElementsByClassName("pv-entity__position-group mt2");

function parseWorkType1(obj) {
  for (w = 0; w < obj.length; w++) {
    let workliContainer1 = obj[w].parentElement.parentElement;
    let companyName = workliContainer1.getElementsByTagName("h4")[0].getElementsByTagName("span")[1].innerText.trim();
    let companyId = vld(/\d+/.exec(workliContainer1.getElementsByTagName("a")[0].href), 0);
    let jobTitle = workliContainer1.getElementsByTagName("h3")[0].innerText.trim();
    let dates = workliContainer1.getElementsByTagName("h4")[1].getElementsByTagName("span")[1].innerText.trim();
    let geo = workliContainer1.getElementsByTagName("h4")[3].getElementsByTagName("span")[1].innerText.trim();
	let desc = checker(workliContainer1.getElementsByClassName("pv-entity__extra-details"),0);
    console.log(companyName + companyId + jobTitle + dates + geo + desc);
  }
}

function parseWorkType2(obj) {
  for (w = 0; w < obj.length; w++) {
    let deetz = obj[w].getElementsByClassName("pv-entity__position-group-role-item");
    let companyName = obj[w].parentElement.getElementsByTagName("h3")[0].getElementsByTagName("span")[1].innerText.trim();
    let companyId = vld(/\d+/.exec(obj[w].parentElement.getElementsByTagName("a")[0].href), 0);

    for (ul = 0; ul < deetz.length; ul++) {
      let jobTitle = deetz[ul].getElementsByTagName("h3")[0].getElementsByTagName("span")[1].innerText.trim();
      let dates = deetz[ul].getElementsByTagName("h4")[0].getElementsByTagName("span")[1].innerText.trim();
      let geo = deetz[ul].getElementsByTagName("h4")[2].getElementsByTagName("span")[1].innerText.trim();
	  let desc = checker(deetz[ul].getElementsByClassName("pv-entity__extra-details"),0);
      console.log(companyName + jobTitle + dates + geo + desc);
    }
  }

}

parseWorkType2(work_exp_v2)
