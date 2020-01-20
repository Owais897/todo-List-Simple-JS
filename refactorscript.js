let i = 1;
var uniAr = [];
var asd;
var xhr;
var linebreak = document.createElement("br");
var checkEdit = false;

// var buttonDesign = " btn-group btn btn-primary  "
var buttonDesign = "ml-4  d-inline p-2 bg-primary text-white blank-5";

// setInterval(load, 1000);
// setInterval(function () {

var chatinput = document.getElementById("prod").value;
if (chatinput == "" || chatinput.length == 0 || chatinput == null) {
  // Invalid... Box is empty
  if (checkEdit == false) {
    // uniAr = [];
    save();
    uniAr = [];

    document.getElementById("con").innerHTML = "";
    load();
  }
}

// }, 3000);

function load() {
  i = 1;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://nodedatastore.herokuapp.com/owais");
  xhr.send();
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
      // xhr.status === 200
      console.log("i am in load");

      ourdata = JSON.parse(xhr.responseText);
      ourdata.forEach(functionRenderFromServer);
      save();
      // console.log('ourdata in load', ourdata);
    } else {
      console.log("i m error in load");
    }
  };
}

function editBoxButton(value, position, id) {
  var btn = document.createElement("BUTTON");
  btn.setAttribute("id", i + 10000);
  btn.className = buttonDesign;

  btn.innerHTML = "edit label";
  btn.onclick = function() {
    checkEdit = true;
    value = prompt("edit this text", value);
    uniAr[position].val = value;
    document.getElementById(id).innerHTML = value;
    save();
    checkEdit = false;
  };

  return btn;
}

function deleteBox(value, position, id, id2) {
  var del = document.createElement("BUTTON");
  let b = i;
  del.setAttribute("id", b);
  del.className = buttonDesign;
  del.innerHTML = "delete";
  del.onclick = function() {
    uniAr.splice(position, 1);
    save();
    // delete uniAr[position];

    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
    var element = document.getElementById(id2);
    element.parentNode.removeChild(element);
    var element = document.getElementById(b);
    element.parentNode.removeChild(element);
    var element = document.getElementById(b + 10000);
    element.parentNode.removeChild(element);

    // document.location.reload(true)
    location.reload(true);
    // document.getElementById(id).innerHTML = null;
    // document.getElementById(b).style.visibility = 'hidden'; // del but
    // document.getElementById(id2).style.visibility = 'hidden'; // chkBox
    // document.getElementById(b + 10000).style.visibility = 'hidden'; // editBox

    // return null;
  };

  return del;
}

function onclick(id, id2, asd, i) {
  var x = document.getElementById(id);
  asd = document.getElementById(id2).checked;

  if (x.style.textDecoration === "line-through") {
    x.style.textDecoration = "none";
    asd = false;
  } else {
    x.style.textDecoration = "line-through";
    asd = true;
  }
  console.log("i: ", i);
  // uniArr[i]
  uniAr[i].statu = asd;
  console.log(uniAr[i]);
  save();
  // alert("id2 " + id2 + " status after click " + asd);
}

async function save() {
  // uniAr = []; // i have used it to empty my server link
  await fetch("http://nodedatastore.herokuapp.com/owais", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(uniAr)
  })
    .then(res => res.json())
    .then(data => {
      console.log("data: ", data);
    })
    .catch(err => {
      console.log("err: ", err);
    });
}

async function createChk(obj) {
  if (obj.value !== "") {
    let value = obj.value;
    console.log("object : ", obj);
    console.log("value = object.value : ", value);

    let id = "lbl" + i;
    console.log("id", id);

    var chk = document.createElement("input"); // CREATE CHECK BOX.
    chk.setAttribute("type", "checkbox"); // SPECIFY THE TYPE OF ELEMENT.
    chk.setAttribute("id", "prodName" + i); // SET UNIQUE ID.
    chk.setAttribute("value", obj.value);
    chk.setAttribute("name", "products");
    var lbl = document.createElement("label"); // CREATE LABEL.
    lbl.setAttribute("for", "label" + i);
    lbl.setAttribute("id", id);

    lbl.className = "ml-4   "; // form-control
    lbl.style["width"] = "200px";
    lbl.style["maxlength"] = "8";
    console.log("object.value: ", obj.value);

    // CREATE A TEXT NODE AND APPEND IT TO THE LABEL.
    lbl.appendChild(document.createTextNode(obj.value));
    let id2 = "prodName" + i;

    // APPEND THE NEWLY CREATED CHECKBOX AND LABEL TO THE <p> ELEMENT.
    con.appendChild(chk);
    con.appendChild(lbl);
    var position = uniAr.length;
    var btn = editBoxButton(value, position, id);
    con.appendChild(btn);
    var dele = deleteBox(value, position, id, id2);
    con.appendChild(dele);
    var linebreak = document.createElement("br");
    con.appendChild(linebreak);

    asd = document.getElementById("prodName" + i).checked;
    var position = uniAr.length;
    chk.onclick = function() {
      onclick(id, id2, asd, position);
    };
    obj.value = "";

    i = i + 1;

    uniAr.push({ statu: asd, val: value });
    console.log("uniAr: ", uniAr);

    //uniAr = []; // i have used it to empty my server link

    await save();
  }
}

async function functionRenderFromServer(obj) {
  console.log("json received print: ", obj);
  if (obj !== "") {
    let value = obj;
    console.log("value: ", obj.val);

    let id = "lbl" + i;
    console.log("id", id);
    var chk = document.createElement("input"); // CREATE CHECK BOX.
    chk.setAttribute("type", "checkbox"); // SPECIFY THE TYPE OF ELEMENT.
    chk.setAttribute("id", "prodName" + i); // SET UNIQUE ID.
    chk.setAttribute("value", obj.val);
    chk.setAttribute("name", "products");
    chk.setAttribute("Check", obj.statu);
    console.log("obj status", obj.statu);
    var lbl = document.createElement("label"); // CREATE LABEL.
    lbl.setAttribute("for", "label" + i);
    lbl.setAttribute("id", id);
    lbl.className = "ml-4   "; // form-control
    lbl.style["width"] = "200px";
    lbl.style["maxlength"] = "8";
    // CREATE A TEXT NODE AND APPEND IT TO THE LABEL.
    lbl.appendChild(document.createTextNode(obj.val));

    let id2 = "prodName" + i;

    // APPEND THE NEWLY CREATED CHECKBOX AND LABEL TO THE <p> ELEMENT.
    con.appendChild(chk);
    con.appendChild(lbl);
    var position = uniAr.length;
    var btn = editBoxButton(obj.val, position, id);
    con.appendChild(btn);
    var dele = deleteBox(obj.val, position, id, id2);
    con.appendChild(dele);
    var linebreak = document.createElement("br");
    con.appendChild(linebreak);
    var asd = document.getElementById("prodName" + i).checked;
    asd = obj.statu;
    let line = obj.statu;
    if (obj.statu == true) {
      document.getElementById(id).style.textDecoration = "line-through";
      document.getElementById("prodName" + i).checked = true;
    } else {
      document.getElementById(id).style.textDecoration = "none";
      document.getElementById("prodName" + i).checked = false;
    }

    obj.value = "";
    console.log("asd : ", asd);
    uniAr.push({ statu: asd, val: obj.val });
    var position = uniAr.length;
    chk.onclick = function() {
      onclick(id, id2, asd, position - 1);
    };
    console.log("uniAr: ", uniAr[i - 1]);

    i = i + 1;
  }
}
