import moment from "moment";

var controlCalendarDisplay = (calendar, calendarOpen) => {
    if (calendarOpen === false)
        calendar.style.display = "block";
    else
        calendar.style.display = "none";
    return !calendarOpen;
};

/**
 * This function controls the display of calendar.
 */
var displayCalendar = () => {
    var firstCalendarOpen = false;
    const firstCalendar = document.querySelector('#firstCalendar');
    $('#firstCalendarIcon').on("click", function () {
        setTimeout(() => firstCalendarOpen = controlCalendarDisplay(firstCalendar, firstCalendarOpen), 150);
    });
};

var handleClickCalendar = () => {
    let getHeader = (element) => {
        for (let i = 0; i < 4; i++)
            element = element.parentNode;
        return element.previousSibling;
    };

    let isDeparture = (element) => {
        while (element.className !== 'calendar')
            element = element.parentNode;
        while (element.className !== 'form-label')
            element = element.previousSibling;
        return element.id.includes('departure');
    };

    let parse = (num) => {
        if (num < 10)
            return '0' + num;
        else
            return num;
    };

    let getDateFormat = (headerJSON, element) => {
        return parse(element.innerText) + "/" + parse(headerJSON.month + 1) + "/" + headerJSON.year;
    };

    var departureInput = document.getElementsByName('departure')[0],
        returnInput = document.getElementsByName('return')[0];
    $("td").on("click", function () {
        let header = getHeader(this);
        let dateFormat = getDateFormat(JSON.parse(header.getAttribute('data-option')), this);
        if (isDeparture(this)) {
            departureInput.value = dateFormat;
            controlCalendarDisplay(document.querySelector('#firstCalendar'), true);
        }
        else {
            returnInput.value = dateFormat;
            controlCalendarDisplay(document.querySelector('#secondCalendar'), true);
        }
    });
};

/**
 * This function validates the form input.
 */
var validateFormInput = () => {
    const cityInput = document.querySelector('input[name=city]'), countryInput = document.getElementById('country_options');
    return checkLocation(cityInput, countryInput) && checkGuests() && checkDeparture();
};


var setRedBorder = (element) => {
    element.style.border="1px solid red";
};

var hasRedBorder = (element) => {
    return element.style.border === "1px solid red";
};

var unsetRedBorder = (element) => {
    element.style.border="";
};

var checkDateFormat = (type) => {
    const input = document.querySelector(`input[name=${type}]`); 
    removeRedundantWarning(type);
    if (!moment(input.value, 'DD/MM/YYYY', true).isValid()) {
        setRedBorder(input);
        addWarning(type, 'Fill date according to the format: DD/MM/YYYY');
    }
    else if (hasRedBorder(input))
        unsetRedBorder(input);
    return moment(input.value, 'DD/MM/YYYY', true).isValid();
};

var checkDateBefore = (firstType, secondType) => {
    const firstInput = document.querySelector(`input[name=${firstType}]`), secondInput = document.querySelector(`input[name=${secondType}]`);
    removeRedundantWarning(firstType);
    if (firstInput.value < secondInput.value) {
        setRedBorder(firstInput);
        addWarning(firstType, 'Return date must be after Departure Date');
    }
    else {
        unsetRedBorder(firstInput);
    }
    return firstInput.value >= secondInput.value;
};

var checkDeparture = () => {
    return checkDateFormat('departure');
};

var checkReturn = () => {
    return checkDateFormat('return') && checkDateBefore('return', 'departure');
};

var checkGuests = () => {
    const guestsInput = document.querySelector("input[name=guests]");
    removeRedundantWarning('guests');
    if (isNaN(parseInt(guestsInput.value))) {
        setRedBorder(guestsInput);
        addWarning('guests', 'Number of guests must be filled');
    }
    else if (hasRedBorder(guestsInput))
        unsetRedBorder(guestsInput);
    return !isNaN(parseInt(guestsInput.value));
};

var checkLocation = (cityInput, countryInput) => {
    let cityOptionSelected = false, cityOptionSelectedCorrectly = false;
    for (let i = 0; i < data.length; i++) {
        if (cityInput.value.toLowerCase() === data[i].city.toLowerCase()) {
            cityOptionSelected = true;
            if (countryInput.value.toLowerCase() === data[i].country.toLowerCase())
                cityOptionSelectedCorrectly = true;
        }
    }
    removeRedundantWarning('location');
    if (!cityOptionSelected || !cityOptionSelectedCorrectly) {
        setRedBorder(cityInput);
        if (!cityOptionSelected) {
            if (cityInput.value === '')
                addWarning('location', 'City Option must be filled');
            else
                addWarning('location', 'The name of the city entered does not exist in our database');
        }
        else
            addWarning('location', 'Selected city and country do not match');
    }
    if (cityOptionSelectedCorrectly && hasRedBorder(cityInput)) {
        unsetRedBorder(cityInput);
    }
    return cityOptionSelectedCorrectly;
};

var removeRedundantWarning = (type) => {
    const label = document.querySelector(`.form-label#${type}-label`);
    if (label.childNodes[1] !== undefined)
        label.removeChild(label.childNodes[1]);
};

var addWarning = (type, message) => {
    const label = document.querySelector(`.form-label#${type}-label`);
    label.innerHTML+= `<span class="warning">${message}</span>`;
};

var sendData = () => {
    $(`[value='Submit Booking Form']`).on('click', function () {
        var formOptions = {
            city: '',
            country: '',
            departure: '',
            lengthOfTrip: 1,
            guests: 0,
            additionalDetails: []
        };
        formOptions.city = document.querySelector(`[name=city]`).value;
        formOptions.country = document.querySelector(`#country_options`).value;
        formOptions.departure = document.querySelector(`[name=departure]`).value;
        formOptions.lengthOfTrip = parseInt(document.querySelector(`#length-options`).value.split(' ')[0]);
        formOptions.guests = parseInt(document.querySelector(`[name=guests]`).value);
        let checkBoxes = document.querySelectorAll('input[type=checkbox]');
        for (let i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i].checked)
                formOptions.additionalDetails.push(checkBoxes[i].getAttribute("data-value"));
        }
        sessionStorage.clear();
        sessionStorage.setItem('formOptions', JSON.stringify(formOptions));
        if (validateFormInput())
            window.open('result.html');
    });
};

var addLengthOptions = () => {
    let lengthOptions = document.querySelector('select#length-options');
    for (let i = 1; i <= 10; i++) {
        let option = document.createElement('option');
        if (i === 1)
            option.value = `1 day`;
        else
            option.value = `${i} days`;
        option.innerText = option.value;
        lengthOptions.append(option);
    }
};

displayCalendar();
handleClickCalendar();
sendData();
addLengthOptions();