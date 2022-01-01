function checkValid(){
    console.log('Validating...');
    var inputs = document.getElementsByClassName('field');
    var valid = [];
    valid.length = inputs.length;
    var acceptable = false;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == '') {
            valid[i] = false;
            console.log(i + ' invalid!')
        } else { valid[i] = true; 
        console.log(i + ' valid!')}
    }
    var index = 0;
    for (index; index < valid.length; index++) {
        if (valid[index]) {
            acceptable = true;
        } else {
            acceptable = false;
            break;
        }
    }
    if (acceptable) {
        console.log('All valid!');
        next();
        return true;
    } else {
        console.log('Invalid!')
        inputs[index].className = 'field_alert';
        setTimeout(() => {
            var unChange = document.getElementsByClassName('field_alert');
            for (let j = 0; j < unChange.length; j++) {
                unChange[j].className = 'field';
            }    
        }, 1000);
        return false;
    }
}
