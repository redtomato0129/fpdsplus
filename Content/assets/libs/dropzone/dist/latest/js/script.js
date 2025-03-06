$(document).ready(function () {
  // (function () {
  //   var showChar = 400;
  //   var ellipsestext = "...";

  //   $(".truncate").each(function () {
  //     var content = $(this).html();
  //     if (content.length > showChar) {
  //       var c = content.substr(0, showChar);
  //       var h = content;
  //       var html =
  //         '<div class="truncate-text" style="display:block">' +
  //         c +
  //         '<span class="moreellipses">' +
  //         '<a href="" class="moreless more"> Read More...</a></span></div>' + '<div class="truncate-text" style="display:none">' +
  //         h + '<p class="moreellipses"><a href="" class="moreless less">View Less...</a></p></div>';

  //       $(this).html(html);
  //     }
  //   });

  //   // $(".user-ownans").each(function () {
  //   //   var content = $(this).html();
  //   //   if (content.length > showChar) {
  //   //     var c = content.substr(0, showChar);
  //   //     var h = content;
  //   //     var html =
  //   //       '<div class="truncate-text" style="display:block">' +
  //   //       c +
  //   //       '<span class="moreellipses">' +
  //   //       '<a href="" class="moreless more"> Read More...</a></span></div>' + '<div class="truncate-text" style="display:none">' +
  //   //       h + '<p class="moreellipses"><a href="" class="moreless less">View Less...</a></p></div>';

  //   //     $(this).html(html);
  //   //   }
  //   // });

  //   $(".moreless").click(function () {
  //     var thisEl = $(this);
  //     var cT = thisEl.closest(".truncate-text");
  //     var tX = ".truncate-text";

  //     if (thisEl.hasClass("less")) {
  //       cT.prev(tX).toggle();
  //       cT.slideToggle();
  //     } else {
  //       cT.toggle();
  //       cT.next(tX).fadeToggle();
  //     }
  //     return false;
  //   });
  //   /* end iffe */
  // })();

  /* end ready */

  /*************************bar chart js*************************** */
  var DEFAULT_DATASET_SIZE = 7,
    addedCount = 0,
    color = Chart.helpers.color;


  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var chartColors = {
    gray: "#C2C2C2",
    // blue: "#A0A9C6",
    // green: "#848D78",
    // orange: "#ff6384",
  };

  var borderColors = {
    // gray: "#8F9192",
    // blue: "#96979A",
    // green: "#696F63",
    // orange: "#b30026",
  };

  function randomScalingFactor() {
    return Math.round(Math.random() * 100);
  }

  var barData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [{
      label: "",
      backgroundColor: [
        "#C2C2C2", "#96ce6b", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2"
      ],
      borderColor: borderColors.gray,
      borderWidth: 0,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
      ],
    }, ],
  };
  
  var barData2 = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [{
      label: "",
      // backgroundColor: chartColors.gray,
      backgroundColor: [
        "#C2C2C2", "#C2C2C2", "#C2C2C2", "#ed928f", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2"
      ],
      borderColor: borderColors.gray,
      borderWidth: 1,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
      ],
    }, ],
  };
  var barData4 = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [{
      label: "",
      backgroundColor: [
        "#C2C2C2", "#96ce6b", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2"
      ],
      // backgroundColor: chartColors.gray,
      borderColor: borderColors.gray,
      borderWidth: 1,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
      ],
    }, ],
  };
  var barData5 = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [{
      label: "",
      backgroundColor: [
        "#C2C2C2", "green", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2"
      ],
      // backgroundColor: chartColors.gray,
      borderColor: borderColors.gray,
      borderWidth: 1,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
      ],
    }, ],
  };
  var barData3 = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [{
      label: "",
      backgroundColor: [
        "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2"
      ],
      // backgroundColor: chartColors.gray,
      borderColor: borderColors.gray,
      borderWidth: 1,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
      ],
    }, ],
  };
  var index = 11;
  var ctx = document.getElementById("barChart").getContext("2d");
  Chart.register(ChartDataLabels);
  var myNewChartB = new Chart(ctx, {
    type: "bar",
    data: barData,
    options: {
      borderSkipped: false,
      borderRadius: 3,
      //responsive: false,
      plugins: {
        barRoundness: 1,
        legend: {
          display: false,
        },
        title: {
          font: {
            size: 16
          },
          display: true,
          text: 'Researchers (n=3)',
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 30
          }
        },
        datalabels: {
          display: true,
          clamp: true,
          formatter: (val, context) => (`${val}%`),
          anchor: 'end',
          align: 'end',
        }
      },

      responsive: true,
      tooltips: {
        enabled: false,
      },
      maintainAspectRation: true,
      hover: {
        animationDuration: 0,
      },
      animation: {
        duration: 1,
        onComplete: function () {


        },
      },

      scales: {
        x: {
          display: true,
          title: {
            font: {
              size: 16
            },
            display: true,
            text: "Scroes (1-9)",
          },
          grid: {
            display: false,
            drawBorder: false, //<- set this
          },
        },
        y: {
          display: true,

          ticks: {
            display: false
          },
          title: {
            font: {
              size: 16
            },
            display: true,
            text: "% of Respondants",
          },
          grid: {
            drawBorder: false, //<- set this
          },
        },
      },
    },
  });
  /**********************2************************/
  var ctx = document.getElementById("barChart2").getContext("2d");
  var myNewChartB = new Chart(ctx, {
    type: "bar",
    data: barData2,
    options: {
      borderSkipped: false,
      borderRadius: 3,
      //responsive: false,
      plugins: {
        barRoundness: 1,
        legend: {
          display: false,
        },
        title: {
          font: {
            size: 16
          },
          display: true,
          text: 'Researchers (n=3)',
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 30
          }
        },
        datalabels: {
          display: true,
          clamp: true,
          formatter: (val, context) => (`${val}%`),
          anchor: 'end',
          align: 'end',
        }
      },

      responsive: true,
      tooltips: {
        enabled: false,
      },
      maintainAspectRation: true,
      hover: {
        animationDuration: 0,
      },
      animation: {
        duration: 1,
        onComplete: function () {


        },
      },

      scales: {
        x: {
          display: true,
          title: {
            font: {
              size: 16
            },
            display: true,
            text: "Scroes (1-9)",
          },
          grid: {
            display: false,
            drawBorder: false, //<- set this
          },
        },
        y: {
          display: true,

          ticks: {
            display: false
          },
          title: {
            font: {
              size: 16
            },
            display: true,
            text: "% of Respondants",
          },
          grid: {
            drawBorder: false, //<- set this
          },
        },
      },
    },
  });
  /************************3 *********************/
  var ctx = document.getElementById("barChart3").getContext("2d");
  var myNewChartB = new Chart(ctx, {
    type: "bar",
    data: barData3,
    options: {
      borderSkipped: false,
      borderRadius: 3,
      //responsive: false,
      plugins: {
        barRoundness: 1,
        legend: {
          display: false,
        },
        title: {
          font: {
            size: 16
          },
          display: true,
          text: 'Researchers (n=3)',
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 30
          }
        },
        datalabels: {
          display: true,
          clamp: true,
          formatter: (val, context) => (`${val}%`),
          anchor: 'end',
          align: 'end',
        }
      },

      responsive: true,
      tooltips: {
        enabled: false,
      },
      maintainAspectRation: true,
      hover: {
        animationDuration: 0,
      },
      animation: {
        duration: 1,
        onComplete: function () {


        },
      },

      scales: {
        x: {
          display: true,
          title: {
            font: {
              size: 16
            },
            display: true,
            text: "Scroes (1-9)",
          },
          grid: {
            display: false,
            drawBorder: false, //<- set this
          },
        },
        y: {
          display: true,

          ticks: {
            display: false
          },
          title: {
            font: {
              size: 16
            },
            display: true,
            text: "% of Respondants",
          },
          grid: {
            drawBorder: false, //<- set this
          },
        },
      },
    },
  });


  /************************3 *********************/
  var ctx = document.getElementById("barChart4").getContext("2d");
  var myNewChartB = new Chart(ctx, {
    type: "bar",
    data: barData4,
    options: {
      borderSkipped: false,
      borderRadius: 3,
      //responsive: false,
      plugins: {
        barRoundness: 1,
        legend: {
          display: false,
        },
        title: {
          font: {
            size: 16
          },
          display: true,
          text: 'Researchers (n=3)',
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 30
          }
        },
        datalabels: {
          display: true,
          clamp: true,
          formatter: (val, context) => (`${val}%`),
          anchor: 'end',
          align: 'end',
        }
      },

      responsive: true,
      tooltips: {
        enabled: false,
      },
      maintainAspectRation: true,
      hover: {
        animationDuration: 0,
      },
      animation: {
        duration: 1,
        onComplete: function () {


        },
      },

      scales: {
        x: {
          display: true,
          title: {
            font: {
              size: 16
            },
            display: true,
            text: "Scroes (1-9)",
          },
          grid: {
            display: false,
            drawBorder: false, //<- set this
          },
        },
        y: {
          display: true,

          ticks: {
            display: false
          },
          title: {
            font: {
              size: 16
            },
            display: true,
            text: "% of Respondants",
          },
          grid: {
            drawBorder: false, //<- set this
          },
        },
      },
    },
  });


  /************************3 *********************/
  var ctx = document.getElementById("barChart5").getContext("2d");
  var myNewChartB = new Chart(ctx, {
    type: "bar",
    data: barData,
    options: {
      borderSkipped: false,
      borderRadius: 3,
      //responsive: false,
      plugins: {
        barRoundness: 1,
        legend: {
          display: false,
        },
        title: {
          font: {
            size: 16
          },
          display: true,
          text: 'Researchers (n=3)',
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 30
          }
        },
        datalabels: {
          display: true,
          clamp: true,
          formatter: (val, context) => (`${val}%`),
          anchor: 'end',
          align: 'end',
        }
      },

      responsive: true,
      tooltips: {
        enabled: false,
      },
      maintainAspectRation: true,
      hover: {
        animationDuration: 0,
      },
      animation: {
        duration: 1,
        onComplete: function () {


        },
      },

      scales: {
        x: {
          display: true,
          title: {
            font: {
              size: 16
            },
            display: true,
            text: "Scroes (1-9)",
          },
          grid: {
            display: false,
            drawBorder: false, //<- set this
          },
        },
        y: {
          display: true,

          ticks: {
            display: false
          },
          title: {
            font: {
              size: 16
            },
            display: true,
            text: "% of Respondants",
          },
          grid: {
            drawBorder: false, //<- set this
          },
        },
      },
    },
  });


  var barData4 = {
    // labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [{
      label: "",
      backgroundColor: chartColors.gray,
      borderColor: borderColors.gray,
      borderRadius: 5,
      borderWidth: 2,
      data: [],
    }, ],
  };
  /******************************right bar  top sec********************************* */
  var Charttop1 = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [{
      label: "",
      backgroundColor: [
        "#C2C2C2", "#69ba2e", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2", "#C2C2C2"
      ],
      // backgroundColor: chartColors.gray,
      borderColor: borderColors.gray,
      borderWidth: 0,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
      ],
    }, ],
  };
  // var Charttop1 = {
  //   labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  //   datasets: [{
  //     label: "",

  //     backgroundColor: chartColors.gray,
  //     borderColor: borderColors.gray,
  //     borderWidth: 0,
  //     data: [
  //       randomScalingFactor(),
  //       randomScalingFactor(),
  //       randomScalingFactor(),
  //       randomScalingFactor(),
  //       randomScalingFactor(),
  //       randomScalingFactor(),
  //       randomScalingFactor(),
  //       randomScalingFactor(),
  //       randomScalingFactor(),
  //     ],
  //   }, ],
  // };
  var ctx = document.getElementById("Charttop").getContext("2d");
  var myNewChartB = new Chart(ctx, {
    type: "bar",
    data: Charttop1,
    borderRadius: 5,
    options: {
      //responsive: false,
      maintainAspectRation: false,
      barThickness: 45,
      borderRadius: 5,
      borderSkipped: false,

      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          // text: 'Researchers (n=3)',
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        datalabels: {
          display: true,
          color: '#C2C2C2',
          clamp: true,
          formatter: (val, context) => (`${val}`),
          anchor: 'end',
          align: 'end',
          font: {
            // weight: 'bold',
            size: 16,
          }
        }
      },

      responsive: true,
      tooltips: {
        enabled: false,
      },
      hover: {
        animationDuration: 0,
      },
      animation: {
        duration: 1,
        onComplete: function () {


        },
      },

      scales: {
        x: {
          display: false,
          title: {
            display: false,
            // text: "Scroes (1-9)",
          },
          grid: {
            display: false,
            drawBorder: false, //<- set this
          },
        },
        y: {
          display: false,

          ticks: {
            display: false
          },
          title: {
            display: true,
            // text: "% of Respondants",
          },
          grid: {
            drawBorder: false, //<- set this
          },
        },
      },
    },
  });

  /********************************************Right bottom chart*********************************************** */
  var barData5 = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [{
      label: "",
      backgroundColor: chartColors.gray,
      borderColor: borderColors.gray,
      data: [],
    }, ],
  };

  // const DATA_COUNT = 7;
  // const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

  const labels_bar = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Aug',
  ]
  const Chartbottoms = {
    labels: labels_bar,
    datasets: [{
      label: 'Dataset 2',
      data: [-20, -20, -50, -30, -80, -55, -95, -10, -80],
      backgroundColor: chartColors.gray,
      borderColor: borderColors.gray,
      borderWidth: 0,
      borderRadius: 5,
      borderSkipped: false,
      width: 20,
    }]
  };

  const config_bar = {
    type: 'bar',
    data: Chartbottoms,
    options: {
      maintainAspectRatio: false,
      //responsive: false,
      barThickness: 45,
      // animation: {
      //   duration: 1,
      //   onComplete: function () {
      //     var chartInstance = this,
      //       ctx = this.ctx;

      //     this.data.datasets.forEach(function (dataset, i) {
      //       // debugger
      //       var meta = chartInstance.getDatasetMeta(i);
      //       meta.data.forEach(function (bar, index) {
      //         var data = dataset.data[index];
      //         data = Math.abs(data);
      //         ctx.fillText(data, bar.x - 5, bar.y);
      //       });
      //     });
      //   },

      // },
      plugins: {
        // barRoundness: 10,
        width: 10,
        legend: {
          display: false,
        },
        title: {
          display: true,
          // text: 'Researchers (n=3)',
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        datalabels: {
          display: true,
          clamp: true,
          color: '#C2C2C2',
          formatter: (val, context) => (`${val<0?Math.abs(val):val}`),
          anchor: 'start',
          align: 'start',
          font: {
            // weight: 'bold',
            size: 16,
          }
        }
      },

      responsive: true,
      tooltips: {
        enabled: true,
      },
      // maintainAspectRation: false,
      // hover: {
      //   animationDuration: 0,
      // },
      // animation: {
      //   duration: 1,
      //   onComplete: function () {


      //   },
      // },

      scales: {
        x: {
          display: false,
          title: {
            display: false,
            // text: "Scroes (1-9)",
          },
          grid: {
            display: false,
            drawBorder: false, //<- set this
          },
        },
        y: {
          display: false,

          ticks: {
            display: false
          },
          title: {
            display: true,
            // text: "% of Respondants",
          },
          grid: {
            drawBorder: false, //<- set this
          },
        },
      },
    },
  };

  var ctx = document.getElementById("Chartbottom").getContext("2d");
  var barData5 = new Chart(ctx, config_bar);

  /***********************************Stregnth Bar************************************** */

  window.onload = function () {
    if (
      document.querySelectorAll(".cusprogress").length > 0 &&
      document.querySelectorAll(".cusprogress [data-progress]").length > 0
    ) {
      document
        .querySelectorAll(".cusprogress [data-progress]")
        .forEach((x) => AnimateProgress(x));
    }
  };

  function AnimateProgress(el) {
    el.className = "animate-progress";

    el.setAttribute(
      "style",
      `--animate-progress:${el.getAttribute("data-progress")}%;`
    );
  }

  /***************************************************On click textarea******************************************** */
  $(".sectionJ").click(function () {
    $(".write-comment").toggle();
  });
  /*******************************all comment********************************** */
  $(".all-comment").click(function () {
    $(".counter-bottom-sec").toggle();
  });
  /********************************************************Line chart css********************************************* */


  // var ctx = document.getElementById("lineChart").getContext("2d");

  // var myChart = new Chart(ctx, {
  //   type: "line",
  //   data: {
  //     labels: ["0", "5", "10", "15", "20", "25", "30", "35", "40", "45"],
  //     datasets: [
  //       {
  //         label: "", // Name the series
  //         data: [0, 10, 2424, 14040, 14141, 4111, 4544, 47, 5, 6811], // Specify the data values array
  //         fill: false,
  //         borderColor: "#50585d", // Add custom color border (Line)
  //         backgroundColor: "#50585d", // Add custom color background (Points and Fill)
  //         borderWidth: 1, // Specify bar border width
  //       },
  //     ],
  //   },
  //   options: {
  //     responsive: true, // Instruct chart js to respond nicely.
  //     maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
  //     legend: {
  //       position: "top",
  //       display: false,
  //     },
  //     scales: {
  //       xAxes: [
  //         {
  //           scaleLabel: {
  //             display: true,
  //             labelString: "Consensus",
  //           },
  //         },
  //       ],
  //       yAxes: [
  //         {
  //           scaleLabel: {
  //             display: true,
  //             labelString: "Stability",
  //           },
  //         },
  //       ],
  //     },
  //   },
  // });

  var ctx1 = document.getElementById("lineChart2").getContext("2d");
  var chartColors2 = {
    red: 'rgb(255, 99, 132)',
    blue: 'rgb(30, 102, 0, 0.5)'
  };

  const data12 = {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49'],
    datasets: [{
      type: 'bar',
      label: 'Bar Dataset',
      barThickness: 7,
      backgroundColor: [
        chartColors2.blue,
        chartColors2.blue,
        chartColors2.blue,
        chartColors2.blue,
        chartColors2.blue,
        chartColors2.blue,
        chartColors2.blue,
        chartColors2.blue,
        chartColors2.blue,
        chartColors2.blue,
        chartColors2.blue,
        chartColors2.blue,
        chartColors2.blue,
        chartColors2.red,
        chartColors2.red,
        chartColors2.blue,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.blue,
        chartColors2.blue,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red,
        chartColors2.red
      ],
      data: [50, 50, 50, 50, 50, 50, 55, 52, 53, 51, 50, 52, 53, 50, 54, 50, 50, 50, 50, 50, 50, 55, 52, 53, 51, 50, 52, 53, 50, 54, 50, 50, 50, 50, 50, 50, 55, 52, 53, 51, 50, 52, 53, 50, 54, 50, 52, 53, 50, 54],
      borderColor: 'rgb(255, 99, 132)',
      yAxisID: 'y',
    }, {
      type: 'line',
      label: 'Line Dataset',
      data: [2.5, 2.3, 2.1, 2.5, 2.5, 2.7, 2.5, 2.2, 2.8, 2.5, 2.9, 2.5, 2.4, 2.5, 2.4, 2.5, 2.5, 2.5, 2.4, 2.7, 2.5, 2.5, 2.5, 2.5, 2.2, 2.5, 2.5, 2.5, 2.5, 2.4, 2.5, 2.5, 2.5, 2.2, 2.5, 2.5, 2.1, 2.5, 2.5, 2.2, 2.5, 2.6, 2.5, 2.5, 2.8, 2.5, 2.5, 2.2, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 5],
      borderColor: 'rgb(0, 0, 255)',
      yAxisID: 'y1',
    }]
  };


  const config12 = {
    barThickness: 8,
    plugins: {
      datalabels: {
        display: false
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        beginAtZero: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        beginAtZero: true,
        position: 'right',
      },
    },
  };

  const myChart1 = new Chart(ctx1, {
    type: "bar",
    data: data12,
    options: config12
  });



  /**************************************range slider*********************************** */
  const data = [
    2.20192877675305,
    5.58540353096757,
    3.27426206402178,
    1.73117500574349,
    2.25949294588104,
    2.62157170803393,
    0.485511769939369,
    3.25964521959553,
    1.06997722082935,
    1.68627392761528,
    1.96233657787761,
    0.783337878323126,
    -1.50603605860954,
    -6.01827571279595,
    -5.33931397533848,
    -3.59758101116202,
    -1.3850598652733,
    1.05174177237822,
    0.452274918324396,
    -0.0340965425476336,
    2.10701235642412,
    1.41659149691651,
    2.05091846004363,
    3.37176137088193,
    7.44387087635544,
    8.02521004999169,
    7.50523525122644,
    6.40745933698599,
    6.6035464089397,
    9.66734259720985,
    10.0726572327522,
    8.94800409569146,
    8.44723104852863,
    7.98204363248875,
    8.05222422170466,
    6.84880884746632,
    5.86109478223985,
    5.3423337284395,
    6.18759255059486,
    5.00774385062176,
    2.12270228152934,
    3.40477128529011,
    3.39329282720625,
    3.61907954781133,
    3.33455981692418,
    2.39802213383888,
    3.03222849228063,
    4.19302925472188,
    0.970400198200039,
    6.04147227701786,
    1.39733435535196,
    5.00773264232463,
    6.34314890121023,
    4.44149027991943,
    6.32118230974146,
    5.9470353697114,
    1.47390222942331,
    3.37286926136901,
  ];

  const sortedData = [...data].sort((a, b) => d3.ascending(a, b));

  // statistics
  const min = d3.min(data);
  const q1 = d3.quantile(sortedData, 0.25);
  const mean = d3.mean(data);
  const median = d3.median(data);
  const q3 = d3.quantile(sortedData, 0.75);
  const max = d3.max(data);

  const format = d3.format(".3f");

  // populate the table with the computed statistics
  const vizStatistics = d3.select(".viz__statistics");

  vizStatistics.select("#min").text(`${format(min)}%`);

  vizStatistics.select("#q1").text(`${format(q1)}%`);

  vizStatistics.select("#mean").text(`${format(mean)}%`);

  vizStatistics.select("#median").text(`${format(median)}%`);
  vizStatistics.select("#q3").text(`${format(q3)}%`);

  vizStatistics.select("#max").text(`${format(max)}%`);

  const margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  const width = 600;
  const height = 25;
  // const opacity= 1,
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data))
    .range([0, width])
    .nice();

  const vizBoxPlot = d3.select(".viz__box-plot");

  const boxHeight = 25;
  // const opacity= .8,

  const svgBoxPlot = vizBoxPlot
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  // translate the group to vertically center the box plot elements
  const groupBoxPlot = svgBoxPlot
    .append("g")
    .attr("transform", `translate(${margin.left} ${margin.top + height / 2})`);
  // draw a line considering the interquartile range (q1 - iqr*1.5, q3 + iqr *1.5)
  // where the interquartile range is (q3 - q1)
  const IQR = q3 - q1;
  // the line is drawn from (q1 - IQR *1.5) to (q3 + IQR *1.5)
  // cap the values to the minimum/maximum data points
  const minBoxPlot = Math.max(q1 - IQR * 1.9);
  const maxBoxPlot = Math.min(q3 + IQR * 1.1);

  groupBoxPlot
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "#4e4e4e")
    .attr("stroke-width", "4")
    .attr("d", `M ${xScale(minBoxPlot)} 0 H ${xScale(maxBoxPlot)}`);

  // draw a rectangle from q1 to q3
  groupBoxPlot
    .append("rect")
    .attr("x", xScale(q1))
    .attr("width", xScale(q3) - xScale(q1))
    .attr("y", -boxHeight / 2)
    .attr("height", boxHeight)
    .attr("fill", "#c3c3c3")
    .attr("opacity", "0.8");

  // for the details of the boxplot, include a group to translate the elements at the desired coordinates
  // this to include connected elements in the same group

  // median: draw the line in the rectangle, a text element describing the purpose and a line connecting the two
  const medianBoxPlot = groupBoxPlot
    .append("g")
    .attr("transform", `translate(${xScale(median)} ${-(boxHeight / 2)})`);

  medianBoxPlot
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "#ff0000")
    .attr("stroke-width", 4)
    .attr("d", `M 0 0 v ${boxHeight}`);

  // group to position the outliers
  // const outliersBoxPlot = groupBoxPlot
  //   .selectAll("g.outlier")
  //   .data(outliers)
  //   .enter()
  //   .append("g")
  //   .attr("class", "outlier")
  //   .attr("transform", (d) => `translate(${xScale(d)} 0)`);

  // // circle, text and connecting line
  // outliersBoxPlot.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 3);

  // outliersBoxPlot
  //   .append("text")
  //   .text("Outlier")
  //   .attr("x", 0)
  //   .attr("y", -60)
  //   .attr("text-anchor", "middle");

  // outliersBoxPlot
  //   .append("path")
  //   .attr("d", "M 0 -50 v 40")
  //   .attr("fill", "none")
  //   .attr("stroke-linecap", "round")
  //   .attr("stroke-width", 2)
  //   .attr("stroke", "currentColor");
});