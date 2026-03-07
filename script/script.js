
const spinner = document.getElementById('spinner')
const issueContainer = document.getElementById("issue-container");

const showSpinner =()=>{
  spinner.classList.remove('hidden')
}
const hideSpinner =()=>{
  spinner.classList.add('hidden')
}

const loadIssue = () => {
  showSpinner()
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((issue) => {
      console.log(issue.data);
      displayIssue(issue.data);
      hideSpinner()
    });
};
const displayIssue = (allIssue) => {
  issueContainer.innerHTML = "";

  allIssue.forEach((cards) =>{
    const card = document.createElement("div");
    card.className = `
        max-w-sm bg-white rounded-xl shadow-md p-5 border-t-4 ${cards.priority === "high" || cards.priority === "medium" ? "border-green-500" : "border-red-500"}
        `;

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