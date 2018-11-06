function vld(elm, n) {  if (elm != null) {    return elm[n];  } else {    return '';  }}

var accomplished = document.getElementsByClassName("pv-accomplishments-section")[0];
var accomplishments = [];
function getAccomplishments(){
	if(accomplished != undefined){
		var sections = accomplished.getElementsByTagName("section");
		for(i=0; i<sections.length; i++){
			let key = vld(/\w+/.exec(sections[i].getElementsByClassName("pv-accomplishments-block__title")[0].innerText.toLowerCase()),0);
			let value = sections[i].getElementsByTagName("li");
			let valArr = [];
			for(v=0; v<value.length; v++){
				valArr.push(value[v].innerText);
			}
			accomplishments.push({"key": key, "value": valArr});
		}
	}
}

getAccomplishments()
JSON.stringify(accomplishments)
