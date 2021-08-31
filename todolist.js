function getAndUpdate(){
    console.log("Updating the list...");
    titleOfTask = document.getElementById("title").value;
    descOfTask = document.getElementById("description").value;
    if(localStorage.getItem('itemsJson') == null){
        itemJsonArray = [];
        itemJsonArray.push([titleOfTask, descOfTask]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([titleOfTask, descOfTask]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    update();
}

function update(){
    if(localStorage.getItem('itemsJson') == null){
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
}
else{
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
}

//populate the table
let tableBody = document.getElementById('tableBody');
let str = "";
itemJsonArray.forEach((element, index) => {
    str += `
    <tr>
      <th scope="row">${index + 1}</th>
      <td>${element[0]}</td>
      <td>${element[1]}</td>
      <td>
        <button
          class="btn btn-sm btn-primary"
          style="background-color: rgb(7, 71, 71)"
          onclick="deleteTask(${index})"
        >
          Delete
        </button>
      </td>
    </tr>`;
});
tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();

function deleteTask(itemIndex){
console.log("Delete", itemIndex);
itemJsonArrayStr = localStorage.getItem('itemsJson');
itemJsonArray = JSON.parse(itemJsonArrayStr);
//Delete the tem index elements fron the itms array
itemJsonArray.splice(itemIndex, 1);
localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
update();
}

function clearStorage(){
if(confirm("Your existing tasks will be erased. Do you really want to clear?")){
    console.log('Clearing the storage');
    localStorage.clear();
    update();
}
}