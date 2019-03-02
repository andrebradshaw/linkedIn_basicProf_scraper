var cn = (ob, nm) => ob.getElementsByClassName(nm);
var tn = (ob, nm) => ob.getElementsByTagName(nm);
var gi = (ob, nm) => ob.getElementById(nm);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var reg = (elm, n) => elm != null ? elm[n] : '';
var doc = document;
var docb = doc.body;

var rxs = /^.{0,9}(?=\s+–)/;
var rxe = /(?<=\s+–\s+).{0,9}/;

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

async function initScrolls(){
  await smoothScrollDown();
  await runrun();
  await smoothScrollUp();
  await getJobExperience();
}

var vld = (elm, n) => elm != null ? elm[n] : '';
var checker = (elm, n) => elm[n] != undefined ? tn(elm[n],'p')[0].innerText.replace(/\n/g, '<br>').replace(/"/g, "'").replace(/,/g, ';') : '';
var checker2 = (elm, n) => elm[n] != undefined ? elm[n].getElementsByTagName("span")[1].innerText.trim() : '';
var checkElmText = (elm, n) => elm[n] != undefined && elm[n] != null ? elm[n].innerText.trim() : '';

var formatNow = "15 " + /(?<=\w{3}\s+)\w{3}/.exec(new Date())[0] + ' ' + new Date().getFullYear();


function dateParser(str) {
  var xmonths = /Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/;
  var xPres = /Present/;
  if (/\d+/.test(str) === true || xPres.test(str)) {
    if (xmonths.test(str) === true) {
      return ("15 " + str).trim();
    } else if (xPres.test(str) === true) {
      return formatNow;
    } else {
      return ("15 Jul " + str).trim();
    }
  } else {
    return '';
  }
}

var recommendations = [];
var accomplishments = [];
var pidInformation = [];
var experience = [];
var education = [];
var skills = [];


function getJobExperience() {
    var workExperience = gi(doc,'experience-section');
    var work_exp_v1 = cn(workExperience,'pv-entity__summary-info');
    var work_exp_v2 = cn(workExperience,'pv-entity__position-group mt2');

    function parseWorkType1(obj) {
      for (w = 0; w < obj.length; w++) {
        var workliContainer1 = obj[w].parentElement.parentElement;
        var companyName = tn(tn(workliContainer1, 'h4')[0],'span')[1].innerText.trim();

        var companyId = vld(/\d+/.exec(tn(workliContainer1,'a')[0].href), 0);

        var jobTitle = tn(workliContainer1,'h3')[0].innerText.trim();
        var dates = tn(tn(workliContainer1,'h4')[1],'span')[1].innerText.trim();
        var geo = tn(tn(workliContainer1,'h4')[3],'span')[1].innerText.trim();
		var desc = checker(cn(workliContainer1,'pv-entity__extra-details'), 0);
        var start = dateParser(vld(rxs.exec(dates), 0));
        var end = dateParser(vld(rxe.exec(dates), 0));
        experience.push({
          "companyName": companyName,
          "companyId": companyId,
          "jobTitle": jobTitle,
          "geo": geo,
          "start": start,
          "end": end,
          "description": desc
        });
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
          let desc = checker(deetz[ul].getElementsByClassName("pv-entity__extra-details"), 0);
          let start = dateParser(vld(rxs.exec(dates), 0));
          let end = dateParser(vld(rxe.exec(dates), 0));

          experience.push({
            "companyName": companyName,
            "companyId": companyId,
            "jobTitle": jobTitle,
            "geo": geo,
            "start": start,
            "end": end,
            "description": desc
          });
        }
      }
    }
    parseWorkType1(work_exp_v1);
    parseWorkType2(work_exp_v2);
    var nowPlus = new Date().getTime() + 60000;
    experience.sort((a, b) => Number(new Date(b.end).getTime(), nowPlus) - Number(new Date(a.end).getTime(), nowPlus));
}

initScrolls()
// var scr = new Promise(res =>{	res(scroller());});

// scr.then(runFirstExpansion()).then(expander("lt-line-clamp__more"));
