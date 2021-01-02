// from data.js
var tableData = data;


// YOUR CODE HERE!

function updateStateDropdown() {
// get  unique states and add options with value and text to drop down
    var states = tableData.map(states => {
        return states.state;  
    });
    //using set to get unique states
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

function updateShapeDropdown() {
    // get  unique states and add options with value and text to drop down
        var shapes = tableData.map(shapes => {
            return shapes.shape;  
        });
        //using set to get unique states
        var uniqueSet = new Set(shapes);
        shapes = [...uniqueSet];
        console.log(shapes);
    
        var shapesDropdown = d3.select("#shape");
        var options = shapesDropdown.selectAll("option")
                .data(shapes)
                .enter()
                .append("option");
    
                shapes.forEach(cntry => {
                options.text(function(d) {
                    return d;
                })
                .attr("value", function(d) {
                    return d;
                });
        });
    }
        
function updateCountryDropdown() {
// get  unique countries and add options with value and text to drop down
    var countries = tableData.map(country => {
        return country.country;  
    });
    var uniqueSet = new Set(countries);
    countries = [...uniqueSet];
    console.log(countries);

    var countryDropdown = d3.select("#country");
    var options = countryDropdown.selectAll("option")
            .data(countries)
            .enter()
            .append("option");
    countries.forEach(cntry => {
            options.text(function(d) {
                return d;
            })
            .attr("value", function(d) {
                return d;
            });
    });
}

function updateCityDropdown() {
    // get the unique cities and add options to drop down
    var cities = tableData.map(city => {
        return city.city;  
    });
    var uniqueSet = new Set(cities);
    cities = [...uniqueSet];
    
    var cityDropdown = d3.select("#city");
    var options = cityDropdown.selectAll("option")
            .data(cities)
            .enter()
            .append("option");
    cities.forEach(city => {
            options.text(function(d) {
                return d;
            })
            .attr("value", function(d) {
                return d;
            });
        //selectList.append("<option>" + city.city + "</option>");
    });
}
//Update the table from data
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
updateShapeDropdown();

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
   
    //Get the selected text property of the dropdown  elements
    const city = d3.select('#city option:checked').text();
    console.log(city);

    const state = d3.select('#state option:checked').text();
    console.log(state);

    const country = d3.select('#country option:checked').text();
    console.log(country);

    /* const state = d3.select('#state option:checked').text();
    console.log(state);
 */
    var filteredData = tableData.filter(ufo => ufo.datetime === inputDate || 
                                                ufo.city === city &&
                                                ufo.state === state &&
                                                ufo.country === country);
    
    // remove rows  from tbody
    var tbody = d3.select("tbody");
    tbody.html("");

    updateTable(filteredData);

    d3.select('#country option:checked').property('checked',false);
    d3.select('#city option:checked').property('checked',false)
    d3.select('#state option:checked').property('checked',false)
    
    console.log(d3.select('#state option:checked').property('selected'));

}