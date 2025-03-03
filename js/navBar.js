document.getElementById("navBarItem1").addEventListener("click", () => OnClickNavBar(1));
document.getElementById("navBarItem2").addEventListener("click", () => OnClickNavBar(2));
document.getElementById("navBarItem3").addEventListener("click", () => OnClickNavBar(3));
document.getElementById("navBarItem4").addEventListener("click", () => OnClickNavBar(4));

function OnClickNavBar(id)
{
    console.log(id);
    
    for (let i = 1; i < 5; i++)
    {
        if (i == id)
        {
            document.getElementById('navBarItem' + i).style.textDecoration = "overline 2px";
            continue;
        }

        document.getElementById('navBarItem' + i).style.textDecoration = "overline 0px";
    }
}

