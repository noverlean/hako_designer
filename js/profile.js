let userProfile = {
    id: 0,
    avatarUrl: '',

}

showPageLoader()
loadUserProfile()
async function loadUserProfile()
{
    let userProfile = await getUserProfile();
    let faceitProfile = await getFaceitData();

    console.log(userProfile);

    document.getElementById('avatar').style.backgroundImage = `url(${userProfile.avatarfull})`;
    document.getElementById('nickname').innerText = userProfile.personaname;
    document.getElementById('steamLink').onclick = () => {
        location.href = userProfile.profilesteamurl;
        userProfile.profilesteamurl
    };
    if (userProfile.mostplayedgames[0].hoursonrecord != null)
    {
        document.getElementById('topLine').insertAdjacentHTML('afterbegin', `
            <div class="playTimeContainer">
                <div class="topLineIcon cloack"></div>
                <div id="playTimeForever" class="playTimeForever"></div>
            </div>
            `);
        document.getElementById('playTimeForever').innerText = userProfile.mostplayedgames[0].hoursonrecord + ' h';
    }
    if (userProfile.location != null)
    {
        document.getElementById('topLine').insertAdjacentHTML('afterbegin', `
            <div class="locationContainer">
                <div class="topLineIcon location"></div>
                <div id="locationName" class="locationName"></div>
            </div>
            `);
        document.getElementById('locationName').innerText = userProfile.location;
    }
}

function showPageLoader()
{
    // fetch('./reference/anim.gif')
    //     .then(response => response.arrayBuffer())
    //     .then(buffer => {
    //         const gif = new GIF({
    //             workers: 2,
    //             quality: 10,
    //             workerScript: 'https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js'
    //         });

    //         gif.load(buffer);
            
    //         gif.on('loaded', () => {
    //             let totalDuration = 0;
    //             for (let i = 0; i < gif.frames.length; i++) {
    //                 totalDuration += gif.frames[i].delay;
    //             }
    //             totalDuration = totalDuration / 1000; // Преобразуем миллисекунды в секунды
    //             result.textContent = `GIF duration: ${totalDuration} seconds`;
    //         });
    //     });

    // document.getElementById('pageLoader').style.backgroundImage = `url('./reference/anim.gif')`;
}

// document.addEventListener('scroll', function() {
//     const scrollPosition = window.scrollY;

//     const nickname = document.getElementById('nickname');
//     const avatar = document.getElementById('avatar');
//     const profilePanel = document.getElementById('profilePanel');
//     const stats = document.getElementById('stats');
//     console.log(scrollPosition);

//     // if (scrollPosition == 0) {
        
//     // } else if (scrollPosition <= 100) {
        
//     // } else if (scrollPosition <= 200) {

//     // }
// });