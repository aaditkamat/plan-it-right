var data = JSON.parse(localStorage.data);
//console.log(data);
var priceJSON = get_prices();

function get_prices() {
    let planItems = data.planItems, priceJSON = [];
    for (let i = 0; i < planItems.length; i++) {
        let sum = 0, length = 1, name = planItems[i].entity.name;
        if ('tickets' in planItems[i].entity) {
            length = planItems[i].entity.tickets.length;
            for (let j = 0; j < planItems[i].entity.tickets.length; j++) {
                sum += parseFloat(planItems[i].entity.tickets[j].price);
            }
        }
        let average = sum / length;
        priceJSON.push({name: name, price: average.toFixed(2)});
    }
    return priceJSON;
}

createPriceItems = () => {
    let priceList = document.querySelector('#list-price'), sumPrices = 0;
    for (let i = 0; i < priceJSON.length; i++) {
        if (priceJSON[i].price !== "0.00") {
            const listItem = document.createElement("ul"), listItemContents = document.createElement("h3");
            listItemContents.innerText = `${priceJSON[i].name}: $${priceJSON[i].price}`;
            sumPrices += parseFloat(priceJSON[i].price);
            listItem.append(listItemContents);
            priceList.append(listItem);
            for (let j = 0; j < 2; j += 1)
                priceList.append(document.createElement("br"));
        }
    }
    document.querySelector('#total ul h3').innerText += ` $${sumPrices.toFixed(2)}`;
};

console.log(priceJSON);
createPriceItems();
