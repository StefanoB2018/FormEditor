
let count = 0;
var dragElement = null;

function handleDragStart(event) {
    dragElement = event.target;
    event.dataTransfer.setData("text/plain", ""); // Necessario per Firefox
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    var element = dragElement.cloneNode(true);
    element.classList.remove("form-element");
    element.draggable = false;
    element.id = count;
    element.ondragstart = handleDragStart;
    element.onclick = function () {
        modal.style.display = "block";
        var clickedElem = document.getElementById(count - 1);
        document.getElementById("textarea-box").value = clickedElem.innerHTML;

    }
    event.target.appendChild(element);
    count++;
}

// Get the modal
var modal = document.getElementById('elements-modal');

// Get the button that opens the modal
var btn = document.getElementById("modal-btn");

// When the user clicks anywhere outside of the modal, close-mdl it
window.onclick = function (event) {
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
    popup.classList.add('open');
}
function hidePopup() {
    popup.classList.remove('open');
}

const popup2 = document.querySelector('.popup2');
function showpopup2(event) {
    popup2.classList.add('open2');
    copy(1);
}
function hidePopup2() {
    popup2.classList.remove('open2');
    let element = document.getElementById("contents-box");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

}


var formElements = document.querySelectorAll(".form-element");
formElements.forEach(function (element) {
    element.draggable = true;
    element.ondragstart = handleDragStart;
});

var droppableArea = document.getElementById("formContainer");
droppableArea.ondragover = handleDragOver;
droppableArea.ondrop = handleDrop;

//click svg hide window
var svgselect = document.querySelectorAll(".svg-hide");
svgselect.forEach(function (element) {
    element.onclick = hidePopup;
});

//add row
function addColumn(event) {
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

function deleteLastRow() {
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

function modify() {
    document.getElementById(count - 1).innerHTML = document.getElementById("textarea-box").value;
    
}

function editHasAttribute(attribute) {
    console.log(document.getElementById("textarea-box").value)
    if (true) {
        return true;
    }
    return false;
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
            /* Resolved - text copied to clipboard successfully */
        }
        else if (event == 1) {
            duplicateChildNodes("formContainer");
        }

    } catch (err) {
        console.error('Failed to copy: ', err);
        /* Rejected - text failed to copy to the clipboard */
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
// Example starter JavaScript for disabling form submissions if there are invalid fields
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