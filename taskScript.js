let task_array = [];

document.addEventListener('DOMContentLoaded', function() {
  let itemID = 0;

  document.querySelector("#new_task").onsubmit = function () {

    const li = document.createElement('li');

    let task_text = document.querySelector('#task').value;
    let task_priority = document.querySelector('#priorities').value;
    let task_status = "";

    //get completion status from newly submitted item
    var ele = document.getElementsByName('status');
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked){
          task_status = ele[i].value;
          console.log("ts: " + task_status);
        }
    }
    let status_css = "";

    if(task_status == "completed"){
      status_css = "completeStyle";
      console.log(status_css);
    }
    else{
      status_css = "pendingStyle";
    }

    //check that all fields are completed
    if(task_text == "" || task_priority == "" || task_status == ""){
      alert("Please complete all fields before submitting a new item.");
    }
    else{
      //update array with new item
      itemID ++;
      task_array.push({"itemID": itemID, "task_text":task_text, "task_priority":task_priority, "task_status":task_status});

      //set task color based on priority
      let task_color = "";
      if(task_priority == "low"){
        task_color = "green";
      }
      else if(task_priority == "medium"){
        task_color = "orange";
      }
      else{
        task_color = "red";
      }

      let new_task_html = `
                          <span style="color:${task_color};">${task_text}</span>
                          <button class="removeBtn" onclick="removeItem(${itemID})">X</button>
                          <button class="changeStatusBtn" onclick="changeStatus(${itemID})">Change Status</button>
                          `;
      //determine how to display based on status
      if(task_status=="completed"){
        li.style.textDecoration = "line-through";
      }
      else{
        li.style.textDecoration = "none";
      }

      //display new item
      li.innerHTML = new_task_html;

      document.querySelector("#task_list").append(li);
      document.querySelector("#task").value = '';
      document.querySelector("#priorities").value = 'low';
      //console.table(task_array);
    }
    return false;
  }
});



function changeStatus(id){
  //console.log("change status of item with this id: " + id);

  //update display of task
  element = event.target;
  if(element.className ==='changeStatusBtn'){
    if(element.parentElement.style.textDecoration == 'line-through'){
      element.parentElement.style.textDecoration = 'none';
    }
    else{
      element.parentElement.style.textDecoration = "line-through";
    }
  }

  //update task status in array
  objIndex = task_array.findIndex((o => o.itemID == id));
  currentStatus = task_array[objIndex].task_status;
  if(currentStatus == "pending"){
    task_array[objIndex].task_status = "completed";
  }
  else{
    task_array[objIndex].task_status = "pending";
  }
  //console.table(task_array);

}



function removeItem(id){
  //remove item from displayed ul
  element = event.target;
  if(element.className ==='removeBtn'){
    element.parentElement.remove();
    //console.log(element.parentElement);
  }

  //remove selected item from array as well
  let obj = task_array.find(o => o.itemID === id);
  for( var i = 0; i < task_array.length; i++){
    if ( task_array[i] === obj) {
        task_array.splice(i, 1);
    }
  }
  //console.table(task_array);
}
