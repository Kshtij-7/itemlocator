var firstElements = [];
var secondElements = [];

function find() {
    // Get the <select> element by its id
    var dropdown = document.getElementById("dropdown");
    
    var selectedOptionValue = dropdown.value;
    var location = secondElements[firstElements.indexOf(selectedOptionValue)]
    console.log(location);
    document.getElementById("output").innerText = `The ${selectedOptionValue} is/are in ${location}`
    var locationWithUnderscores = location.replace(/\s+/g, '_');
    var optionWithUnderscores = selectedOptionValue.replace(/\s+/g,'_');
    console.log(document.getElementById("imgSpan").innerHTML)
    document.getElementById("imgSpan").innerHTML = `<img src="./images/${optionWithUnderscores}.jpg" style="height: 500px; width: 500px;">`;
    document.getElementById("imgSpan").innerHTML = document.getElementById("imgSpan").innerHTML + `<img src="./images/${locationWithUnderscores}.jpg" style="height: 500px; width: 500px;">`;
    //document.getElementById("output").textContent = "Selected option: " + selectedOptionValue;
}

document.getElementById('excelFile').addEventListener('change', handleFile);
document.getElementById('dropdown').addEventListener('change', find);

function handleFile(event) {
    const fileInput = event.target;
    const file = fileInput.files[0] || "./Book1.xlsx";
    console.log(file)
    console.log(fileInput)
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });

            // Assuming you have a single sheet, you can access it like this:
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Parse the data in the sheet
            const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Initialize two arrays to store the first and second elements
            //firstElements = [];
            //secondElements = [];

            // Iterate through the parsed data and split it into two arrays
            for (const row of parsedData) {
                if (row.length >= 2) {
                    firstElements.push(row[0]);
                    secondElements.push(row[1]);
                }
            }

            // You now have two separate arrays
            console.log("First Elements:", firstElements);
            console.log("Second Elements:", secondElements);

            for (const itemname of firstElements){
                document.getElementById("dropdown").innerHTML =document.getElementById("dropdown").innerHTML + `<option value="${itemname}">${itemname}</option>`
                
            }//<option value="Charger">Charger</option>
        };

        reader.readAsBinaryString(file);
    }
    
}


// Assuming you have the file name in a variable, e.g., 'example.xlsx'

function find2() {
const fileName = 'Book1.xlsx';

// Make an HTTP request to load the file
fetch(fileName)
    .then(response => response.arrayBuffer())
    .then(data => {
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });

        // Assuming you have a single sheet, you can access it like this:
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Parse the data in the sheet
        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Initialize two arrays to store the first and second elements

        // Iterate through the parsed data and split it into two arrays
        for (const row of parsedData) {
            if (row.length >= 2) {
                firstElements.push(row[0]);
                secondElements.push(row[1]);
            }
        }

        // You now have two separate arrays
        console.log("First Elements:", firstElements);
        console.log("Second Elements:", secondElements);

        for (const itemname of firstElements){
            document.getElementById("dropdown").innerHTML =document.getElementById("dropdown").innerHTML + `<option value="${itemname}">${itemname}</option>`
            
        }//<option value="Charger">Charger</option>
    })
    .catch(error => {
        console.error("Error loading the file:", error);
    });

}

jQuery(document).ready(function($) {
    // Use $ as an alias for jQuery within this block
    $('.js-example-basic-single').select2();
    $('.js-example-basic-single').on('select2:select',find)
});



/*
const searchInput = document.getElementById('searchInput');
const dropdownOptions = document.getElementById('dropdown').getElementsByTagName('option');

searchInput.addEventListener('input', function() {
    const filter = searchInput.value.toLowerCase();

    for (const option of dropdownOptions) {
        const optionText = option.text.toLowerCase();

        if (optionText.includes(filter)) {
            option.style.display = 'block';
            option.innerHTML = optionText.replace(new RegExp(filter, 'gi'), (match) => `<mark>${match}</mark>`);
        } else {
            option.style.display = 'none';
        }
    }
});

searchInput.addEventListener('click', function(e) {
    e.stopPropagation();
});

document.addEventListener('click', function() {
    closeDropdown();
});

function closeDropdown() {
    for (const option of dropdownOptions) {
        option.style.display = 'block';
        option.innerHTML = option.text;
    }
}
*/