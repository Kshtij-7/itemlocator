var firstElements = [];
var secondElements = [];

function find() {
   /* document.getElementById("output").value = "giuyrewuier"
    document.getElementById("dropdown").value
    console.log(document.getElementById("dropdown").innerText)
    document.getElementById("output").innerText = document.getElementById("dropdown").value*/
    // Get the <select> element by its id
    var dropdown = document.getElementById("dropdown");
    
    var selectedOptionValue = dropdown.value;
    var location = secondElements[firstElements.indexOf(selectedOptionValue)]
    console.log(location);
    document.getElementById("output").innerText = `The item is in ${location}`
   //document.getElementById("output").textContent = "Selected option: " + selectedOptionValue;
}

document.getElementById('excelFile').addEventListener('change', handleFile);

document.getElementById('excelFile').addEventListener('change', handleFile);

function handleFile(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

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
