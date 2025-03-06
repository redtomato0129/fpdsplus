const employees = document.querySelector("#employees")
var labels = {
    800: '800',
    900: '900',
    1000: '1000',
    1100: '1100',
    1200: '1200',
};
noUiSlider.create(employees, {
    start: 10,
    connect: [true, false],
    tooltips: {
        to: function (value) {
            return value > 1200 ? '1200+' : parseInt(value)
        }
    },
    range: {
        'min': 800,
        '25%': 900,
        '50%': 1000,
        '75%': 1100,
        'max': 1200
        // '60%': 55,
        // '70%': 70,
        // '80%': 85,
        // '90%': 100,
        // 'max': 110
    },
    pips: {
        mode: 'steps',
        filter: function (value, type) {
            return type === 0 ? -1 : 1;
        },
        format: {
            to: function (value) {
                return labels[value];
            }
        }
    }
});

const employees2 = document.querySelector("#preemployees")
var labels = {
    800: '800',
    1200: '1200',
};
noUiSlider.create(employees2, {
    start: 10,
    connect: [true, false],
    tooltips: {
        to: function (value) {
            return value > 1200 ? '1200' : parseInt(value)
        }
    },
    range: {
        'min': 800,
        'max': 1200
        // '60%': 55,
        // '70%': 70,
        // '80%': 85,
        // '90%': 100,
        // 'max': 110
    },
    pips: {
        mode: 'steps',
        filter: function (value, type) {
            return type === 0 ? -1 : 1;
        },
        format: {
            to: function (value) {
                return labels[value];
            }
        }
    }
});

const rangeone = document.querySelector("#range-one")
var labels = {
    800: '800',
    900: '900',
    1000: '1000',
    1100: '1100',
    1200: '1200',
};
noUiSlider.create(rangeone, {
    start: 10,
    connect: [true, false],
    tooltips: {
        to: function (value) {
            return value > 1200 ? '1200' : parseInt(value)
        }
    },
    range: {
        'min': 800,
        '25%': 900,
        '50%': 1000,
        '75%': 1100,
        'max': 1200
        // '60%': 55,
        // '70%': 70,
        // '80%': 85,
        // '90%': 100,
        // 'max': 110
    },
    pips: {
        mode: 'steps',
        filter: function (value, type) {
            return type === 0 ? -1 : 1;
        },
        format: {
            to: function (value) {
                return labels[value];
            }
        }
    }
});

const rangetwo = document.querySelector("#range-two")
var labels = {
    800: '800',
    900: '900',
    1000: '1000',
    1100: '1100',
    1200: '1200',
};
noUiSlider.create(rangetwo, {
    start: 10,
    connect: [true, false],
    tooltips: {
        to: function (value) {
            return value > 1200 ? '1200' : parseInt(value)
        }
    },
    range: {
        'min': 800,
        '25%': 900,
        '50%': 1000,
        '75%': 1100,
        'max': 1200
        // '60%': 55,
        // '70%': 70,
        // '80%': 85,
        // '90%': 100,
        // 'max': 110
    },
    pips: {
        mode: 'steps',
        filter: function (value, type) {
            return type === 0 ? -1 : 1;
        },
        format: {
            to: function (value) {
                return labels[value];
            }
        }
    }
});

const rangethree = document.querySelector("#range-three")
var labels = {
    800: '800',
    900: '900',
    1000: '1000',
    1100: '1100',
    1200: '1200',
};
noUiSlider.create(rangethree, {
    start: 10,
    connect: [true, false],
    tooltips: {
        to: function (value) {
            return value > 1200 ? '1200' : parseInt(value)
        }
    },
    range: {
        'min': 800,
        '25%': 900,
        '50%': 1000,
        '75%': 1100,
        'max': 1200
        // '60%': 55,
        // '70%': 70,
        // '80%': 85,
        // '90%': 100,
        // 'max': 110
    },
    pips: {
        mode: 'steps',
        filter: function (value, type) {
            return type === 0 ? -1 : 1;
        },
        format: {
            to: function (value) {
                return labels[value];
            }
        }
    }
});

