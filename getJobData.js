
function getJobData(){
function grp(elm,n){if(elm != null){return elm[n].trim();}else{return '';}}
function formatNow(){	var d = new Date();	var m = /(?<=\w{3}\s+)\w{3}/.exec(d)[0];	return "15 "+m+' '+d.getFullYear();}

function dateParser(str){	var xmonths = /Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/;	var xPres = /Present/;	if(/\d+/.test(str) === true || xPres.test(str)){		if(xmonths.test(str) === true){			return ("15 "+str).trim();		}else if(xPres.test(str) === true){
			return formatNow();		}else{
			return ("15 Jul "+str).trim();		}
	}else{		return '';	}}

var regXcoName = "(?<=Company Name).+";
var regXtitle = "^.+";
var regXmTitle = "(?<=Title\\B).+"; 
var regXdates = "(?<=Dates Employed).+";
var regXgeo = "(?<=Location).+";
var rxs = /^.{0,9}(?=\s+–)/;
var rxe = /(?<=\s+–\s+).{0,9}/;

var jobs = document.getElementById("oc-background-section").getElementsByClassName("pv-entity__position-group-pager ember-view");

function parseJob(str){
	var str = str.trim();
	var oneline = str.replace(/\n/g, '\\n').replace(/'|"/g, "\'");
	var co = grp(new RegExp(regXcoName).exec(str),0);
	var ti = grp(new RegExp(regXtitle).exec(str),0);
	var da = grp(new RegExp(regXdates).exec(str),0);
	var ge = grp(new RegExp(regXgeo).exec(str),0);
	
	var start = dateParser(grp(rxs.exec(da),0));
	var end = dateParser(grp(rxe.exec(da),0));

	var company = '"company":"'+co+'"';
	var title = '"title":"'+ti+'"';
	var sdate = '"start_date":"'+start+'"';
	var edate = '"end_date":"'+end+'"';
	var geo = '"local":"'+ge+'"';
	var descr = '"description":"'+oneline.replace(/.+?Location.{0,30}?\\n/, '')+'"';
return '{'+company+','+title+','+geo+','+sdate+','+edate+','+descr+'}';
}

function parseJob2(str){
	var containStr = '';
	var str = str.trim();
	var oneline = str.replace(/\n/g, '\\n').replace(/'|"/g, "\'");
	
	var com = str.match(new RegExp(regXcoName, "g"));
	var tim = str.match(new RegExp(regXmTitle, "g"));
	var dam = str.match(new RegExp(regXdates, "g"));
	var gem = str.match(new RegExp(regXgeo, "g"));
	var dem = oneline.match(/(?<=Location.{0,30}?\\n).+?(?=\\nTitle\B)|(?<=Location.{0,30}?\\n).+?$/g);
	for(m=0; m<tim.length; m++){
		var co = com[0];
		var ti = tim[m];
		var da = dam[m];
		var ge = gem[m];
		var de = dem[m];
		var start = dateParser(grp(rxs.exec(da),0));
		var end = dateParser(grp(rxe.exec(da),0));

		var company = '"company":"'+co+'"';
		var title = '"title":"'+ti+'"';
		var sdate = '"start_date":"'+start+'"';
		var edate = '"end_date":"'+end+'"';
		var geo = '"local":"'+ge+'"';
		var descr = '"description":"'+de+'"';
		var containStr = containStr + '{'+company+','+title+','+geo+','+sdate+','+edate+','+descr+'}';
	}
	return containStr;
}

var output = '';

for(j=0; j<jobs.length; j++){
	if(/\nTitle\B/m.test(jobs[j].innerText) === false){
		var output = output + parseJob(jobs[j].innerText);
	}else{
		var output = output + parseJob2(jobs[j].innerText);
	}
	
}
return '['+output.replace(/\}\{/g, '},{')+']';
}


