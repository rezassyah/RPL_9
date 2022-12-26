var ctx = document.getElementById("myChart").getContext("2d");

    // Set the chart data
    var data = {
      labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      datasets: [
        {
          label: "2021",
          fill: false,
          lineTension: 0.32,
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
          data: [1000000, 2000000, 3000000, 4000000, 5000000, 4000000, 3000000, 2000000, 1000000, 2000000, 3000000, 4000000],
        },
        {
          label: "2022",
          fill: false,
          lineTension: 0.32,
          backgroundColor: "rgba(248, 72, 163, 0.8)",
          borderColor: "rgba(248, 72, 163, 0.8)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(248, 72, 163, 0.8)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(248, 72, 163, 0.8)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [1500000, 2000000, 3000000, 3500000, 4000000, 2500000, 5000000, 6000000, 7000000, 8000000, 1000000, 9000000]
,
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


    var ctx = document.getElementById('income-chart').getContext('2d');
var chart = new Chart(ctx, {
    // Tipe chart yang akan dibuat
    type: 'bar',
    // Data yang akan ditampilkan di chart
    data: {
        labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        datasets: [{
            label: 'Pendapatan (Rp)',
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            data: [1500000, 2000000, 3000000, 3500000, 4000000, 2500000, 5000000, 6000000, 7000000, 8000000, 1000000, 9000000]

        }]
    },
    // Opsi yang akan diterapkan pada chart
    options: {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false,
            min: 0,
            stepSize: 1000000
          }
        }]
      }
      
    }
});


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

    