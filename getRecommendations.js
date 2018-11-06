function vld(elm, n) {  if (elm != null) {    return elm[n];  } else {    return '';  }}

var recPanel = document.getElementsByTagName("artdeco-tabpanel");
var recommendations = [];

function getReceived(obj,n){

var recs = obj[n].getElementsByTagName("li");
for(i=0; i<recs.length; i++){
	let recId = vld(/\.com\/in\/(.+?)\//.exec(recs[i].getElementsByTagName("a")[0].href),1);
	let recName = recs[i].getElementsByTagName("h3")[0].innerText;
	let recTitle = recs[i].getElementsByTagName("p")[0].innerText;
	let recRelation = recs[i].getElementsByTagName("p")[1].innerText.replace(/\w{3,9}\s+\d+,\s+\d+,\s+/, '').replace(/\\n/g, '').trim();
	let recDate = vld(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d+,\s+\d+/.exec(recs[i].getElementsByTagName("p")[1].innerText),0);
	let recText = recs[i].getElementsByTagName("blockquote")[0].innerText.trim().replace(/\n/g, '\\n');
	if(n === 0){
		recommendations.push({"type": "received", "name": recName, "profile": recId, "title": recTitle, "relationship": recRelation, "date": recDate, "text": recText});
	}
	if(n === 1){
		recommendations.push({"type": "given", "name": recName, "profile": recId, "title": recTitle, "relationship": recRelation, "date": recDate, "text": recText});
	}
}
}
var rrg = new Promise(res=>{ res(getReceived(recPanel, 0));});

rrg.then(getReceived(recPanel, 1));

JSON.stringify(recommendations)
