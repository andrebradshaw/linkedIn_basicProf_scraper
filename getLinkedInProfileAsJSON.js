function formatNow() {
  var d = new Date();
  var m = /(?<=\w{3}\s+)\w{3}/.exec(d)[0];
  return "15 " + m + ' ' + d.getFullYear();
}

function dateParser(str) {
  var xmonths = /Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/;
  var xPres = /Present/;
  if (/\d+/.test(str) === true || xPres.test(str)) {
    if (xmonths.test(str) === true) {
      return ("15 " + str).trim();
    } else if (xPres.test(str) === true) {
      return formatNow();
    } else {
      return ("15 Jul " + str).trim();
    }
  } else {
    return '';
  }
}

function vld(elm, n) {
  if (elm != null) {
    return elm[n];
  } else {
    return '';
  }
}

function checker(elm, n) {
  if (elm[n] != undefined) {
    return elm[n].getElementsByTagName("p")[0].innerText.replace(/\n/g, '__ ').replace(/"/g, "'").replace(/,/g, ';');
  } else {
    return '';
  }
}

function checker2(elm, n) {
  if (elm[n] != undefined) {
    return elm[n].getElementsByTagName("span")[1].innerText.trim();
  } else {
    return '';
  }
}

function checkElmText(elm, n) {
  if (elm[n] != undefined && elm[n] != null) {
    return elm[n].innerText.trim();
  } else {
    return '';
  }
}



function scroller() {
  setTimeout(() => {
    window.scrollTo(0, (document.body.scrollHeight - document.body.scrollTop) / 2);
  }, 1);
  setTimeout(() => {
    window.scrollTo(0, document.getElementById("experience-section").scrollHeight);
  }, 500);
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 800);
  setTimeout(() => {
    window.scrollTo(0, (document.body.scrollHeight - document.body.scrollTop) / 2);
  }, 1100);
  setTimeout(() => {
    window.scrollTo(0, (document.getElementById("experience-section").scrollHeight - document.body.scrollHeight));
  }, 1200);
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 1400);
}

function expander(classname) {
  setTimeout(() => {
    var exp = document.getElementsByClassName(classname);
    for (x = 0; x < exp.length; x++) {
      exp[x].click();
    }
  }, 1800);
}

function infiniteExpand(n) {
  setTimeout(() => {
    var actionBtns = document.getElementsByTagName("button");
    for (a = 0; a < actionBtns.length; a++) {
      var btn = actionBtns[a];
      if (btn != undefined) {
        if (/more(?!…)/i.test(btn.innerText) === true) {
          btn.click();
        }
      }
    }
  }, ((n + 1) * 366));
}

function runFirstExpansion() {
  for (x = 0; x < 8; x++) {
    infiniteExpand(x);
  }
}

function clickContact() {
  setTimeout(() => {
    var contCont = document.getElementsByClassName("pv-top-card-v2-section__links")[0];
    if (contCont != undefined) {
      var atags = contCont.getElementsByTagName("a");
      for (i = 0; i < atags.length; i++) {
        if (/contact-info/.test(atags[i].href) === true) {
          atags[i].click();
        }
      }
    }
  }, 2200);
}

function killDialog() {
  setTimeout(() => {
    document.getElementById("artdeco-modal-outlet").getElementsByClassName("artdeco-dismiss")[0].click();
  }, 3900);
}

var scr = new Promise(res => {
  res(scroller());
});
var nowPlus = new Date().getTime() + 60000;

var recommendations = [];
var accomplishments = [];
var pidInformation = [];
var experience = [];
var education = [];
var skills = [];

