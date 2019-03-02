var cn = (ob, nm) => ob ? ob.getElementsByClassName(nm) : console.log(ob);
var tn = (ob, nm) => ob.getElementsByTagName(nm);
var gi = (ob, nm) => ob.getElementById(nm);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var reg = (elm, n) => elm != null ? elm[n] : '';
var doc = document;
var docb = doc.body;

var rxs = /^.{0,9}(?=\s+–)/;
var rxe = /(?<=\s+–\s+).{0,9}/;
var nowPlus = new Date().getTime() + 60000;

var scrids = docb.innerHTML.match(/ember\d+/g);

function getUid() {
  var coda = tn(doc, 'code');
  for (d = 0; d < coda.length; d++) {
    var regXuid = /urn:li:fs_treasuryMedia:\((.{39}),\d+/;
    if (regXuid.test(coda[d].innerText) === true) {
      return regXuid.exec(coda[d].innerText)[1];
    }
  }
}

async function smoothScrollUp() {
  for (var i = 0; i > 10000; i = i - 100) {
    await delay((Math.round(Math.random()) + 1));
    await window.scrollTo(0, (docb.scrollTop + i) / 2);
  }
}

async function smoothScrollDown() {
  for (var i = 0; i < 10000; i = i + 100) {
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

async function runrun() {
  await runFirstExpansion();
  await expander("lt-line-clamp__more");
}

var vld = (elm, n) => elm != null ? elm[n] : '';
var checker = (elm, n) => elm[n] != undefined ? tn(elm[n], 'p')[0].innerText.replace(/\n/g, '<br>').replace(/"/g, "'").replace(/,/g, ';') : '';
var checker2 = (elm, n) => elm[n] != undefined ? elm[n].getElementsByTagName('span')[1].innerText.trim() : '';
var checkElmText = (elm, n) => elm[n] != undefined && elm[n] != null ? elm[n].innerText.trim() : '';

var formatNow = "15 " + /(?<=\w{3}\s+)\w{3}/.exec(new Date())[0] + ' ' + new Date().getFullYear();

function clickContact() { 
	if(cn(doc, 'pv-top-card-v2-section__links')[0]) Array.from(tn(cn(doc, 'pv-top-card-v2-section__links')[0],'a')).map(itm=> {
		if (/contact-info/.test(itm.href)) itm.click();
    });
}
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
  var workExperience = gi(doc, 'experience-section');
  var work_exp_v1 = cn(workExperience, 'pv-entity__summary-info');
  var work_exp_v2 = cn(workExperience, 'pv-entity__position-group mt2');

  function parseWorkType1(obj) {
    for (var w = 0; w < obj.length; w++) {
      var workliContainer1 = obj[w].parentElement.parentElement;
      var companyName = tn(tn(workliContainer1, 'h4')[0], 'span')[1].innerText.trim();

      var companyId = vld(/\d+/.exec(tn(workliContainer1, 'a')[0].href), 0);

      var jobTitle = tn(workliContainer1, 'h3')[0].innerText.trim();
      var dates = tn(tn(workliContainer1, 'h4')[1], 'span')[1].innerText.trim();
      var geo = tn(tn(workliContainer1, 'h4')[3], 'span')[1].innerText.trim();
      var desc = checker(cn(workliContainer1, 'pv-entity__extra-details'), 0);
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
    for (var w = 0; w < obj.length; w++) {
      var deetz = cn(obj[w], 'pv-entity__position-group-role-item');
      var companyName = tn(tn(obj[w].parentElement, 'h3')[0], 'span')[1].innerText.trim();
      var companyId = vld(/\d+/.exec(tn(obj[w].parentElement, 'a')[0].href), 0);

      for (var ul = 0; ul < deetz.length; ul++) {
        var jobTitle = tn(tn(deetz[ul], 'h3')[0], 'span')[1].innerText.trim();
        var dates = tn(tn(deetz[ul], 'h4')[0], 'span')[1].innerText.trim();
        var geo = tn(tn(deetz[ul], 'h4')[2], 'span')[1].innerText.trim();
        var desc = checker(cn(deetz[ul], 'pv-entity__extra-details'), 0);
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
  }
  parseWorkType1(work_exp_v1);
  parseWorkType2(work_exp_v2);
  var nowPlus = new Date().getTime() + 60000;
  experience.sort((a, b) => Number(new Date(b.end).getTime(), nowPlus) - Number(new Date(a.end).getTime(), nowPlus));
}


function getEducationalExperience() {
  var educationExperience = gi(doc, 'education-section');
  var edu_exp = cn(educationExperience, 'pv-education-entity');
  for (var w = 0; w < edu_exp.length; w++) {
    var eduId = vld(/\d+/.exec(edu_exp[w].getElementsByTagName("a")[0].href), 0);
    var eduInfo = cn(edu_exp[w], 'pv-entity__degree-info')[0];
    var eduName = tn(eduInfo, 'h3')[0].innerText;
    var edeg = vld(/Field Of Study\n(.+)/.exec(eduInfo.innerText), 1).trim();
    var ename = vld(/Degree Name\n(.+)/.exec(eduInfo.innerText), 1);
    var eduDeg = ename + ' ' + edeg;
    var dates = checker2(cn(edu_exp[w], 'pv-entity__dates'), 0);
    var start = dateParser(vld(rxs.exec(dates), 0));
    var end = dateParser(vld(rxe.exec(dates), 0));
    education.push({
      "eduName": eduName,
      "eduId": eduId,
      "eduDeg": eduDeg,
      "start": start,
      "end": end
    });
  }
  education.sort((a, b) => Number(new Date(b.end).getTime(), nowPlus) - Number(new Date(a.end).getTime(), nowPlus));
}

async function getRecommendations() {
  var recPanel = tn(doc, 'artdeco-tabpanel');
  function getReceived(obj, n) {
    var recs = tn(obj[n], 'li');
    for (i = 0; i < recs.length; i++) {
      var recId = vld(/\.com\/in\/(.+?)\//.exec(tn(recs[i], 'a')[0].href), 1);
      var recName = tn(recs[i], 'h3')[0].innerText;
      var recTitle = tn(recs[i], 'p')[0].innerText;
      var recRelation = tn(recs[i], 'p')[1].innerText.replace(/\w{3,9}\s+\d+,\s+\d+,\s+/, '').replace(/\\n/g, '').trim();
      var recDate = vld(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d+,\s+\d+/.exec(tn(recs[i], 'p')[1].innerText), 0);
      var recText = tn(recs[i], 'blockquote')[0].innerText.trim().replace(/\n/g, '\\n');
      if (n == 0) {
        recommendations.push({
          "type": "received",
          "name": recName,
          "profile": recId,
          "title": recTitle,
          "relationship": recRelation,
          "date": recDate,
          "text": recText
        });
      }
      if (n == 1) {
        recommendations.push({
          "type": "given",
          "name": recName,
          "profile": recId,
          "title": recTitle,
          "relationship": recRelation,
          "date": recDate,
          "text": recText
        });
      }
    }
  }
  await getReceived(recPanel, 0);
  await getReceived(recPanel, 1);
}

function getSkills() {
    var expandedSkills = gi(doc,'skill-categories-expanded');
    var topSkills = cn(doc,'pv-skill-categories-section__top-skills');
    var allSkills = cn(doc,'pv-skill-category-entity__skill-wrapper');
    for (s = 0; s < allSkills.length; s++) {
      let skillname = cn(allSkills[s],'pv-skill-category-entity__name')[0].innerText;
      let count = parseInt(cn(allSkills[s],'pv-skill-category-entity__endorsement-count')[0].innerText.replace(/\+/, ''));
      skills.push({
        "name": skillname,
        "count": count
      });
    }
}

function getAccomplishments() {
    var accomplished = cn(doc,'pv-accomplishments-section')[0];
    if (accomplished != undefined) {
      var sections = tn(accomplished,'section');
      for (i = 0; i < sections.length; i++) {
        let key = vld(/\w+/.exec(cn(sections[i],'pv-accomplishments-block__title')[0].innerText.toLowerCase()), 0);
        let value = tn(sections[i],'li');
        let valArr = [];
        for (v = 0; v < value.length; v++) {
          valArr.push(value[v].innerText);
        }
        accomplishments.push({
          "key": key,
          "value": valArr
        });
      }
    }
}
function getUid() {
  var coda = tn(doc,'code');
  for (d = 0; d < coda.length; d++) {
    let regXuid = /urn:li:fs_treasuryMedia:\((.{39}),\d+/;
    if (regXuid.test(coda[d].innerText) === true) {
      return regXuid.exec(coda[d].innerText)[1];
    }
  }
}
async function getPID() {
	await delay(444);
    var infoCont = document.getElementsByClassName("pv-top-card-v2-section__info");
    var fullname = checkElmText(infoCont[0].getElementsByTagName("h1"), 0);
    var headline = checkElmText(infoCont[0].getElementsByTagName("h2"), 0);
    var geo = checkElmText(infoCont[0].getElementsByTagName("h3"), 0);
    var summary = checkElmText(document.getElementsByClassName("pv-top-card-section__summary-text"), 0);
    var container = document.getElementById("artdeco-modal-outlet").getElementsByClassName("pv-profile-section__section-info section-info")[0];
    var phones = checkElmText(container.getElementsByClassName("ci-phone"), 0);
    var websites = checkElmText(container.getElementsByClassName("ci-websites"), 0);
    var emails = checkElmText(container.getElementsByClassName("ci-email"), 0);
    var twitter = checkElmText(container.getElementsByClassName("ci-twitter"), 0);

    pidInformation.push({
      "fullname": fullname,
      "headline": headline,
      "city": geo,
      "summary": summary,
      "phones": phones,
      "websites": websites,
      "emails": emails,
      "twitter": twitter
    });
}

function fullObject() {
  var namedPath = vld(/com\/in\/(.+?)\//.exec(window.location.href), 1);
    var linkedinProfile = {
      "lid": getUid(),
      "path": namedPath,
      "personal": pidInformation,
      "experience": experience,
      "education": education,
      "skills": skills,
      "recommendations": recommendations,
      "accomplishments": accomplishments
    };
    var outputObj = JSON.stringify(linkedinProfile);
	return linkedinProfile;
}
async function initScrolls() {
  await smoothScrollDown();
  await runrun();
  await smoothScrollUp();
  await getJobExperience();
  await getEducationalExperience();
  await getRecommendations();
  await getAccomplishments();
  await getSkills();
  await clickContact();
  await getPID();
  var profObj = await fullObject();
console.log(profObj)
}

initScrolls()
