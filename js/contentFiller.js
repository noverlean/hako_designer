showHeirarchy(0);
openTopic(pageData[0].topics[0]);

function showHeirarchy(currentPage)
{
    document.getElementById('paragraphList').innerHTML = "";

    let counter = 1, subcounter = 0;
    for (let topic of pageData[currentPage].topics)
    {
        
        document.getElementById('paragraphList').insertAdjacentHTML(
            `beforeend`,
            `
            <ol id="ol${counter}}" onclick="CollapseSublist(${counter}); openTopic('${pageData[currentPage].topics[counter-1]}')">${topic.name}
                <div id="sublist${counter}" class="sublist"></div>
            </ol>
            `
        );
        
        subcounter = 0;
        console.log(pageData[currentPage].topics);
        for (let subtopic of topic.subtopics)
        {
            document.getElementById(`sublist${counter}`).insertAdjacentHTML(
                `beforeend`,
                `
                <ul id="${counter}_${subcounter}">${subtopic.name}</ul>
                `
            );
            subcounter++;
        }
        
        counter++;
    }
}


function openTopic(topic)
{
    let _subcounter = 0;
    console.log(topic);
    document.getElementById('scrollContainer').innerHTML = '<div class="scrollContainerTopFog"></div>';
    for (let subtopic of topic.subtopics)
    {
        
        document.getElementById('scrollContainer').insertAdjacentHTML(
            `beforeend`,
            `
            <div id="contentContainer${_subcounter}" class="contentContainer">
                <h3>${subtopic.name}</h3>
                <div class="line"></div>
            </div>
            `
        );
        
        $(function(){
            $(`#contentContainer${_subcounter}`).load(subtopic.url); 
        });
        _subcounter++;
    }
}