function getUid() {
  var coda = document.getElementsByTagName("code");
  for (d = 0; d < coda.length; d++) {
    let regXuid = /urn:li:fs_treasuryMedia:\((.{39}),\d+/;
    if (regXuid.test(coda[d].innerText) === true) {
      return regXuid.exec(coda[d].innerText)[1];
    }
  }
}

function dl(filename, text) {
  var file = new Blob([text], {
    type: 'data:text/plain;charset=utf-8'
  });
  var fileURL = URL.createObjectURL(file);
  window.open(fileURL);
}

function fullObject() {
  var namedPath = vld(/com\/in\/(.+?)\//.exec(window.location.href), 1);
  setTimeout(() => {
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
    console.log(outputObj);

    dl(namedPath + '.json', outputObj)
  }, 3900);
}
var rxs = /^.{0,9}(?=\s+–)/;
var rxe = /(?<=\s+–\s+).{0,9}/;


function getJobExperience() {
  setTimeout(() => {
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
        let desc = checker(workliContainer1.getElementsByClassName("pv-entity__extra-details"), 0);
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
  }, 3000);
}


function getEducationalExperience() {
  setTimeout(() => {
    var educationExperience = document.getElementById("education-section");
    var edu_exp = educationExperience.getElementsByClassName("pv-education-entity");

    function parseEdu(obj) {
      for (w = 0; w < edu_exp.length; w++) {
        let eduId = vld(/\d+/.exec(edu_exp[w].getElementsByTagName("a")[0].href), 0);
        let eduInfo = edu_exp[w].getElementsByClassName("pv-entity__degree-info")[0]
        let eduName = eduInfo.getElementsByTagName("h3")[0].innerText;
        let eduDeg = (vld(/Degree Name\n(.+)/.exec(eduInfo.innerText), 1) + ' ' + vld(/Field Of Study\n(.+)/.exec(eduInfo.innerText), 1)).trim();
        let dates = checker2(edu_exp[w].getElementsByClassName("pv-entity__dates"), 0);
        let start = dateParser(vld(rxs.exec(dates), 0));
        let end = dateParser(vld(rxe.exec(dates), 0));
        education.push({
          "eduName": eduName,
          "eduId": eduId,
          "eduDeg": eduDeg,
          "start": start,
          "end": end
        });
      }

    }
    parseEdu(edu_exp);
    education.sort((a, b) => Number(new Date(b.end).getTime(), nowPlus) - Number(new Date(a.end).getTime(), nowPlus));
  }, 3000);
}

function getRecommendations() {
  setTimeout(() => {
    var recPanel = document.getElementsByTagName("artdeco-tabpanel");

    function getReceived(obj, n) {
      var recs = obj[n].getElementsByTagName("li");
      for (i = 0; i < recs.length; i++) {
        let recId = vld(/\.com\/in\/(.+?)\//.exec(recs[i].getElementsByTagName("a")[0].href), 1);
        let recName = recs[i].getElementsByTagName("h3")[0].innerText;
        let recTitle = recs[i].getElementsByTagName("p")[0].innerText;
        let recRelation = recs[i].getElementsByTagName("p")[1].innerText.replace(/\w{3,9}\s+\d+,\s+\d+,\s+/, '').replace(/\\n/g, '').trim();
        let recDate = vld(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d+,\s+\d+/.exec(recs[i].getElementsByTagName("p")[1].innerText), 0);
        let recText = recs[i].getElementsByTagName("blockquote")[0].innerText.trim().replace(/\n/g, '\\n');
        if (n === 0) {
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
        if (n === 1) {
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
    var rrg = new Promise(res => {
      res(getReceived(recPanel, 0));
    });
    rrg.then(getReceived(recPanel, 1));
  }, 3000);
}

function getSkills() {
  setTimeout(() => {
    var expandedSkills = document.getElementById("skill-categories-expanded");
    var topSkills = document.getElementById("pv-skill-categories-section__top-skills");
    var allSkills = document.getElementsByClassName("pv-skill-category-entity__skill-wrapper");
    for (s = 0; s < allSkills.length; s++) {
      let skillname = allSkills[s].getElementsByClassName("pv-skill-category-entity__name")[0].innerText;
      let count = parseInt(allSkills[s].getElementsByClassName("pv-skill-category-entity__endorsement-count")[0].innerText.replace(/\+/, ''));
      skills.push({
        "name": skillname,
        "count": count
      });
    }
  }, 3000);
}

function getAccomplishments() {
  setTimeout(() => {
    var accomplished = document.getElementsByClassName("pv-accomplishments-section")[0];
    if (accomplished != undefined) {
      var sections = accomplished.getElementsByTagName("section");
      for (i = 0; i < sections.length; i++) {
        let key = vld(/\w+/.exec(sections[i].getElementsByClassName("pv-accomplishments-block__title")[0].innerText.toLowerCase()), 0);
        let value = sections[i].getElementsByTagName("li");
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
  }, 3000);
}

function getPID() {
  setTimeout(() => {
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
  }, 3000);
}
scr.then(runFirstExpansion()).then(expander("lt-line-clamp__more")).then(clickContact())
  .then(getJobExperience())
  .then(getEducationalExperience())
  .then(getRecommendations())
  .then(getAccomplishments())
  .then(getPID())
  .then(killDialog())
  .then(fullObject())
