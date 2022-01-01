var result;
var sections = 0;
function callAPI() {
    fetch("https://gist.githubusercontent.com/bittermeatball/7854f3d7950469b0203a068fcaf27908/raw/1de87462c4f8c2fd0bfb9d452b246c92697b2eee/sample.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            } else {
                //console.log("Response: ", response);
                return response.json();
            }
        })
        .then((data) => {
            result = data;
            //console.log("Data: ", data);
        })
        .catch(err => {
            console.log("Error: ", err);
        });
}

function fetchData() {
    callAPI();
    console.log(result);

    //console.log(" Description: ", result.description);
}

function onLoad() {
    fetchData();
    loadSurvey();
}
function loadSurvey() {
    checkSections();
    createSectionTitle(sections);
    createField(sections);
    sectionsLoaded[sections] = true;
}

