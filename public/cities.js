var check;
const autocomplete = () => {
    let availableTags = [];
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "destinations.json");
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText), availableTags = [];
            for (let destination of data.destinations) {
                availableTags.push(`${destination.city} - ${destination.country}`);
            }
            $("input[name=city]").autocomplete({
                source: availableTags
            });
            let input = document.querySelector("input[name=city]");
            input.onchange = () => {
                let countryOptions = document.querySelector('#country_options'), ctr = 0;
                for (option of countryOptions.children) {
                    if (option.innerText === input.value.split("-")[1].trim()) {
                        countryOptions.options.selectedIndex = ctr;
                        input.value = input.value.split("-")[0].trim();
                        break;
                    }
                    ctr++;
                }
            }
        }

    }
};
autocomplete();