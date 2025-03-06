$(document).ready(() => {
    $('#noData').hide();
    fetchWidgets();
    
    $("#page3 a").attr("href", localStorage.getItem("answerWidgetPage3Url"));
})
//let vender;

function noDataDisplay() {
    console.log("No data in database.")
    $('#description').hide();
    $('#pptExport').hide();
    $('#chart').hide();
    $('#tables').hide();
    $('#noData').show();
}

function copyToClipboard() {
    var tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    swal.fire({
        title: "",
        text: "URL copied to clipboard!",
        type: "success",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000,
    })
}

function createParams(html) {
    const params = new URLSearchParams(window.location.search)
    let count = 0;
    // debugger;
    for (const param of params) {
        if (param[0] != 'vendor_uei') {
            if (count == 0) {

                html = html + `?${param[0]}=${param[1]}`
            } else {
                const object = param[1][0] === "{" ? JSON.stringify(JSON.parse(param[1])) : param[1]


                html = html + `&&${param[0]}=${encodeURIComponent(object)}`
            }
        }
        else {
            const object = param[1][0] === "{" ? JSON.stringify(JSON.parse(param[1])) : param[1]
            html = html + `&&${param[0]}=${encodeURIComponent(object)}`
        }
        count++;
    }
    return html;
}

function onCLickBarChart(ev, query_params_key, query_params_field, obj = {}) {
    let html = "";
    if (obj.attributes &&obj.attributes[0].nodeValue) {
        ev = {};
        ev.target = {}; ev.target.dataItem = {}; ev.target.dataItem.dataContext = JSON.parse(obj.attributes[0].nodeValue);
    }
    html = createParams(html)
    query_params_key = query_params_key.split(',');
    query_params_field = query_params_field.split(',')
    const finalObject = {};
    query_params_key.forEach((i, index) => {
        finalObject[query_params_key[index]] = query_params_field[index]
    })

  
   
   
    if (ev.target.dataItem.dataContext.vendor_uei) {
        html = html + `&&vendor_uei=${ev.target.dataItem.dataContext.vendor_uei}&&expiration_year=${ev.target.dataItem.dataContext.contract_year}`
        console.log("vendor uei: ", html)
    }
    if (ev.target.dataItem.dataContext.action_date_fiscal_year) { 
        html = html + `&&action_date_fiscal_year=${ev.target.dataItem.dataContext.action_date_fiscal_year}`
        if (ev.target.dataItem.dataContext.funding_office_code) {
            html = html + `&&funding_office_code=${ev.target.dataItem.dataContext.funding_office_code}`
        }
        console.log("fiscal year: ", html)
    }
    if (ev.target.dataItem.dataContext.fiscal_year_earliest_start_date) {
        html = html + `&&fiscal_year_earliest_start_date=${ev.target.dataItem.dataContext.fiscal_year_earliest_start_date}`
    }

    if (ev.target.dataItem.dataContext.recipient_uei) {
        html = html + `&&recipient_uei=${ev.target.dataItem.dataContext.recipient_uei}`
    }
    if (ev.target.dataItem.dataContext.fiscal_year) {
        html = html + `&&fiscal_year=${ev.target.dataItem.dataContext.fiscal_year}`
    }
    if (ev.target.dataItem.dataContext.funding_office_code) {
        html = html + `&&funding_office_code=${ev.target.dataItem.dataContext.funding_office_code}`
    }
    if (ev.target.dataItem.dataContext.contract_number) {
        html = html + `&&contract_number=${ev.target.dataItem.dataContext.contract_number}`
    }
    if (ev.target.dataItem.dataContext.sub_agency_code) {
        html = html + `&&sub_agency_code=${ev.target.dataItem.dataContext.sub_agency_code}`
    }
    if (ev.target.dataItem.dataContext.award_id_piid) {
        html = html + `&&award_id_piid=${ev.target.dataItem.dataContext.award_id_piid}`
    }
    if (ev.target.dataItem.dataContext.product_or_service_code) {
        html = html + `&&product_or_service_code=${ev.target.dataItem.dataContext.product_or_service_code}`
    }
    console.log("html: ", html)
    // console.log(html);getDataByStorePorcedure

    document.location = `/AnswerWizard/DrillDown2${html}`;
}

