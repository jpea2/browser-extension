const inputBtn = document.querySelector("#input-btn")
let welcomeMsg = document.querySelector("#welcomemsg-el")
let myLeads = []
const clearInputBtn = document.querySelector("#clear-input-btn")
const ulEl = document.querySelector("#ul-el")
const inputEl = document.querySelector("#input-el")
const savedLeadsEl = document.querySelector("#savedLeads-el")
const deleteBtn = document.querySelector("#delete-btn")
const inputTabBtn = document.querySelector("#input-tab-btn")
const storedLeadsLocal = JSON.parse(localStorage.getItem("myLeads"))
const autoAddTab = document.querySelector("#auto-add-tab-btn")

if (storedLeadsLocal) {
    myLeads = storedLeadsLocal
    render(myLeads)
}

clearInputBtn.addEventListener("click", function() {
    if (inputEl.value) {
        inputEl.value = ""
    }
})


//.innerHTMl comes at a cost. So do we want it done once or for     
//each time in the loop? Thats why we can set it once at the end of the loop

autoAddTab.addEventListener("click", function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
        updateListCount()
    })
})

inputTabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    inputEl.value = tabs[0].url
    })
})

function render(leads) {
    let listItems = ""
    // start // finish // increment
    for (i = 0; i < leads.length; i++){
        listItems += `
        <li>
            <a href='${leads[i]}' target='_blank'>
                ${leads[i]} 
            </a>
        </li>` 
    }
    ulEl.innerHTML = listItems
}

//deletes local storage of saved links
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    updateListCount()
    render(myLeads) 
})



function updateListCount() {
    savedLeadsEl.textContent = myLeads.length
}
updateListCount()



inputBtn.addEventListener("click", function () {
    if (inputEl.value){
        myLeads.push(inputEl.value)
        render(myLeads)
        updateListCount()
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        console.log(localStorage.getItem("myLeads"))
        inputEl.value = ""
    }
})

render(myLeads)