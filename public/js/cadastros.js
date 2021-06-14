var type;

$(".browser_file").on('click', function(){
    type = $(this).attr("id");
    var file = $(this).parent().find(".file_selector");  
    file.trigger("click");
});
  
$('input[type="file"]').change(function(event){
var fileUpload = document.getElementById("fileUpload");
var reader = new FileReader();
var excelRows;
reader.onload = function(event) {    
    var workbook = XLSX.read(event.target.result, {
        type: 'binary'
    });
    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];    
    //Read all rows from First Sheet into an JSON array.
    excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);

    var chunk = chunkRows(excelRows, 500);
    for (let index = 0; index < chunk.length; index++) {
        var element = chunk[index];
            $.ajax({
            url: "cadastros/saveSpreadsheet",
            method: "POST",
            context: document.body,
            data: {'data': element, 'type':type}       
        });
    }   
};
    reader.readAsBinaryString(fileUpload.files[0]);
});

  /**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
 function chunkRows(myArray, chunk_size){
    var results = [];
    
    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }
    
    return results;
  }