function onCLickClusteredBarChart(ev, query_params_key, query_params_field, yAxisLabel) {

    query_params_key = query_params_key.split(',');
    query_params_field = query_params_field.split(',')
    const finalObject = {};
    query_params_key.forEach((i, index) => {
        finalObject[query_params_key[index]] = query_params_field[index]
    })


    const params = new URLSearchParams(window.location.search)

    let html = "";
    let count = 0;
    for (const param of params) {
        if (param[0] != 'vendor_uei') {
            if (count == 0) {

                html = html + `?${param[0]}=${param[1]}`
            } else {
                const object = param[1][0] === "{" ? JSON.stringify(JSON.parse(param[1])) : param[1]


                html = html + `&&${param[0]}=${encodeURIComponent(object)}`
            }
        }
        count++;
    }
    if (ev.target.dataItem.dataContext.vendor_uei) {
        html = html + `&&vendor_uei=${ev.target.dataItem.dataContext.vendor_uei}&&expiration_year=${ev.target.dataItem.dataContext.contract_year}`
        console.log("vendor uei: ", html)
    }
    if (ev.target.dataItem.dataContext.fiscal_year) {
        html = html + `&&fiscal_year=${ev.target.dataItem.dataContext.fiscal_year}`
        if (ev.target.dataItem.dataContext.funding_office_code) {
            html = html + `&&funding_office_code=${ev.target.dataItem.dataContext.funding_office_code}`
        }
        console.log("fiscal year: ", html)
    }

    if (ev.target.fiscal_year_earliest_start_date) {
        html = html + `&&fiscal_year=${ev.target.dataItem.dataContext.fiscal_year}`
    }
    for (let item of yAxisLabel.split(',')) {
        if (ev.target.dataItem.dataContext[item] === ev.target.dataItem._settings.valueY) {
           
            if (item.indexOf('UNR') != -1) {
                item = 'UNR'
            }
            else if (item.indexOf('_SB') != -1) {
                item = 'SB'
            }
            //else if (item.indexOf('SETASIDE') != -1) {
            //    item = 'SETASIDE'
            //}
            html = html + `&&setAsideUNR=${item}`
            break;
        }
    }

    //console.log("html: ", html)
    // console.log(html);getDataByStorePorcedure

    document.location = `/AnswerWizard/DrillDown2${html}`;
}

function clusteredColumnChart(dataChart, xAxisLabel, yAxisLabel, queryParamsKey, queryParamsField) {
    console.log("clusteredColumnChart")

    am5.ready(() => {
        //  console.log(dataChart, xAxisLabel, yAxisLabel, queryParamsKey, queryParamsField)
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("chartdivLine");
        const data = dataChart

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout
        }));


        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        var legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            })
        );

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xRenderer = am5xy.AxisRendererX.new(root, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9
        })

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: xAxisLabel,
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        xRenderer.grid.template.setAll({
            location: 1
        })

        xAxis.data.setAll(data);

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })
        }));


        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function makeSeries(name, fieldName) {
            var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: xAxisLabel
            }));

            series.columns.template.setAll({
                tooltipText: "{name}, {categoryX}:{valueY}",
                width: am5.percent(90),
                tooltipY: 0,
                strokeOpacity: 0
            });

            series.data.setAll(data);

            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            series.appear();

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    locationY: 0,
                    sprite: am5.Label.new(root, {
                        text: "{valueY}",
                        fill: root.interfaceColors.get("alternativeText"),
                        centerY: 0,
                        centerX: am5.p50,
                        populateText: true
                    })
                });
            });

            chart.get("colors").set("colors", [
                am5.color(0x50b300),
                am5.color("#fb8c00"),
                am5.color(0x50b300),
                am5.color("#8b5edd")
            ]); 
            series.columns.template.events.on("click", function (ev) {
               
                onCLickClusteredBarChart(ev, queryParamsKey, queryParamsField, yAxisLabel)
            });

            legend.data.push(series);
        }
        yAxisLabel.split(',').forEach(item => {

            makeSeries(item.replaceAll('_', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()), item);
        });


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);

    }); // end am5.ready()
}

