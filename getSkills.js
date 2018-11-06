var expandedSkills = document.getElementById("skill-categories-expanded");
var topSkills = document.getElementById("pv-skill-categories-section__top-skills");
var allSkills = document.getElementsByClassName("pv-skill-category-entity__skill-wrapper");

var skills = [];
for(s=0; s<allSkills.length; s++){
let skillname = allSkills[s].getElementsByClassName("pv-skill-category-entity__name")[0].innerText;
let count = parseInt(allSkills[s].getElementsByClassName("pv-skill-category-entity__endorsement-count")[0].innerText.replace(/\+/, ''));
skills.push({"name": skillname, "count": count})
} 
JSON.stringify(skills)
