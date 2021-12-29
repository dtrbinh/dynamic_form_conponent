var sectionsLoaded = [false, false, false];
function next() {
    //e.preventDefault();
    if (sections < 2) {
        hideElements(sections);
        sections++;
        if (sectionsLoaded[sections]) {
            displayElement(sections);

        } else {
            loadSurvey();
            displayElement(sections);
        }
        checkSections();
    }
}
function prev() {
    //e.preventDefault();
    if (sections > 0) {

        hideElements(sections);
        sections--;
        if (sectionsLoaded[sections]) {
            displayElement(sections);
        } else {
            loadSurvey();
            displayElement(sections);
        }
        checkSections();
    }
}

function checkSections() {
    switch (sections) {
        case 0:
            document.getElementById('prev_btn').className = 'disabled';
            break;
        case 1:
            document.getElementById('prev_btn').className = 'enabled';
            document.getElementById('next_btn').className = 'enabled';

            break;
        case 2:
            document.getElementById('next_btn').className = 'disabled';
            break;
        default:
            console.log('Sections error');
            break;
    }
}

function createField(s) {
    var survey = document.getElementById('survey');
    console.log('Creating...');
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'div' + s);
    newDiv.setAttribute('style', 'display: block');
    survey.appendChild(newDiv);

    for (let i = 0; i < result.sections[s].questions.length; i++) {
        var newDescription = document.createElement('h3');
        newDescription.setAttribute('class', 'question');
        newDescription.innerHTML = result.sections[s].questions[i].question;
        newDiv.appendChild(newDescription);

        var newField = document.createElement("input");
        newField.setAttribute('class', 'field');
        newField.setAttribute('description', result.sections[s].questions[i].description);
        newField.setAttribute('placeholder', result.sections[s].questions[i].defaultAnswer);
        newField.setAttribute('required', result.sections[s].questions[i].required);
        newField.setAttribute('type', result.sections[s].questions[i].type);

        if (result.sections[s].questions[i].type == 'NUMBER') {
            newField.setAttribute('min', result.sections[s].questions[i].attrs.min);
            newField.setAttribute('max', result.sections[s].questions[i].attrs.max);
        }
        if (result.sections[s].questions[i].type == 'RADIO') {

        }

        newDiv.appendChild(newField);

        console.log('Create elements ' + i);
    }
    console.log('Created!');

}
function createSectionTitle(s) {
    var newTitle = document.createElement('h3');
    newTitle.id = 'section_title';
    newTitle.innerHTML = result.sections[s].title;
}

function hideElements(s) {
    var id = 'div' + s;
    id = id.toString();
    console.log(id);
    document.getElementById(id).style.display = 'none';
    console.log('Hided!');
}
function displayElement(s) {
    var id = 'div' + s;
    id = id.toString();
    console.log(id);
    document.getElementById(id).style.display = 'block';
    console.log('Displayed');
}