function clusteredGraph(data, xAxisValue, yAxisValue1, yAxisValue2, yAxisLabel1, yAxisLabel2, query_params_key,query_params_field) {
    console.log("clusteredGraph")
    am5.ready(function () {
       
        data.sort((a, b) => a[xAxisValue] - b[xAxisValue]);
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("chartdivLine");


        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout
        }));

        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);
        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        var legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            })
        );

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xRenderer = am5xy.AxisRendererX.new(root, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9,
            minGridDistance: 30
        })

        xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15,
            fontSize: 14
        });

        //xRenderer.labels.template.setAll({
        //    rotation: -90,
        //});     

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: xAxisValue,
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        //xAxis.renderer.templates.wrap = true; // Enable text wrapping
        //xAxis.renderer.templates.maxWidth = 80; // Set the maximum width for labels

        xRenderer.grid.template.setAll({
            location: 1
        })

        xAxis.data.setAll(data);

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })
        }));

        //var label = categoryField.renderer.labels.template;
        //label.wrap = true;
        //label.maxWidth = 120;

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function makeSeries(name, fieldName,color) {
            var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: xAxisValue
            }));

            series.columns.template.events.on("click", function (ev) {
                onCLickBarChart(ev, query_params_key, query_params_field)

            });

            series.columns.template.setAll({
                tooltipText: "{name}, {categoryX}: {valueY}",
                width: am5.percent(90),
                tooltipY: 0,
                strokeOpacity: 0
            });

            series.data.setAll(data);
            series.set("fill", am5.color(color))
            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            series.appear();

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    locationY: 0,
                    sprite: am5.Label.new(root, {
                        text: "{valueY}",
                        fill: root.interfaceColors.get("alternativeText"),
                        centerY: 0,
                        centerX: am5.p50,
                        populateText: true
                    })
                });
            });

            legend.data.push(series);
        }

        makeSeries(yAxisLabel1, yAxisValue1, "#fdd023");
        makeSeries(yAxisLabel2, yAxisValue2, "#6771dc");



        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);
    });; // end am5.ready()
   
}

function barChart(data, xAxisLabel, yAxisLabel, queryParamsKey, queryParamsField) {
    //console.log("2 bars")
    am5.ready(function () {
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        let root = am5.Root.new("chartdivLine");

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }));

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
        xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
        });

        xRenderer.grid.template.setAll({
            location: 1
        })

        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: xAxisLabel,
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {}),
        }));

        xAxis.get("renderer").labels.template.setAll({
            fontSize: 14,
            //horizontalCenter = "left"
        });
        //xAxis.get("renderer").labels.template.horizontalCenter = "left";

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })
        }));

        //yAxis.children.unshift(am5.Label.new(root, {
        //    text: yAxisLabel,
        //    textAlign: 'center',
        //    y: am5.p50,
        //    rotation: -90,
        //    fontWeight: 'bold'
        //}));




        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: yAxisLabel,
            sequencedInterpolation: true,
            categoryXField: xAxisLabel,
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}",

            })
        }));

        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
        series.columns.template.adapters.add("fill", function (fill, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", function (stroke, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });
        series.columns.template.events.on("click", function (ev) {
            onCLickBarChart(ev, '/AnswerWizard/DrillDown2', queryParamsKey, queryParamsField)

        });


        //console.log("data: ", data)
        xAxis.data.setAll(data);
        series.data.setAll(data);


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);

        series.columns.template.events.on("click", function (ev) {
            console.log(ev.target.dataItem.dataContext.vendor_name)
            // alert(ev.target.dataItem.dataContext.vendor_name)
        });

    });
}

