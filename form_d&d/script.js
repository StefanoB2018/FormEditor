//contatore elementi
let count = 0;
var dragElement = null;
let selectedElement = 0;

//drag & drop
function handleDragStart(event) {
    console.log("Funzione handleDragStart");
    dragElement = event.target;
    event.dataTransfer.setData("text/plain", ""); // Necessario per Firefox
}

function handleDragOver(event) {
    console.log("Funzione handleDragOver");
    event.preventDefault();
}

function handleDrop(event) {
    console.log("Funzione handleDrop");
    event.preventDefault();
    var element = dragElement.cloneNode(true);
    element.classList.remove("form-element");
    element.draggable = false;
    element.id = count;
    element.ondragstart = handleDragStart;
    element.onclick = function () {
        modal.style.display = "block";
        var clickedElem = document.getElementById(this.id);
        document.getElementById("textarea-box").value = clickedElem.innerHTML;
        selectedElement = this.id;
        console.log("clicked: id" + selectedElement);

    }
    event.target.appendChild(element);
    count++;
}

// modale
var modal = document.getElementById('elements-modal');
var btn = document.getElementById("modal-btn");

// chiudi modale click fuori
window.onclick = function (event) {
    console.log("Funzione onclick modale");
    if (event.target == modal) {
        modal.style.display = "none";
        var element = document.getElementById("textarea-box").value;
        if (element == "") {
            console.log("element = null, count =", count + ".");
            deleteLastRow();
        }
    }
}

//finestra selezione colonne
const popup = document.querySelector('.popup');
function addBtn() {
    console.log("Funzione addBtn");
    popup.classList.add('open');
}
function hidePopup() {
    console.log("Funzione hidePopup");
    popup.classList.remove('open');
}

const popup2 = document.querySelector('.popup2');
function showpopup2(event) {
    console.log("Funzione showpopup2");
    popup2.classList.add('open2');
    copy(1);
}
function hidePopup2() {
    console.log("Funzione hidePopup2");
    popup2.classList.remove('open2');
    let element = document.getElementById("contents-box");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

}

//elementi trascinabili
var formElements = document.querySelectorAll(".form-element");
formElements.forEach(function (element) {
    element.draggable = true;
    element.ondragstart = handleDragStart;
});

//workspace
var droppableArea = document.getElementById("formContainer");
droppableArea.ondragover = handleDragOver;
droppableArea.ondrop = handleDrop;

//nascondi finestra svg al click
var svgselect = document.querySelectorAll(".svg-hide");
svgselect.forEach(function (element) {
    element.onclick = hidePopup;
});

//aggiunta riga-colonne
function addColumn(event) {
    console.log("Funzione addColumn");
    function propotionedColumns() {
        for (i = 0; i < event + 1; i++) {
            var col = document.createElement("div");
            col.className = "col";
            col.innerHTML = "column";
            row.appendChild(col);
        }
    }
    console.log("Select: " + event);
    var row = document.createElement("div");
    row.className = "row";
    console.log("rows: " + count + ".");
    row.id = count;
    count++;
    document.getElementById("formContainer").appendChild(row);

    //12 tipi colonne
    switch (event) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            propotionedColumns();
            break;
        case 6:
            var col = document.createElement("div");
            col.className = "col-4";
            col.innerHTML = "column";
            row.appendChild(col);
            var col = document.createElement("div");
            col.className = "col-8";
            col.innerHTML = "column";
            row.appendChild(col);
            break;
        case 7:
            var col = document.createElement("div");
            col.className = "col-8";
            col.innerHTML = "column";
            row.appendChild(col);
            var col = document.createElement("div");
            col.className = "col-4";
            col.innerHTML = "column";
            row.appendChild(col);
            break;

        case 8:
            var col = document.createElement("div");
            col.className = "col-3";
            col.innerHTML = "column";
            row.appendChild(col);
            var col = document.createElement("div");
            col.className = "col-3";
            col.innerHTML = "column";
            row.appendChild(col);
            var col = document.createElement("div");
            col.className = "col-6";
            col.innerHTML = "column";
            row.appendChild(col);
            break;

        case 9:
            var col = document.createElement("div");
            col.className = "col-6";
            col.innerHTML = "column";
            row.appendChild(col);
            var col = document.createElement("div");
            col.className = "col-3";
            col.innerHTML = "column";
            row.appendChild(col);
            var col = document.createElement("div");
            col.className = "col-3";
            col.innerHTML = "column";
            row.appendChild(col);
            break;

        case 10:
            var col = document.createElement("div");
            col.className = "col";
            col.innerHTML = "column";
            row.appendChild(col);
            var col = document.createElement("div");
            col.className = "col-6";
            col.innerHTML = "column";
            row.appendChild(col);
            var col = document.createElement("div");
            col.className = "col";
            col.innerHTML = "column";
            row.appendChild(col);
            break;

        case 11:
            var col = document.createElement("div");
            col.className = "col-2";
            col.innerHTML = "column";
            row.appendChild(col);
            var col = document.createElement("div");
            col.className = "col-8";
            col.innerHTML = "column";
            row.appendChild(col);
            var col = document.createElement("div");
            col.className = "col-2";
            col.innerHTML = "column";
            row.appendChild(col);
            break;
    }
}

