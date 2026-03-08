const allBTN = document.getElementById('all-btn')

const openBTN = document.getElementById('open-btn')

const closeBTN = document.getElementById('close-btn')

const inputBTN = document.getElementById('input-search')

const inputText = document.getElementById('input-text')

const spinner = document.getElementById('spinner')
const issueContainer = document.getElementById("issue-container");

const issueCount = document.getElementById('issue-count')
const modal = document.getElementById('modal')

const modalContainer = document.getElementById('modal-container')
let allIssue = [];
const showSpinner =()=>{
  spinner.classList.remove('hidden')
}
const hideSpinner =()=>{
  spinner.classList.add('hidden')
}

const searchValue= ()=>{
  inputBTN.addEventListener('click',function(){
activeButton(allBTN)
showSpinner()
 const inpuValue = inputText.value.trim().toLowerCase()

 const url =`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inpuValue}`

fetch(url)
.then((res)=> res.json())
.then((data)=> {
  let value =  data.data

  displayIssue(value)
  
})
hideSpinner()
})

}
 searchValue()


function activeButton(btn){
  allBTN.classList.remove("btn-primary")
  openBTN.classList.remove("btn-primary")
  closeBTN.classList.remove("btn-primary")

  btn.classList.add("btn-primary")
}
allBTN.addEventListener('click',function(){
activeButton(allBTN)
  displayIssue(allIssue)
})
closeBTN.addEventListener('click',function(){
 
  activeButton(closeBTN)
  showSpinner()
  const closeIssue = allIssue.filter(issue=> issue.status ==="closed")
  displayIssue(closeIssue)
  hideSpinner()

})
openBTN.addEventListener('click',function(){
  activeButton(openBTN)
  showSpinner()
  const openIssue = allIssue.filter(issue=>issue.status==="open")
  displayIssue(openIssue)
  hideSpinner()
})

const loadModal =(id)=>{

  
const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  fetch(url)
  .then((res)=>res.json())
  .then((data)=>{
   displayModal(data.data)})
  }
const displayModal=(info)=>{
  const cardLabels = createLabels(info.labels);
  modalContainer.innerHTML =`
  <div class="w-full max-w-2xl bg-white rounded-xl ">
    <div class="flex items-start justify-between">
      <div>
        <h2 class="text-xl font-semibold text-gray-800">
        ${info.title}
        </h2>

        <div class="flex items-center gap-2 mt-2 text-sm text-gray-500">
          <span class="px-2 py-0.5 text-xs font-medium rounded-full ${
  info.status === "open"
    ? "text-green-700 bg-green-100"
    : "text-red-700 bg-red-100"
} ">
        ${info.status}
          </span>
          <span>• Opened ${info.author}</span>
          <span>• ${info.createdAt}</span>
        </div>
      </div>
    </div>
    <div class="flex gap-2 mt-4">
     ${cardLabels}
    </div>
    <p class="mt-4 text-gray-600 text-sm line-clamp-2">
     ${info.description}
    </p>
    <div class="mt-6 bg-gray-100 rounded-lg p-4 grid grid-cols-2 gap-4">

      <div>
        <p class="text-xs text-gray-500">Assignee:</p>
        <p class="font-medium text-gray-800">${info.assignee}</p>
      </div>

      <div>
        <p class="text-xs text-gray-500">Priority:</p>
        <span class="inline-block px-3 py-1 text-xs font-semibold ${info.priority === "high" ? "text-purple-500 bg-purple-100" : 
        info.priority === "medium" ? "text-orange-500 bg-orange-100" : 
        "text-gray-500 bg-gray-100"}">
         ${info.priority}
        </span>
      </div>
    </div>
  </div>`
modal.showModal()
}

function createLabels(labels){
  
  return labels.map(label => {

    let bgColor = "";
    let textColor = "";
    let icon = "";

    if(label === "bug"){
      bgColor = "bg-red-100";
      textColor = "text-red-500";
      icon = '<i class="fa-solid fa-bug"></i>';
    }
    else if(label === "help wanted"){
      bgColor = "bg-orange-100";
      textColor = "text-orange-500";
      icon = '<i class="fa-solid fa-life-ring"></i>';
    }
    else {
      bgColor = "bg-purple-100";
      textColor = "text-purple-500";
      icon = '<i class="fa-regular fa-star"></i>';
    }

    return `
      <span class="flex items-center gap-1 ${bgColor} ${textColor} text-xs px-3 py-1 rounded-full font-medium">
        ${icon} ${label.toUpperCase()}
      </span>
    `;
  }).join(""); 
}

const loadIssue = () => {
  showSpinner()
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((issue) => {
      allIssue = issue.data
      displayIssue(allIssue);
      hideSpinner()
     
    });
};
const displayIssue = (allIssue) => {
  issueContainer.innerHTML = "";

issueCount.innerText = allIssue.length + " Issues"
 
  allIssue.forEach((cards) =>{
    const cardLavel = createLabels(cards.labels)
    const card = document.createElement("div");
    card.className = ` max-w-sm bg-white rounded-xl shadow-md p-5 border-t-4 ${cards.status === "open"? "border-green-500" : "border-purple-500"}
        `;

    card.innerHTML = `
  <div onclick="loadModal(${cards.id})" class="flex justify-between items-center mb-4 cursor-pointer">
    <div class="w-10 h-10 flex items-center justify-center rounded-full  ${cards.status === "closed" ? "bg-red-100": "bg-green-100" }">
    ${cards.status === "open"? '<img class="w-8" src="./assets/Open-Status.png" alt="open">':'<img src="./assets/Closed-Status.png" alt="">'}
      
    </div>
    <span class=" text-sm px-4 py-1 rounded-full font-semibold ${cards.priority === "high" ? "text-purple-500 bg-purple-100" : 
        cards.priority === "medium" ? "text-orange-500 bg-orange-100" : 
        "text-gray-500 bg-gray-100"}">
    ${cards.priority}
    </span>
  </div>
  <h2 onclick="loadModal(${cards.id})" class="text-lg font-bold text-gray-800 mb-2 cursor-pointer">
    ${cards.title}
  </h2>
  <p onclick="loadModal(${cards.id})" class="text-gray-500 text-sm mb-4 line-clamp-2 ">
    ${cards.description}
  </p>
  <div onclick="loadModal(${cards.id})" class="flex gap-3 mb-4 cursor-pointer">
   ${cardLavel}
  </div>

  <div onclick="loadModal(${cards.id})" class="border-t pt-3 text-sm text-gray-500 cursor-pointer">
    <p>#1 ${cards.author}</p>
    <p>${cards.createdAt}</p>
  </div>
    `;
    issueContainer.appendChild(card);
    
  });
 
};
loadIssue();