document.getElementById('themePicker').addEventListener('click', switchTheme);

let currentTheme = 'day';
let currentRotationState = false;
init();

function init()
{
    if (localStorage.getItem('currentTheme') != undefined)
    {
        currentTheme = localStorage.getItem('currentTheme');
        setTheme(currentTheme);
    }
}

function switchTheme()
{
    console.log(currentTheme);
    rotateIcons();
    switch (currentTheme)
    {
        case 'day':
            currentTheme = 'night';
            setTheme('night');
            localStorage.setItem('currentTheme', 'night');
            break;
        case 'night':
            currentTheme = 'day';
            setTheme('day');
            localStorage.setItem('currentTheme', 'day');
            break;
    }
    
}

function setTheme(state)
{
    switch (state)
    {
        case "night":
            document.getElementById('sun').style.opacity = '0';
            document.getElementById('moon').style.opacity = '1';

            document.documentElement.style.setProperty("--main",        "#272727");
            document.documentElement.style.setProperty("--main-sub",  "#111111");
            document.documentElement.style.setProperty("--medium",      "#686868");
            document.documentElement.style.setProperty("--main-alt",    "#fff");
            break;
        case "day":
            document.getElementById('sun').style.opacity = '1';
            document.getElementById('moon').style.opacity = '0';

            document.documentElement.style.setProperty("--main",        "#fff");
            document.documentElement.style.setProperty("--main-sub",  "#f1f1f1");
            document.documentElement.style.setProperty("--medium",      "#686868");
            document.documentElement.style.setProperty("--main-alt",    "#272727");
            break;
    }
}

function rotateIcons()
{
    if (currentRotationState === true) {
        document.getElementById('sun').style.rotate = '0deg';
        document.getElementById('moon').style.rotate = '0deg';
    }
    else {
        document.getElementById('sun').style.rotate = '255deg';
        document.getElementById('moon').style.rotate = '255deg';
    }
    currentRotationState = !currentRotationState;
}