function columnLineChart(data, xAxisLabel, yAxisBar, yAxisLine, queryParamsKey, queryParamsField) {
    am5.ready(function () {

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("chartdivLine");

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "none",
                wheelY: "none"
            })
        );

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
        xRenderer.labels.template.setAll({ text: "{realName}", rotation: -90, });

        var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                maxDeviation: 0,
                categoryField: "category",
                renderer: xRenderer,
                /* tooltip: am5.Tooltip.new(root, {
                     labelText: "{realName}"
                 })*/
            })
        );

        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0.3,
                renderer: am5xy.AxisRendererY.new(root, { opposite: true })
            })
        );

        var yAxis2 = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0.3,
                syncWithAxis: yAxis,
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        );

        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        var series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "Series 1",
                xAxis: xAxis,
                yAxis: yAxis2,
                valueYField: "value",
                sequencedInterpolation: true,
                categoryXField: "category",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{realName}: {valueY}"
                })
            })
        );

        series.columns.template.setAll({
            fillOpacity: 0.9,
            strokeOpacity: 0
        });
        series.columns.template.adapters.add("fill", (fill, target) => {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", (stroke, target) => {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });
        series.columns.template.events.on("click", function (ev) {
            onCLickBarChart(ev, '/AnswerWizard/DrillDown1', queryParamsKey, queryParamsField)

        });

        var lineSeries = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "Series 2",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "quantity",
                sequencedInterpolation: true,
                stroke: chart.get("colors").getIndex(13),
                fill: chart.get("colors").getIndex(13),
                categoryXField: "category",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{valueY}"
                })
            })
        );

        lineSeries.strokes.template.set("strokeWidth", 2);

        lineSeries.bullets.push(function () {
            return am5.Bullet.new(root, {
                locationY: 1,
                locationX: undefined,
                sprite: am5.Circle.new(root, {
                    radius: 5,
                    fill: lineSeries.get("fill")
                })
            });
        });

        // when data validated, adjust location of data item based on count
        lineSeries.events.on("datavalidated", function () {
            am5.array.each(lineSeries.dataItems, function (dataItem) {
                // if count divides by two, location is 0 (on the grid)
                if (
                    dataItem.dataContext.count / 2 ==
                    Math.round(dataItem.dataContext.count / 2)
                ) {
                    dataItem.set("locationX", 0);
                }
                // otherwise location is 0.5 (middle)
                else {
                    dataItem.set("locationX", 0.5);
                }
            });
        });

        var chartData = [];


        // process data ant prepare it for the chart
       
        for (var providerName in data) {
            const providerData = data[providerName];
            if (typeof data[providerName][xAxisLabel] =='undefined') {
                break
            }
            // add data of one provider to temp array
            const tempArray = [];
            let count = 0;
            // add items
            count++;
            // we generate unique category for each column (providerName + "_" + itemName) and store realName
            const obj = {
                category: data[providerName][xAxisLabel],
                realName: data[providerName][xAxisLabel],
                value: data[providerName][yAxisBar],
                provider: data[providerName][yAxisBar],
            }
            obj[queryParamsKey] = data[providerName][queryParamsField],
                tempArray.push(obj);


            // sort temp array
            tempArray.sort(function (a, b) {
                if (a.value > b.value) {
                    return 1;
                } else if (a.value < b.value) {
                    return -1;
                } else {
                    return 0;
                }
            });

            // add quantity and count to middle data item (line series uses it)
            var lineSeriesDataIndex = Math.floor(count / 2);
            tempArray[lineSeriesDataIndex].quantity = providerData[yAxisLine];
            tempArray[lineSeriesDataIndex].count = count;
            // push to the final data
            am5.array.each(tempArray, function (item) {
                chartData.push(item);
            });

            // create range (the additional label at the bottom)

            var range = xAxis.makeDataItem({});
            xAxis.createAxisRange(range);

            range.set("category", tempArray[0].category);
            range.set("endCategory", tempArray[tempArray.length - 1].category);

            var tick = range.get("tick");
            tick.setAll({ visible: true, strokeOpacity: 0, length: 50, location: 0 });

            var grid = range.get("grid");
            grid.setAll({ strokeOpacity: 1 });
        }

        // add range for the last grid
        var range = xAxis.makeDataItem({});
        xAxis.createAxisRange(range);
        range.set("category", chartData[chartData.length - 1].category);

        var tick = range.get("tick");
        tick.setAll({ visible: true, strokeOpacity: 0, length: 50, location: 1 });

        var grid = range.get("grid");
        grid.setAll({ strokeOpacity: 1, location: 1 });

        xAxis.data.setAll(chartData);
        series.data.setAll(chartData);
        lineSeries.data.setAll(chartData);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);
       
    }); // end am5.ready()
}