const rangefour = document.querySelector("#range-four")
var labels = {
    800: '800',
    900: '900',
    1000: '1000',
    1100: '1100',
    1200: '1200',
};
noUiSlider.create(rangefour, {
    start: 10,
    connect: [true, false],
    tooltips: {
        to: function (value) {
            return value > 1200 ? '1200' : parseInt(value)
        }
    },
    range: {
        'min': 800,
        '25%': 900,
        '50%': 1000,
        '75%': 1100,
        'max': 1200
        // '60%': 55,
        // '70%': 70,
        // '80%': 85,
        // '90%': 100,
        // 'max': 110
    },
    pips: {
        mode: 'steps',
        filter: function (value, type) {
            return type === 0 ? -1 : 1;
        },
        format: {
            to: function (value) {
                return labels[value];
            }
        }
    }
});
// $(document).ready(function () {});



/**************************************range slider*********************************** */

$(document).ready(function () {

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
    const xScale = d3
        .scaleLinear()
        .domain(d3.extent(data))
        .range([0, width])
        .nice();

    const vizBoxPlot = d3.select(".viz__box-plot2");

    const boxHeight = 120;

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

    //   groupBoxPlot
    //     .append("path")
    //     .attr("fill", "none")
    //     .attr("stroke", "#4e4e4e")
    //     .attr("stroke-width", "4")
    //     .attr("d", `M ${xScale(minBoxPlot)} 0 H ${xScale(maxBoxPlot)}`);

    // draw a rectangle from q1 to q3
    groupBoxPlot
        .append("rect")
        .attr("x", xScale(q1))
        .attr("width", xScale(q3) - xScale(q1))
        .attr("y", -boxHeight / 2)
        .attr("height", boxHeight)
        .attr("fill", "#69ba2e78");

    // for the details of the boxplot, include a group to translate the elements at the desired coordinates
    // this to include connected elements in the same group

    // median: draw the line in the rectangle, a text element describing the purpose and a line connecting the two
    const medianBoxPlot = groupBoxPlot
        .append("g")
        .attr("transform", `translate(${xScale(median)} ${-(boxHeight / 2)})`);

    medianBoxPlot
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#69ba2e")
        .attr("stroke-width", 6)
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
/**************************************range slider*********************************** */
$(document).ready(function () {

    const dataslide1 = [
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

    const sortedData1 = [...dataslide1].sort((a, b) => d3.ascending(a, b));

    // statistics
    const min = d3.min(dataslide1);
    const q1 = d3.quantile(sortedData1, 0.25);
    const mean = d3.mean(dataslide1);
    const median = d3.median(dataslide1);
    const q3 = d3.quantile(sortedData1, 0.75);
    const max = d3.max(dataslide1);

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
    const height = 40;
    const xScale = d3
        .scaleLinear()
        .domain(d3.extent(dataslide1))
        .range([0, width])
        .nice();

    const vizBoxPlot = d3.select(".viz__box-plot3");

    const boxHeight = 50;

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

    //   groupBoxPlot
    //     .append("path")
    //     .attr("fill", "none")
    //     .attr("stroke", "#4e4e4e")
    //     .attr("stroke-width", "4")
    //     .attr("d", `M ${xScale(minBoxPlot)} 0 H ${xScale(maxBoxPlot)}`);

    // draw a rectangle from q1 to q3
    groupBoxPlot
        .append("rect")
        .attr("x", xScale(q1))
        .attr("width", xScale(q3) - xScale(q1))
        .attr("y", -boxHeight / 2)
        .attr("height", boxHeight)
        .attr("fill", "#CACACA78");

    // for the details of the boxplot, include a group to translate the elements at the desired coordinates
    // this to include connected elements in the same group

    // median: draw the line in the rectangle, a text element describing the purpose and a line connecting the two
    const medianBoxPlot = groupBoxPlot
        .append("g")
        .attr("transform", `translate(${xScale(median)} ${-(boxHeight / 2)})`);

    medianBoxPlot
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#291770")
        .attr("stroke-width", 10)
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
$(document).ready(function () {

    const dataslide2 = [
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

    const sortedData2 = [...dataslide2].sort((a, b) => d3.ascending(a, b));

    // statistics
    const min = d3.min(dataslide2);
    const q1 = d3.quantile(sortedData2, 0.25);
    const mean = d3.mean(dataslide2);
    const median = d3.median(dataslide2);
    const q3 = d3.quantile(sortedData2, 0.75);
    const max = d3.max(dataslide2);

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
    const height = 40;
    const xScale = d3
        .scaleLinear()
        .domain(d3.extent(dataslide2))
        .range([0, width])
        .nice();

    const vizBoxPlot = d3.select(".viz__box-plot4");

    const boxHeight = 50;

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

    //   groupBoxPlot
    //     .append("path")
    //     .attr("fill", "none")
    //     .attr("stroke", "#4e4e4e")
    //     .attr("stroke-width", "4")
    //     .attr("d", `M ${xScale(minBoxPlot)} 0 H ${xScale(maxBoxPlot)}`);

    // draw a rectangle from q1 to q3
    groupBoxPlot
        .append("rect")
        .attr("x", xScale(q1))
        .attr("width", xScale(q3) - xScale(q1))
        .attr("y", -boxHeight / 2)
        .attr("height", boxHeight)
        .attr("fill", "#CACACA78");

    // for the details of the boxplot, include a group to translate the elements at the desired coordinates
    // this to include connected elements in the same group

    // median: draw the line in the rectangle, a text element describing the purpose and a line connecting the two
    const medianBoxPlot = groupBoxPlot
        .append("g")
        .attr("transform", `translate(${xScale(median)} ${-(boxHeight / 2)})`);

    medianBoxPlot
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#D9261C")
        .attr("stroke-width", 10)
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
$(document).ready(function () {

    const dataslide3 = [
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

    const sortedData3 = [...dataslide3].sort((a, b) => d3.ascending(a, b));

    // statistics
    const min = d3.min(dataslide3);
    const q1 = d3.quantile(sortedData3, 0.25);
    const mean = d3.mean(dataslide3);
    const median = d3.median(dataslide3);
    const q3 = d3.quantile(sortedData3, 0.75);
    const max = d3.max(dataslide3);

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
    const height = 40;
    const xScale = d3
        .scaleLinear()
        .domain(d3.extent(dataslide3))
        .range([0, width])
        .nice();

    const vizBoxPlot = d3.select(".viz__box-plot5");

    const boxHeight = 50;

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

    //   groupBoxPlot
    //     .append("path")
    //     .attr("fill", "none")
    //     .attr("stroke", "#4e4e4e")
    //     .attr("stroke-width", "4")
    //     .attr("d", `M ${xScale(minBoxPlot)} 0 H ${xScale(maxBoxPlot)}`);

    // draw a rectangle from q1 to q3
    groupBoxPlot
        .append("rect")
        .attr("x", xScale(q1))
        .attr("width", xScale(q3) - xScale(q1))
        .attr("y", -boxHeight / 2)
        .attr("height", boxHeight)
        .attr("fill", "#CACACA78");

    // for the details of the boxplot, include a group to translate the elements at the desired coordinates
    // this to include connected elements in the same group

    // median: draw the line in the rectangle, a text element describing the purpose and a line connecting the two
    const medianBoxPlot = groupBoxPlot
        .append("g")
        .attr("transform", `translate(${xScale(median)} ${-(boxHeight / 2)})`);

    medianBoxPlot
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#F7C400")
        .attr("stroke-width", 10)
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

$(document).ready(function () {

    const dataslide4 = [
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

    const sortedData4 = [...dataslide4].sort((a, b) => d3.ascending(a, b));

    // statistics
    const min = d3.min(dataslide4);
    const q1 = d3.quantile(sortedData4, 0.25);
    const mean = d3.mean(dataslide4);
    const median = d3.median(dataslide4);
    const q3 = d3.quantile(sortedData4, 0.75);
    const max = d3.max(dataslide4);

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
    const height = 40;
    const xScale = d3
        .scaleLinear()
        .domain(d3.extent(dataslide4))
        .range([0, width])
        .nice();

    const vizBoxPlot = d3.select(".viz__box-plot6");

    const boxHeight = 50;

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

    //   groupBoxPlot
    //     .append("path")
    //     .attr("fill", "none")
    //     .attr("stroke", "#4e4e4e")
    //     .attr("stroke-width", "4")
    //     .attr("d", `M ${xScale(minBoxPlot)} 0 H ${xScale(maxBoxPlot)}`);

    // draw a rectangle from q1 to q3
    groupBoxPlot
        .append("rect")
        .attr("x", xScale(q1))
        .attr("width", xScale(q3) - xScale(q1))
        .attr("y", -boxHeight / 2)
        .attr("height", boxHeight)
        .attr("fill", "#CACACA78");

    // for the details of the boxplot, include a group to translate the elements at the desired coordinates
    // this to include connected elements in the same group

    // median: draw the line in the rectangle, a text element describing the purpose and a line connecting the two
    const medianBoxPlot = groupBoxPlot
        .append("g")
        .attr("transform", `translate(${xScale(median)} ${-(boxHeight / 2)})`);

    medianBoxPlot
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#F7C400")
        .attr("stroke-width", 10)
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