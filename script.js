// Get a reference to the form element
const form = document.getElementById("myForm");
const ul = document.getElementById("output");

// Add an event listener to the submit button
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the form from actually submitting

  // Access the form elements and retrieve their values
  const amount = document.getElementById("amount").value;
  const desc = document.getElementById("desc").value;
  const category = document.getElementById("category").value;

  const oldData = JSON.parse(localStorage.getItem("data")) || [];

  // You now have the values from the Bootstrap form
  const formData = {
    amount,
    desc,
    category,
  };
  console.log(formData);

  // Convert the object to a JSON string
  const formDataJSON = JSON.stringify([...oldData, formData]);

  // Save the JSON string to localStorage
  localStorage.setItem("data", formDataJSON);

  // You can perform further processing with these values here
  let li = document.createElement("li");
  let newSpan = document.createElement("span");
  newSpan.textContent = `${amount}-${desc}-${category}`;
  li.appendChild(newSpan);
  li.classList.add("list-group-item");

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.nodeType = "button"
  deleteBtn.classList.add("btn", "btn-danger");
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", function () {
    const item = this.parentElement;

    if (item) {
      let itemArray = item.firstChild.textContent.split("-")

      let data = JSON.parse(localStorage.getItem("data"))

      let newData = data.filter((ele) => {
        return (ele.amount !== itemArray[0] && ele.desc !== itemArray[1] && ele.category !==itemArray[2])
    })
    localStorage.setItem("data",JSON.stringify(newData))
    item.remove()
    }
  });

  // Edit Button
  const editBtn = document.createElement("button")
  editBtn.classList.add("btn", "btn-secondary");
  editBtn.textContent = "Edit"

  editBtn.addEventListener("click" , function () {
    const item = this.parentElement

    if (item) {
        let itemArray = item.firstChild.textContent.split("-")
  
        let data = JSON.parse(localStorage.getItem("data"))
  
        let newData = data.filter((ele) => {
          return (ele.amount !== itemArray[0] && ele.desc !== itemArray[1] && ele.category !==itemArray[2])
      })
      localStorage.setItem("data",JSON.stringify(newData))
      document.getElementById("amount").value = `${itemArray[0]}`;
      document.getElementById("desc").value = `${itemArray[1]}`;
      document.getElementById("category").value = `${itemArray[2]}`

      item.remove()
      }
  })

  li.appendChild(deleteBtn);
  li.appendChild(editBtn)
  ul.appendChild(li);

  document.getElementById("amount").value = "";
  document.getElementById("desc").value = ""
  ;
});