function fetchWidgets() {
    const urlParams = new URLSearchParams(window.location.search);
    const question_id = urlParams.get('question_id');
    const category = urlParams.get('category')
    $("#categoryQuestion").html(`<a href="${localStorage.getItem("answerWidgetPage2Url") }">${category.charAt(0).toUpperCase() + category.slice(1)} Question List</a>`)
    $.ajax({
        type: "POST",
        data: { question_id},
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/GetQuestionWidgetsList",
        success: function (result) {
            result = jQuery.parseJSON(result);
            
            if (result.records && result.records != 0) {
                const records = result.records;
                $("#heading").html(`<strong>${records[0].question_name}</strong>`)
                $("#sub_heading").html(`<strong>${records[0].description}</strong>`)
                $("#description").html(`<strong>${records[0].widget_help_description}</strong>`)
                for (let a = 0; a < records.length; a++) {
                    if (records[a].page_number ==5) {
                        getDataByStorePorcedure(records[a])
                        break;
                    }
                   
                }
            }
            else {
                console.log("Error")
            }
        },
        error: function (error) { }
    });
}

function paramRenderer(widgetData) {
    console.log("widgetData", widgetData)
    
    const obj = { store_procedure: widgetData.store_procedure }
    const params = new URLSearchParams(window.location.search)
    const y_axis = params.get('y_axis');
    let html = '';
    if (widgetData.wizard_widget_type_type == 'clustered-bar') {
        html = '';
    } else if (widgetData.wizard_widget_type_type == 'column-line') {
        html = `<tr><td><b>X-Axis</b></td><td> ${widgetData.x_axis_label} </td></tr>
            < tr ><td><b>Y-Axis Bar</b></td><td> ${widgetData.y_axis_bar_label}</td></tr >
                <tr><td><b>Y-Axis Line</b></td><td>${widgetData.y_axis_line_label}</td></tr>`;
    } else if (widgetData.wizard_widget_type_type == 'same_bar') {
        let yAxisLabel = y_axis ? y_axis.replaceAll('_', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) : widgetData.y_axis_label;
        html = `<tr><td><b>X-Axis</b></td><td> ${widgetData.x_axis_label} </td></tr>
                <tr><td><b>Y-Axis</b></td><td>${yAxisLabel}</td></tr>
                <tr><td><b>Vendor Name</b></td><td id="vn"></td></tr>`;
    } else {
        html = `<tr><td><b>X-Axis</b></td><td> ${widgetData.x_axis_label} </td></tr>
                <tr><td><b>Y-Axis Bar 1</b></td><td> ${widgetData.y_axis_bar_label}</td></tr>
                <tr><td><b>Y-Axis Bar 2</b></td><td>${widgetData.y_axis_line_label}</td></tr>
                <tr><td><b>Vendor Name</b></td><td id="vn"></td></tr>
                <tr><td><b>Vendor Name</b></td><td class="business_class" id="bn"></td></tr>`;
    }

    for (const param of params) {
      //  console.log("Params: ", param)
        if (param[1][0] == "{") {

            let object = JSON.parse(param[1]);

            if (object.label === '# of Vendors') {
                continue;
            }
            if (object.label === 'Naics Family') {
                object.label = 'NAICS Family'
            }
            else if (object.label === 'Naics') {
                object.label = 'NAICS'
            }

            let value = `<td>${object.description ? object.label == 'NAICS' || object.label == 'NAICS Family'
                ? object.value + ' - ' + object.description : '' + object.description.split(', ').join("<br>")
                : object.value}</td >`

            if (object.label === "Set-Aside type" || object.label === "Set-Aside Types") {
                for (const param1 of params) {
                    if (param1[0] === 'set_aside_code') {
                        const indexValue = object.value.split(',').findIndex(x => x === param1[1]);
                      
                        value = `<td>${indexValue != -1 ? object.description.split(',')[indexValue] : object.description}</td >`
                        break;
                    }
                }
                //value = `<td>${object.value}</td >`
                
            }
            html = html + `<tr><td><b>${object.label == 'Socio-Economic Designation' ? 'Socio-Economic' : object.label}</b ></td > ${value} </tr >`;
            param[0] = param[0].replace("+", '').trim()
            obj[param[0]] = object.value
        } else {
            //console.log(param[0], param[1])
            obj[param[0]] = param[1]
        }
   
       /* if (obj['set_aside_code']) {
            debugger
        }*/
    }
    let set_aside =y_axis?y_axis.split("_").pop():'';
    console.log("set_aside ", set_aside)
    if (set_aside) {
        html = html + `<tr><td><b>Set Aside</b></td><td>${set_aside}</td></tr>`
    }
    $("#paramRenderer").html(html);
    
    return obj;
}

