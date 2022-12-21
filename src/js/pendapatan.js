const body = document.querySelector('body'),
sidebar = body.querySelector('nav'),
toggle = body.querySelector(".toggle"),
searchBtn = body.querySelector(".search-box"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text")


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close")
})

searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close")
})

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark")
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode"
    }else{
        modeText.innerText = "Dark mode"
        
    }
})


// Get the canvas element
const canvas = document.getElementById('income-chart');

// Get the income report data
const data = getIncomeReportData();

// Create the chart
const chart = new Chart(canvas, {
  type: 'bar', // Change this to the type of chart you want to create (e.g. 'line', 'pie', etc.)
  data: {
    labels: data.map(entry => entry.date), // Use the date as the label for each data point
    datasets: [{
      label: 'Income',
      data: data.map(entry => entry.amount), // Use the amount as the data for each data point
      backgroundColor: 'rgba(255, 99, 132, 0.2)', // Set the background color for each bar
      borderColor: 'rgba(255, 99, 132, 1)', // Set the border color for each bar
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});