// from data.js
var tableData = data;


// YOUR CODE HERE!

function updateStateDropdown() {

    var states = tableData.map(states => {
        return states.state;  
    });
    var uniqueSet = new Set(states);
    states = [...uniqueSet];
    console.log(states);

    var stateDropdown = d3.select("#state");
    var options = stateDropdown.selectAll("option")
            .data(states)
            .enter()
            .append("option");

        states.forEach(cntry => {
            options.text(function(d) {
                return d;
            })
            .attr("value", function(d) {
                return d;
            });
    });
}

function updateCountryDropdown() {

    var countries = tableData.map(country => {
        return country.country;  
    });
    var uniqueSet = new Set(countries);
    countries = [...uniqueSet];
    console.log(countries);

    var countryDropdown = d3.select("#country");
    countries.forEach(cntry => {
        var options = countryDropdown.selectAll("option")
            .data(countries)
            .enter()
            .append("option");

            options.text(function(d) {
                return d;
            })
            .attr("value", function(d) {
                return d;
            });
    });
}

function updateCityDropdown() {

    var cities = tableData.map(city => {
        return city.city;  
    });
    var uniqueSet = new Set(cities);
    cities = [...uniqueSet];
    
    var cityDropdown = d3.select("#sel1");
    cities.forEach(city => {
        var options = cityDropdown.selectAll("option")
            .data(cities)
            .enter()
            .append("option");

            options.text(function(d) {
                return d;
            })
            .attr("value", function(d) {
                return d;
            });
        //selectList.append("<option>" + city.city + "</option>");
    });
}

function updateTable(ufoTable) {

    var tbody = d3.select("tbody");

    ufoTable.forEach(ufoSighting => {
        
        var row = tbody.append("tr");

        Object.entries(ufoSighting).forEach( ([key,value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    
    });
}

updateTable(tableData);
updateCityDropdown();
updateCountryDropdown();
updateStateDropdown();

var filterButton = d3.select("#filter-btn");

var form = d3.select(".form-group")

// Create event handlers 
filterButton.on("click", runEnter);
form.on("submit",runEnter);

function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var inputDate = inputElement.property("value");
    console.log(inputDate);

    var filteredData = tableData.filter(ufo => ufo.datetime === inputDate);
    
    // remove rows  from tbody
    var tbody = d3.select("tbody");
    tbody.html("");

    updateTable(filteredData);

}