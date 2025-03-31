showHeirarchy(currentPage);
openTopic(currentPage);

function showHeirarchy(_currentPage)
{
    document.getElementById('paragraphList').innerHTML = "";

    currentPage = _currentPage;

    let counter = 1, subcounter = 0;
    for (let topic of pageData[currentPage].topics)
    {
        
        document.getElementById('paragraphList').insertAdjacentHTML(
            `beforeend`,
            `
            <ol id="ol${counter}" onclick="CollapseSublist(${counter}); openTopic('${counter-1}')">${topic.name}
                <div id="sublist${counter}" class="sublist"></div>
            </ol>
            `
        );
        
        subcounter = 0;
        for (let subtopic of topic.subtopics)
        {
            document.getElementById(`sublist${counter}`).insertAdjacentHTML(
                `beforeend`,
                `
                <ul id="${counter}_${subcounter}">${subtopic.name}</ul>
                `
            );
            document.getElementById(`${counter}_${subcounter}`).addEventListener('click', (event) => {event.stopPropagation(); scrollTo(event);});
            subcounter++;
        }
        
        counter++;
    }
}


function openTopic(topicNumber)
{
    topic = pageData[currentPage].topics[topicNumber];
    let _subcounter = 0;
    document.getElementById('scrollContainer').innerHTML = '<div class="scrollContainerTopFog"></div>';
    for (let subtopic of topic.subtopics)
    {
        console.log(_subcounter);
        document.getElementById('scrollContainer').insertAdjacentHTML(
            `beforeend`,
            `
            <div id="contentContainer${_subcounter}" class="contentContainer">
                <h3>${subtopic.name}</h3>
                <div class="line"></div>
            </div>
            `
        );

        let targetElement = document.getElementById(`contentContainer${_subcounter}`);
        console.log(`contentContainer${_subcounter}`);
        // Загружаем HTML файл
        fetch(subtopic.url) // Укажите путь к вашему .html файлу
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки файла: ' + response.status);
                }
                return response.text();
            })
            .then(htmlContent => {
                targetElement.insertAdjacentHTML(
                    `beforeend`,
                    htmlContent
                ); // Добавляем содержимое в элемент
                targetElement.querySelectorAll('.image').forEach(el => el.addEventListener('click', (event) => openImage(event)));
            })
            .catch(error => {
                console.error('Ошибка:', error);
                targetElement.textContent = 'Не удалось загрузить контент.';
            });
        
        _subcounter++;
    }

    console.log(document.querySelectorAll('image'));
    // 
}

function openImage(event)
{
    event.target.classList.toggle('imageOpen');
}

function scrollTo(event)
{
    let h3Number = event.target.id.substring(event.target.id.indexOf("_")+1);
    document.querySelectorAll('h3')[h3Number].scrollIntoView({ behavior: 'smooth', block: 'start' });
}