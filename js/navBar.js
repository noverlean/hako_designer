let lastOpenPage = localStorage.getItem('lastOpenPage');
if (lastOpenPage != undefined || lastOpenPage != null) {
    OnClickNavBar(lastOpenPage);
}

window.onbeforeunload = function() {
    localStorage.setItem("lastOpenPage", lastOpenPage);
};

document.getElementById("navBarItem1").addEventListener("click", () => OnClickNavBar(1));
document.getElementById("navBarItem2").addEventListener("click", () => OnClickNavBar(2));
document.getElementById("navBarItem3").addEventListener("click", () => OnClickNavBar(3));
document.getElementById("navBarItem4").addEventListener("click", () => OnClickNavBar(4));

function OnClickNavBar(id)
{
    console.log(id);
    lastOpenPage = id;

    showHeirarchy(id-1);
    openTopic(pageData[id-1].topics[0]);

    switch (id)
    {
        case 3:
            location.path = "cs2.html";
            break;
    }
    
    for (let i = 1; i < 5; i++)
    {
        if (i == id)
        {
            document.getElementById('navBarItem' + i).style.color = "var(--main)";
            // document.getElementById('navBarItem' + i).style.backgroundColor = "var(--main-alt)";
            document.getElementById('navBarItem' + i).style.backgroundImage = "linear-gradient( #00000000 0%, var(--main-alt) 0%)";
            continue;
        }

        document.getElementById('navBarItem' + i).style.color = "var(--main-alt)";
        // document.getElementById('navBarItem' + i).style.backgroundColor = "#00000000";
        document.getElementById('navBarItem' + i).style.backgroundImage = "linear-gradient( #00000000 100%, var(--main-alt) 100%)";
    }
}

let lastOpened = 0; 
let listElem = [
    null,
    document.getElementById("ol1"),
    document.getElementById("ol2"),
    document.getElementById("ol3")
];

function CollapseSublist(id)
{
    console.log(id);
    console.log(lastOpened);

    let rule1 = listElem[id].querySelector('.sublist').style.opacity != "0";

    if (lastOpened != 0)
    {
        listElem[lastOpened].querySelector('.sublist').style.opacity = "0";
        listElem[lastOpened].querySelector('.sublist').style.maxHeight = "0vh";
        for (let ulEl of listElem[lastOpened].querySelectorAll('ul'))
        {
            ulEl.style.display = "none";
        }     
        listElem[lastOpened].classList.toggle("currentMarker");
    }

    if (id == lastOpened && rule1)
        return;

    document.getElementById("ol" + id).querySelector('.sublist').style.opacity = "1";
    document.getElementById("ol" + id).querySelector('.sublist').style.maxHeight = "100vh";
    for (let ulEl of document.getElementById("ol" + id).querySelectorAll('ul'))
    {
        ulEl.style.display = "block";
    }
    listElem[id].classList.toggle("currentMarker");

    lastOpened = id;
}