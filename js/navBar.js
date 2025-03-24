document.getElementById("navBarItem1").addEventListener("click", () => OnClickNavBar(1));
document.getElementById("navBarItem2").addEventListener("click", () => OnClickNavBar(2));
document.getElementById("navBarItem3").addEventListener("click", () => OnClickNavBar(3));
document.getElementById("navBarItem4").addEventListener("click", () => OnClickNavBar(4));

function OnClickNavBar(id)
{
    console.log(id);
    

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