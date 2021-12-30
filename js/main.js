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

    document.getElementById('description').innerHTML = result.description;
    document.getElementById('title').innerHTML = result.title;
    document.getElementById('section_title').innerHTML = result.sections[s].title;


    for (let i = 0; i < result.sections[s].questions.length; i++) {
        var newQuestion = document.createElement('h3');
        newQuestion.setAttribute('class', 'question');
        newQuestion.innerHTML = result.sections[s].questions[i].question;
        newDiv.appendChild(newQuestion);

        var newField = document.createElement("input");
        newField.setAttribute('class', 'field');
        newField.setAttribute('description', result.sections[s].questions[i].description);
        newField.setAttribute('required', result.sections[s].questions[i].required);

        if (result.sections[s].questions[i].description != null) {
            var newDescription = document.createElement('h5');
            newDescription.setAttribute('class', 'description');
            newDescription.innerHTML = result.sections[s].questions[i].description;
            newDiv.appendChild(newDescription);
        }

        if (result.sections[s].questions[i].type == 'NUMBER') {
            newField.setAttribute('id', 'number');
            newField.setAttribute('placeholder', 'Nhập số');
            newField.setAttribute('min', result.sections[s].questions[i].attrs.min);
            newField.setAttribute('max', result.sections[s].questions[i].attrs.max);
            newDiv.appendChild(newField);
        } else if (result.sections[s].questions[i].type == 'RADIO') {
            newField.setAttribute('id', 'radio');
            for (let index = 0; index < result.sections[s].questions[i].options.length; index++) {

                var newInput = document.createElement('input');
                newInput.setAttribute('type', 'radio');
                newInput.setAttribute('value', result.sections[s].questions[i].options[index].value)
                if (result.sections[s].questions[i].options[index].value == result.sections[s].questions[i].defaultAnswer) {
                    newInput.setAttribute('checked', 'checked');
                }
                newInput.setAttribute('name', 'radio' + i);
                newInput.setAttribute('class', 'radio');

                var newLabel = document.createElement('label');
                newLabel.setAttribute('class', 'radio_label');
                newLabel.setAttribute('for', result.sections[s].questions[i].options[index].value);
                newLabel.innerHTML = result.sections[s].questions[i].options[index].text

                var newBR = document.createElement('br');
                newBR.setAttribute('class', 'br');

                newDiv.appendChild(newInput);
                newDiv.appendChild(newLabel);
                newDiv.appendChild(newBR);

            }
        } else if (result.sections[s].questions[i].type == 'SHORT_TEXT') {
            newField.setAttribute('id', 'short_text');
            newField.setAttribute('type', 'text');
            newField.setAttribute('placeholder', 'Nhập text');
            newDiv.appendChild(newField);
        } else if (result.sections[s].questions[i].type == 'LONG_TEXT') {
            newField.setAttribute('id', 'long_text');
            newField.setAttribute('type', 'textarea');
            newField.setAttribute('placeholder', 'Nhập long text');
            newDiv.appendChild(newField);
        }
        console.log('Create elements ' + i);
    }
    if (s == test.sections.length - 1) {
        var newButton = document.createElement('button');
        newButton.setAttribute('type', 'submit');
        newButton.setAttribute('class','sendSurvey');
        newButton.innerHTML = 'Gửi';
        newDiv.appendChild(newButton);
    }
    console.log('Created!');
}
function createSectionTitle(s) {
    document.getElementById('section_title').innerHTML = result.sections[s].title;
    if (result.sections[s].description != undefined) {
        document.getElementById('section_title_description').style.display = 'block';
        document.getElementById('section_title_description').innerHTML = result.sections[s].description;
    }else{
        document.getElementById('section_title_description').style.display = 'none';
    }
}


function hideElements(s) {
    var id = 'div' + s;
    id = id.toString();
    document.getElementById(id).style.display = 'none';
    console.log('Hided ' + id);
}
function displayElement(s) {
    var id = 'div' + s;
    id = id.toString();
    document.getElementById(id).style.display = 'block';
    document.getElementById('section_title').innerHTML = result.sections[s].title;
    document.getElementById('section_title_description').innerHTML = result.sections[s].description;
    console.log('Displayed ' + id);
}

function changeState() {
    document.getElementById('before_layer').className = 'animation';
    setTimeout(function () {
        document.getElementById('before_layer').style.display = 'none';
        document.getElementById('after_layer').style.display = 'block';
    }, 1900);
    onLoad();
}