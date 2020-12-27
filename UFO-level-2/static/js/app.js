// from data.js
var tableData = data;


// YOUR CODE HERE!

function deleteRows() {
    var ufoTable = d3.select("#ufo-table");
    var rowCount = ufoTable.rows.length;
    console.log(rowCount);
    while(ufoTable.rows.length > 0 ) {
        ufoTable.deleteRow(0);
   }
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