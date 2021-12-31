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
    newDiv.setAttribute('class', 'survey_body');
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
            newField.setAttribute('type', 'number');
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
            // newField.setAttribute('id', 'long_text');
            // newField.setAttribute('type', 'textarea');
            // newField.setAttribute('placeholder', 'Nhập long text');
            // newDiv.appendChild(newField);
            var newTextArea = document.createElement('textarea');
            newTextArea.setAttribute('class', 'field');
            newTextArea.setAttribute('description', result.sections[s].questions[i].description);
            newTextArea.setAttribute('required', result.sections[s].questions[i].required);
            newTextArea.setAttribute('id', 'long_text');
            newTextArea.setAttribute('cols', '1');
            newTextArea.setAttribute('rows', '5');
            newTextArea.setAttribute('maxlength', result.sections[s].questions[i].attrs.maxLength);
            newTextArea.setAttribute('minlength', result.sections[s].questions[i].attrs.minLength);
            newTextArea.setAttribute('placeholder', 'Nhập long text');
            newDiv.appendChild(newTextArea);

        }
        console.log('Create elements ' + i);
    }
    if (s == result.sections.length - 1) {
        var newButton = document.createElement('button');
        newButton.setAttribute('type', 'submit');
        newButton.setAttribute('class', 'sendSurvey');
        newButton.setAttribute('onclick', 'sendSurvey()');
        newButton.innerHTML = 'Gửi';
        newDiv.appendChild(newButton);
    }
    console.log('Created!');
}
function createSectionTitle(s) {
    document.getElementById('section_title').innerHTML = result.sections[s].title;
    //Create section title's description
    if (result.sections[s].description != undefined) {
        document.getElementById('section_title_description').style.display = 'block';
        document.getElementById('section_title_description').innerHTML = result.sections[s].description;
    } else {
        document.getElementById('section_title_description').style.display = 'none';
    }
}
function hideElements(s) {
    var id = 'div' + s;
    id = id.toString();
    document.getElementById(id).style.display = 'none';
    document.getElementById('scrollBar').style.display = 'none';
    console.log('Hided ' + id);
}
function displayElement(s) {
    var id = 'div' + s;
    id = id.toString();
    setTimeout(function () {
        document.getElementById(id).style.display = 'block';
        document.getElementById('scrollBar').style.display = 'inline';
    }, 200);
    document.getElementById('section_title').innerHTML = result.sections[s].title;
    if (result.sections[s].description != undefined) {
        document.getElementById('section_title_description').style.display = 'block';
        document.getElementById('section_title_description').innerHTML = result.sections[s].description;
    } else {
        document.getElementById('section_title_description').style.display = 'none';
    }
    console.log('Displayed ' + id);
}
function changeState() {
    document.getElementById('front_layer').className = 'animation';
    setTimeout(function () {
        document.getElementById('front_layer').style.display = 'none';
        document.getElementById('rear_layer').style.display = 'block';
    }, 1900);
    onLoad();
}

function checkField(){

}

function sendSurvey(){
    console.log('Sent!');
}
// ------------Night mode switch---------------
var currentTheme = localStorage.getItem('theme');
var toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
    console.log('Changed!');
}
toggleSwitch.addEventListener('change', switchTheme);