let vendorObject = {}
function renderVendorTable(widgetData, data)
{
    console.log('graph type: ',widgetData.wizard_widget_type_type)
    let tbody = '';
    if (widgetData.wizard_widget_type_type == 'clustered-bar')
    {
        $('#vendorTableRenderer').hide();
    }
    else if (widgetData.wizard_widget_type_type == 'same_bar')
    {
        const params = new URLSearchParams(window.location.search)
        const yAxisValue = params.get('y_axis') ? params.get('y_axis') : widgetData.y_axis;
       
        yAxisLabel = yAxisValue ? yAxisValue.replaceAll('_', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) :
            widgetData.y_axis_bar_label;
        console.log("yAxisValue: ", yAxisValue)
        console.log("yAxisLabel: ", yAxisLabel)
        for (let a in data) {
            if (data[a][yAxisValue]) {
                let budget;
                if (widgetData.widget_currency_field) {
                    let temp = data[a][yAxisValue];
                    budget = (temp).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    });

                } else {
                    //budget = data[a][yAxis];
                    console.log("No currency format")
                }
                tbody = tbody + `<tr vendorData='${JSON.stringify(data[a])}' onclick=onCLickBarChart('obj','${widgetData.query_params_key}','${widgetData.query_params_field}',this)>`
                tbody = tbody + `<td colspan="2" style="font-size: 14px;"><b>${data[a][widgetData.x_axis]}</b></td>
                <td colspan="2" style="font-size: 14px;"> ${budget} </td>
                </tr>`
            }
            else {
                console.log("undefined")
            }
            
        }

        let html = `<thead>
                    <tr>
                        <th colspan="2" style="color: #571c7a; width: 105px;">${widgetData.x_axis_label}</th>
                        <th colspan="2" style="color: #571c7a; ">${yAxisLabel}</th>
                    </tr>
                </thead>
                <tbody>
                        ${tbody}
                </tbody>`

        $("#vendorTableRenderer").html(html)
    }
    else
    {
        if (widgetData.wizard_widget_type_type === 'clustered-column-line')
        {
            widgetData.y_axis = widgetData.y_axis.split(',')[1]
        }
        else {
            
        }
        for (let a in data)
        {
            
            if (data[a][widgetData.y_axis] && data[a][widgetData.y_axis] && data[a][widgetData.y_axis_line])
            {
                let budget;
                if (widgetData.widget_currency_field)
                {
                    let temp = data[a][widgetData.y_axis];
                    let temp2 = data[a][widgetData.y_axis_line];
                    budget = (temp).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    });
                    budget2 = (temp2).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    });
                } else
                {
                    //budget = data[a][yAxis];
                    $('#vendorTableRenderer').hide();
                }
                tbody = tbody + `<tr vendorData='${JSON.stringify(data[a])}' onclick=onCLickBarChart('obj','${widgetData.query_params_key}','${widgetData.query_params_field}',this)>`
                tbody = tbody + `<td colspan="2"><b>${data[a][widgetData.x_axis]}</b></td>
                <td colspan="2"> ${budget} </td>
                <td colspan="2"> ${budget2} </td>
                </tr>`
            }
            else
            {
               // $('#vendorTableRenderer').hide();
            }
        }

        let html = `<thead>
                    <tr>
                        <th colspan="2" style="color: #571c7a; ">${widgetData.x_axis_label}</th>
                        <th colspan="2" style="color: #571c7a; ">${widgetData.y_axis_label}</th>
                        <th colspan="2" style="color: #571c7a; ">${widgetData.y_axis_line_label}</th>
                    </tr>
                </thead>
                <tbody>
                        ${tbody}
                </tbody>`

        $("#vendorTableRenderer").html(html)
    }
}