//rimuovi ultimo elemento in base all'id
function deleteLastRow() {
    console.log("Funzione deleteLastRow");
    var myEle = document.getElementById(count - 1);
    if (myEle) {
        count--;
        document.getElementById(count).remove();
        console.log("rows " + count + " removed.")
    }
    else {
        console.log("rows: " + count + ", no rows removed.")
    }
}

//salva modifiche da textarea
function modify() {
    console.log("Funzione modify");
    console.log("Modificato: " + selectedElement);
    document.getElementById(selectedElement).innerHTML = document.getElementById("textarea-box").value;
}



function editHasAttribute(string) {
    console.log(count - 1);
    var boxContent = document.getElementById("textarea-box");
    //div container temporaneo 
    var div = document.createElement("div");
    div.id = "tempDiv";
    //copia del codice da textarea a tempDiv
    div.innerHTML = boxContent.value;
    //div non visibile che funge da passaggio
    document.getElementById("temp").appendChild(div);
    //filtro input senza l'attributo passato
    var sortedDivs = document.getElementById('temp').querySelectorAll('#tempDiv > div > input:not([' + string + '])');
    console.log(sortedDivs);
    console.log("Inputs without \'" + string + "\' attribute. Count: " + sortedDivs.length + ".");
    //aggiunta attributi
    sortedDivs.forEach(function (element) {
        switch (string) {
            case "required":
                element.setAttribute(string, "true");
                console.log(element);
                break;
            default:
                element.setAttribute(string, "10")
                break;
        }
    }
    );
    console.log(sortedDivs);
    var tempElement = document.getElementById('tempDiv');

    for (var i = 0; i < sortedDivs.length; i++) {
        tempElement.firstElementChild.appendChild(sortedDivs[i])
    }
    //aggiornamento contenuto textarea 
    boxContent.value = tempElement.innerHTML;
    //rimozione container temporaneo
    tempElement.remove();

}

async function copy(event) {
    let text = document.getElementById("formContainer");
    console.log(event);
    try {
        if (event == 2) {
            await navigator.clipboard.writeText(text.innerHTML)
            console.log('Content copied to clipboard');
            var cpyBtn = document.getElementById("BTN-copyClipboard");
            cpyBtn.innerHTML = "Copied";
            setTimeout(() => cpyBtn.innerHTML = "Copy", 4000);
            //copia codice
        }
        else if (event == 1) {
            duplicateChildNodes("formContainer");
        }

    } catch (err) {
        console.error('Failed to copy: ', err);
        //errore
    }
}
function duplicateChildNodes(parentId) {
    var parent = document.getElementById(parentId);
    NodeList.prototype.forEach = Array.prototype.forEach;
    var children = parent.childNodes;
    children.forEach(function (item) {
        var cln = item.cloneNode(true);
        document.getElementById("contents-box").appendChild(cln);
    });
};

// da bootstrap docs
//Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()