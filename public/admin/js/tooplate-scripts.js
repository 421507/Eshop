/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 00:25:09
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 17:17:52
 */
const width_threshold = 480;

function drawLineChart() {
  if ($("#lineChart").length) {
    ctxLine = document.getElementById("lineChart").getContext("2d");
    optionsLine = {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Hits"
            }
          }
        ]
      }
    };

    // Set aspect ratio based on window width
    optionsLine.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    configLine = {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Latest Hits",
            data: [88, 68, 79, 57, 50, 55, 70],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            cubicInterpolationMode: "monotone",
            pointRadius: 0
          },
          {
            label: "Popular Hits",
            data: [33, 45, 37, 21, 55, 74, 69],
            fill: false,
            borderColor: "rgba(255,99,132,1)",
            cubicInterpolationMode: "monotone",
            pointRadius: 0
          },
          {
            label: "Featured",
            data: [44, 19, 38, 46, 85, 66, 79],
            fill: false,
            borderColor: "rgba(153, 102, 255, 1)",
            cubicInterpolationMode: "monotone",
            pointRadius: 0
          }
        ]
      },
      options: optionsLine
    };

    lineChart = new Chart(ctxLine, configLine);
  }
}

function drawBarChart() {
  if ($("#barChart").length) {
    ctxBar = document.getElementById("barChart").getContext("2d");

    optionsBar = {
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 0.2,
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Products"
            }
          }
        ]
      }
    };

    optionsBar.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    /**
     * COLOR CODES
     * Red: #F7604D
     * Aqua: #4ED6B8
     * Green: #A8D582
     * Yellow: #D7D768
     * Purple: #9D66CC
     * Orange: #DB9C3F
     * Blue: #3889FC
     * Pink: #f542a7
     * StrongGreen: #00f70c
     * Black: #000000
     */

    $.ajax({
      type:'GET',
      url:'http://localhost:3000/api/admin/product/top',
      data:{}
    }).done(data=>{

      const names=[];
      const amounts=[];
      data.forEach(item=>{

        names.push(item.name);
        amounts.push(item.amount);
      });

      configBar = {
        type: "horizontalBar",
        data: {
          labels: names,
          datasets: [
            {
              label: "Number of sold products",
              data: amounts,
              backgroundColor: [
                "#F7604D",
                "#4ED6B8",
                "#A8D582",
                "#D7D768",
                "#9D66CC",
                "#DB9C3F",
                "#3889FC",
                "#f542a7",
                "#00f70c",
                "#000000"
              ],
              borderWidth: 0
            }
          ]
        },
        options: optionsBar
      };
      // configBar = {
      //   type: "horizontalBar",
      //   data: {
      //     labels: ["Red", "Aqua", "Green", "Yellow", "Purple", "Orange", "Blue"],
      //     datasets: [
      //       {
      //         label: "Number of sold products",
      //         data: [33, 40, 28, 49, 58, 38, 44],
      //         backgroundColor: [
      //           "#F7604D",
      //           "#4ED6B8",
      //           "#A8D582",
      //           "#D7D768",
      //           "#9D66CC",
      //           "#DB9C3F",
      //           "#3889FC"
      //         ],
      //         borderWidth: 0
      //       }
      //     ]
      //   },
      //   options: optionsBar
      // };
  
      barChart = new Chart(ctxBar, configBar);
    }).fail(data=>{
      alert(data.responseText);
      console.log(data.responseText);
    });

    // configBar = {
    //   type: "horizontalBar",
    //   data: {
    //     labels: ["Red", "Aqua", "Green", "Yellow", "Purple", "Orange", "Blue"],
    //     datasets: [
    //       {
    //         label: "Number of sold products",
    //         data: [33, 40, 28, 49, 58, 38, 44],
    //         backgroundColor: [
    //           "#F7604D",
    //           "#4ED6B8",
    //           "#A8D582",
    //           "#D7D768",
    //           "#9D66CC",
    //           "#DB9C3F",
    //           "#3889FC"
    //         ],
    //         borderWidth: 0
    //       }
    //     ]
    //   },
    //   options: optionsBar
    // };

    // barChart = new Chart(ctxBar, configBar);
  }
}

function drawPieChart() {
  if ($("#pieChart").length) {
    var chartHeight = 300;

    $("#pieChartContainer").css("height", chartHeight + "px");

    ctxPie = document.getElementById("pieChart").getContext("2d");

    optionsPie = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
        }
      },
      legend: {
        position: "top"
      }
    };

    const now=new Date();

    $.ajax({
      type:'GET',
      url:`http://localhost:3000/api/admin/product/profit?year=${now.getFullYear()}`,
      data:{}
    }).done(data=>{

      console.log(data);

      const profits=[];
      const months=[];

      data.forEach(element => {
        profits.push(element.profit);
        months.push(`Month ${element.month}`);
      });

      configPie = {
        type: "pie",
        data: {
          datasets: [
            {
              data: profits,
              backgroundColor: [
                "#F7604D",
                "#4ED6B8",
                "#A8D582",
                "#D7D768",
                "#9D66CC",
                "#DB9C3F",
                "#3889FC",
                "#f542a7",
                "#00f70c",
                "#000000",
                "#ffffff",
                "#cfad6d"
              ],
              label: "Storage"
            }
          ],
          labels: months
        },
        options: optionsPie
      };
  
      pieChart = new Chart(ctxPie, configPie);

    }).fail(data=>{
      alert(data.responseText);
      console.log(data.responseText);
    });

    // configPie = {
    //   type: "pie",
    //   data: {
    //     datasets: [
    //       {
    //         data: [18.24, 6.5, 9.15],
    //         backgroundColor: [
    //           "#F7604D",
    //           "#4ED6B8",
    //           "#A8D582",
    //           "#D7D768",
    //           "#9D66CC",
    //           "#DB9C3F",
    //           "#3889FC",
    //           "#f542a7",
    //           "#00f70c",
    //           "#000000",
    //           "#ffffff",
    //           "#cfad6d"
    //         ],
    //         label: "Storage"
    //       }
    //     ],
    //     labels: [
    //       "Used Storage (18.240GB)",
    //       "System Storage (6.500GB)",
    //       "Available Storage (9.150GB)"
    //     ]
    //   },
    //   options: optionsPie
    // };

    // pieChart = new Chart(ctxPie, configPie);
  }
}

function updateLineChart() {
  if (lineChart) {
    lineChart.options = optionsLine;
    lineChart.update();
  }
}

function updateBarChart() {
  if (barChart) {
    barChart.options = optionsBar;
    barChart.update();
  }
}
function updatePieChart() {

  const year=$('#year option:selected').val();

  if(year === ''){
    alert('Select a year');
    return;
  }

  $.ajax({
    type:'GET',
    url:`http://localhost:3000/api/admin/product/profit?year=${year}`,
    data:{}
  }).done(data=>{

    console.log(data);

    const profits=[];
    const months=[];

    data.forEach(element => {
      profits.push(element.profit);
      months.push(months.push(`Month ${element.month}`));
    });

    if (pieChart) {
      pieChart.data.labels=months;
      // console.log(pieChart.data.datasets)
      pieChart.data.datasets[0].data=profits;
      pieChart.update();
    }

  }).fail(data=>{
    alert(data.responseText);
    console.log(data.responseText);
  });

  
}