function getDataByStorePorcedure(widgetData) {
    const urlParams = new URLSearchParams(window.location.search);
    const question_id = urlParams.get('question_id');
    const category = urlParams.get('category');
    $.ajax({
        type: "POST",
        data: paramRenderer(widgetData),
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/ExecuteStoreProcedureDrillDown",

        success: function (result) {
            result = jQuery.parseJSON(result);
            const urlParams = new URLSearchParams(window.location.search);
            const question_id = urlParams.get('question_id');
            console.log("result: ", result)
             if (result.records && result.records != 0) {
                 const records = result.records;
                 //console.log("-------",records)
                 if (records[0].vendor_name) {
                     $("#vendor_name").html(`<strong>- <a href="/AnswerWizard/VendorPlus?vendor_uei=${records[0].vendor_uei}&&category=${category}">
                                            <u><span id="vendor">${records[0].vendor_name}</u></a></span>
                                            </strong>`)
                 }

                 // For Vendor Name
                 if (records[0].vendor_name) {
                     vender = records[0].vendor_name;
                     $("#vn")[0].innerText = vender;
                 }
                 else if (records[0].recipient_uei) {
                     vender = records[0].recipient_name;
                     $("#vn")[0].innerText = vender;
                 }
                 else {
                     $("#vn").parent().remove();
                 }

                 // For Business Name
                 if (records[0].legal_business_name) {
                     business = records[0].legal_business_name
                     $("#vn").parent().remove();
                     $("#bn")[0].innerText = business
                 }
                 else if (records[0].LEGAL_BUSINESS_NAME) {
                     //business = records[0].LEGAL_BUSINESS_NAME
                     //$("#bn")[0].innerText = business
                     $("#vn").parent().remove();
                     $("#bn").parent().remove();
                 }
                 else {
                     $("#bn").parent().remove();
                 }
                 //if (!records[0].legal_business_name && !records[0].vendor_name) {
                 //    $("#vn").parent().remove();
                 //    $("#bn").parent().remove();
                 //}
                 
                 if (widgetData.wizard_widget_type_type === 'bar') {
                     console.log("Condition 1")
                     clusteredGraph(records, widgetData.x_axis, widgetData.y_axis, widgetData.y_axis_line, widgetData.y_axis_bar_label, widgetData.y_axis_line_label, widgetData.query_params_key, widgetData.query_params_field)
                 }
                 else if (widgetData.wizard_widget_type_type === 'same_bar') {
                     console.log("Condition 2")
                     //$('.vendor__table').hide();
                     const params = new URLSearchParams(window.location.search)
                     let yAxisValue = '';
                     for (const param of params) {
                         if (param[0]=='y_axis') {
                             console.log("y axis: ", param[1])
                             yAxisValue = param[1]
                             break;
                         }
                     }
                     if (question_id == 42) {
                         if (yAxisValue == 'base_and_all_options_2') {
                             yAxisValue = 'base_and_all_options_1'
                         }
                         else if (yAxisValue == 'total_dollars_obligated_2') {
                             yAxisValue = 'total_dollars_obligated_1'
                         }
                     }
                     yAxisValue ? barChart(records, widgetData.x_axis, yAxisValue, widgetData.query_params_key, widgetData.query_params_field)
                         : barChart(records, widgetData.x_axis, widgetData.y_axis, widgetData.query_params_key, widgetData.query_params_field);
                 }
                 else if (widgetData.wizard_widget_type_type === 'column-line') {
                     console.log("Condition 3")
                     columnLineChart(records, widgetData.x_axis, widgetData.y_axis, widgetData.y_axis_line, widgetData.query_params_key, widgetData.query_params_field);
                 }
                 else {
                     console.log("Condition 4")
                     clusteredColumnChart(records, widgetData.x_axis, widgetData.y_axis, widgetData.query_params_key, widgetData.query_params_field);
                 }

               //  renderVendorTable(widgetData.wizard_widget_type_type, records, widgetData.x_axis, widgetData.y_axis, widgetData.x_axis_label, widgetData.y_axis_label, widgetData.y_axis_line, widgetData.y_axis_line_label, widgetData.widget_currency_field);
                   renderVendorTable(widgetData, records);

                 //widgetData.wizard_widget_type_type == 'bar' ?
                 //    clusteredGraph(records, widgetData.x_axis, widgetData.y_axis, widgetData.y_axis_line, widgetData.y_axis_bar_label, widgetData.y_axis_line_label, widgetData.query_params_key, widgetData.query_params_field)
                 //    :
                 //    clusteredColumnChart(records, widgetData.x_axis, widgetData.y_axis, widgetData.query_params_key, widgetData.query_params_field);            
             }
             else {
                 noDataDisplay();
             }
        },
        error: function (error) { }
    });
}