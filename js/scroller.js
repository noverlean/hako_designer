//объект, отвечающий за наличие на страницах этажей прокруток и управление текущими этажами
let floors = {
    count: 2,
    current: 0,
    increment()
    {
        if (this.current + 1 >= count)
            return false;
        this.current++;
        return true;
    },
    decrement()
    {
        if (this.current - 1 < 0)
            return false;
        this.current--;
        return true;
    },
    setOn(value)
    {
        if (value >= this.count || value < 0)
            return false;
        this.current = value;
        this.changePageForCurrentFloor();
        return true;
    },
    changePageForCurrentFloor()
    {
        const nickname = document.getElementById('nickname');
        const contentContainer = document.getElementById('contentContainer');
        const paragraphListPanelContainer = document.getElementById('paragraphListPanelContainer');
        const stats = document.getElementById('stats');

        const navRight = document.getElementById('navBarRight');
        const navLeft = document.getElementById('navBarLeft');

        switch (this.current)
        {
            case 0:
                nickname.style.top = 'calc(50vh - 500px / 2)';
                nickname.style.width = '100vw';
                nickname.style.fontSize = '500px';
                nickname.style.letterSpacing = '-75px';

                contentContainer.style.top = '100vh';

                navRight.style.left = '50vw';
                navLeft.style.right = '50vw';

                paragraphListPanelContainer.style.left = '-25vw';
                break; 
            case 1:
                nickname.style.top = '-200px';
                nickname.style.width = '100vw';
                nickname.style.fontSize = '100px';
                nickname.style.letterSpacing = '-15px';
        
                contentContainer.style.top = '130px';

                navRight.style.left = '59.5vw';
                navLeft.style.right = '59vw';

                paragraphListPanelContainer.style.left = '0vw';
                break;
            case 2:
            default:
                if (this.current < this.count)
                {
                    nickname.style.top = '-200px';
                    nickname.style.width = '100vw';
                    nickname.style.fontSize = '100px';
                    nickname.style.letterSpacing = '-15px';
            
                    contentContainer.style.top = '-1vh';
            
                    console.log(this.current, this.count);
    
                    showTikTok(this.current - 2);
                }
                break;
        }
    }
}

let passiveState = false;

const element = document.getElementById('scrollContainer');
const element1 = document.getElementById('paragraphListPanel');

element.addEventListener('mouseenter', () => selectScrollBox(element));
element.addEventListener('mouseleave', () => unselectScrollBox(element));
element1.addEventListener('mouseenter', () => selectScrollBox(element1));
element1.addEventListener('mouseleave', () => unselectScrollBox(element1));

function selectScrollBox(_element)
{
    passiveState = true;
    _element.style.boxShadow = "0px 0px 15px #333";
    _element.style.backgroundColor = "var(--main)";
}
function unselectScrollBox(_element)
{
    passiveState = false;
    _element.style.boxShadow = "0px 0px 0px #333";
    _element.style.backgroundColor = "#00000000";
}

//добавляем обработчик событий для прокрута колеса мыши для разных версий бразуеров
if (document.addEventListener) {
    if ('onwheel' in document) {
        // IE9+, FF17+, Ch31+
        document.addEventListener("wheel", onWheel, { passive: true });
    } else if ('onmousewheel' in document) {
        // устаревший вариант события
        document.addEventListener("mousewheel", onWheel, { passive: true });
    } else {
        // Firefox < 17
        document.addEventListener("MozMousePixelScroll", onWheel, { passive: true });
    }
} else { // IE8-
    document.attachEvent("onmousewheel", onWheel, { passive: true });
}

//создаем локи
let lockedByWheel = false;
let lockedByScroll = false;
//подключаем в работу лок при прокрутке (хз, помогает ли именно он, но пусть будет)
window.addEventListener('scroll', () => {
    lockedByScroll = true;
    setTimeout(() => {
        lockedByScroll = false;
    }, 200);
});

let previousPos = 0;
var scrollLocked = false;
function onWheel(e) {
    e = e || window.event;

    // wheelDelta не даёт возможность узнать количество пикселей
    var delta = e.deltaY || e.detail || e.wheelDelta;

    //отменяем автоматическую браузерную прокрутку
    // e.preventDefault();

    // if (!scrollLocked)
    if (!scrollLocked && !passiveState)
    {
        if (delta < 50)
        {
            scrollToFloor(floors.current - 1);
        }
        else if (delta > 50)
        {
            scrollToFloor(floors.current + 1);
        }
    }
}

function scrollToFloor(floorId)
{
    //локер для синхронизации потока обработки скролла
    if (lockedByWheel || lockedByScroll)
    {
        return;
    }
    else
    {
        lockedByWheel = true;
    }

    let offset = 0;
    let clientHeight = document.documentElement.clientHeight;
    if (floors.setOn(floorId))
    {
        offset = clientHeight * floors.current - window.scrollY;
    }
    
    //вызываем скролл страницы, если есть куда скроллить (был баг с остановкой прокрута)
    if (offset != 0)
    {
        window.scrollBy({
            top: offset,
            behavior: 'smooth'
        });
    }
    
    //снимаем лок
    previousPos = window.scrollY;
    lockedByWheel = false;
}

scrollToFloor(0);