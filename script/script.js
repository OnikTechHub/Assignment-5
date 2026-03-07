const allBTN = document.getElementById('allBtn')

const openBTN = document.getElementById('openBtn')

const closedBTN = document.getElementById('closedBtn')

const spinner = document.getElementById('spinner')
const issueContainer = document.getElementById("issue-container");
const issueCount = document.querySelector('.text-3xl.font-bold')

const modal = document.getElementById('issueModal')

const modalContainer = document.getElementById('modal-box') 
let allIssue = [];

const showSpinner = () => {
    spinner.classList.remove('hidden')
}
const hideSpinner = () => {
    spinner.classList.add('hidden')
}

function activeButton(btn) {
    allBTN.classList.remove("btn-primary")
    openBTN.classList.remove("btn-primary")
    closedBTN.classList.remove("btn-primary")
    btn.classList.add("btn-primary")
}

allBTN.addEventListener('click', function () {
    activeButton(allBTN)
    displayIssue(allIssue)
})

closedBTN.addEventListener('click', function () {
    activeButton(closedBTN)
    const closeIssue = allIssue.filter(issue => issue.status.toLowerCase() === "closed")
    displayIssue(closeIssue)
})

openBTN.addEventListener('click', function () {
    activeButton(openBTN)
    const openIssue = allIssue.filter(issue => issue.status.toLowerCase() === "open")
    displayIssue(openIssue)
})

const loadModal = (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    displayModal(data.data)
  })
}

const displayModal = (info) => {
  document.getElementById('modalTitle').innerText = info.title;
  document.getElementById('modalDescription').innerText = info.description;
  document.getElementById('modalStatus').innerText = info.status;
  document.getElementById('modalAuthor').innerText = info.author;
  document.getElementById('modalPriority').innerText = info.priority;
  document.getElementById('modalDate').innerText = new Date(info.createdAt).toLocaleDateString();

    modal.showModal();
}

function createLabels(labels) {
  if (!labels) return "";
  return labels.map(label => {
    let bgColor = "";
    let textColor = "";
    let icon = ""
    if (label.toLowerCase() === "bug") {
      icon = '<i class="fa-solid fa-bug"></i>';
    
    
    }
    
    else if (label.toLowerCase() === "help wanted") {
      bgColor = "bg-orange-100"; textColor = "text-orange-500";
      icon = '<i class="fa-solid fa-life-ring"></i>';
    } 
    
    else {bgColor = "bg-purple-100"; textColor = "text-purple-500";
      icon = '<i class="fa-regular fa-star"></i>';
    }
    
    return `
      <span class="flex items-center gap-1 ${bgColor} ${textColor} text-[10px] px-2 py-0.5 rounded-full font-medium">
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
  .then((data) => {
    allIssue = data.data; 
    displayIssue(allIssue);
    hideSpinner()});
};

const displayIssue = (issues) => {
    issueContainer.innerHTML = "";
    const countHeader = document.querySelector('.text-3xl.font-bold');
    if (countHeader) countHeader.innerText = issues.length + " Issues";

    issues.forEach((cards) => {
        const cardLabel = createLabels(cards.labels)
        const card = document.createElement("div");
        
       
        const borderColor = cards.status.toLowerCase() === "open" ? "border-green-500" : "border-purple-500";

        card.className = `max-w-sm bg-white rounded-xl shadow-md p-5 border-t-4 ${borderColor} cursor-pointer`;
    card.innerHTML = `
   
  <div class="flex justify-between items-center mb-4">
    

    <div class="w-10 h-10 flex items-center justify-center rounded-full  ${cards.priority === "low" ? "bg-red-100": "bg-green-100" }">
    ${cards.priority === "high" || cards.priority === "medium" ? '<img class="w-8" src="./assets/Open-Status.png" alt="open">':'<img src="./assets/Closed- Status .png" alt="closed">'}
      
    </div>
    <span class=" text-sm px-4 py-1 rounded-full font-semibold ${cards.priority === "high" ? "text-red-500 bg-red-100" : 
        cards.priority === "medium" ? "text-orange-500 bg-orange-100" : 
        "text-gray-500 bg-gray-100"}">
    ${cards.priority}
    </span>
  </div>


  <h2 class="text-lg font-bold text-gray-800 mb-2">
    ${cards.title}
  </h2>

 
  <p class="text-gray-500 text-sm mb-4 line-clamp-2">
    ${cards.description}
  </p>


  <div class="flex gap-3 mb-4">
    <span class="flex items-center gap-1 bg-red-100 text-red-500 text-xs px-3 py-1 rounded-full font-medium">
     <i class="fa-solid fa-bug  "></i>
      BUG
    </span>

    <span class="flex items-center gap-1 bg-orange-100 text-orange-500 text-xs px-3 py-1 rounded-full font-medium">
    <i class="fa-solid fa-life-ring"></i>
      HELP WANTED
    </span>
  </div>

  <div class="border-t pt-3 text-sm text-gray-500">
    <p>#1 ${cards.author}</p>
    <p>${cards.createdAt}</p>
  </div>


    `;

    issueContainer.appendChild(card);
  
  });
};
loadIssue();