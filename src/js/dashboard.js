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

// Get the context of the canvas element we want to select
var ctx = document.getElementById("myChart").getContext("2d");

// Set the chart data
var data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

// Set the chart options
var options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

// Create the chart using the chart canvas and data
var myLineChart = new Chart(ctx, {
  type: "line",
  data: data,
  options: options,
});
