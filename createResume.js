var doc = document;

function createResume(doc, profObj){
  var cDiv = doc.createElement('div');
  cDiv.setAttribute('id', 'resume-pop');
  cDiv.style.backgound = 'white';
  cDiv.style.width = '80%';
  cDiv.style.height = '80%';
  cDiv.style.position = 'fixed';
  cDiv.style.top = '100px';
  cDiv.style.zIndex = '10001';
  doc.body.appendChild(cDiv);
 
  var arr = profObj.experience;

  for(var i = 0; i<arr.length; i++){
    var ex = doc.createElement('div');
	ex.setAttribute('class', 'expCont');
    ex.style.background = 'white';
    ex.style.border = '1px solid black';
    ex.style.padding = '6px';
	cDiv.appendChild(ex);

    var c = doc.createElement('div');
	c.setAttribute('class', 'expCompany');
    c.style.width = '90%';
    c.style.height = '10%';
    ex.appendChild(c);

    var cl = doc.createElement('a');
	cl.setAttribute('href', '/company/'+arr[i].companyId);
	cl.innerText = arr[i].companyName;
    c.appendChild(cl);

    var t = doc.createElement('div');
	t.setAttribute('class', 'expTitle');
    t.innerText = arr[i].jobTitle;
    ex.appendChild(t);

    var gz = doc.createElement('div');
	gz.setAttribute('class', 'expGeoTime');
    ex.appendChild(gz);

    var g = doc.createElement('span');
    g.innerText = arr[i].geo;
    gz.appendChild(g);

    var z = doc.createElement('i');
    z.innerText = arr[i].start + ' - ' + arr[i].end;
	z.style.float = 'right';
    g.appendChild(z);

    var d = doc.createElement('div');
	d.setAttribute('class', 'expDesc');
    d.innerHTML = arr[i].description.replace(/See less/, '');
    ex.appendChild(d);

  }

}

createResume(doc,jdat)
// document.body.removeChild(document.getElementById('resume-pop'))
