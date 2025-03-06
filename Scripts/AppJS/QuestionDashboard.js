$(document).ready(() => {
    $('#noData').hide();
    
    fetchWidgets();
    /*donutChart();*/
    //$("#page2 a").attr("href", localStorage.getItem("answerWidgetPage2Url"));
    $("#page3 a").attr("href", localStorage.getItem("answerWidgetPage3Url"));
})

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

function getQueryParams() {
    const params = new URLSearchParams(window.location.search)
    /* console.log("params: ", params)*/
    let queryParams = "";
    let count = 0;
    for (const param of params) {
        if (count == 0) {

            queryParams = queryParams + `?${param[0]}=${param[1]}`
        } else if (count == 1) {
            queryParams = queryParams + `&&${param[0]}=${param[1]}`
        }
        else {
            const object = JSON.parse(param[1])
            queryParams = queryParams + `&&${param[0]}=${encodeURIComponent(JSON.stringify(object))}`
        }
        count++;
    }
   
    return queryParams
}

function onCLickBarChart(ev, url, queryParamsKey, queryParamsField) {
    let queryParams = getQueryParams();

    if (queryParamsKey.indexOf(',') == -1) {
        queryParams = queryParams + `&&${queryParamsKey}=${ev.target.dataItem.dataContext[queryParamsField]}`
    } else {
        queryParamsKey = queryParamsKey.split(',');
        queryParamsField = queryParamsField.split(',')
        
        queryParamsKey.forEach((item, index) => {
            queryParams = queryParams + `&&${item}=${ev.target.dataItem.dataContext[queryParamsField[index]]}`
        })
    }
   

    
    document.location = `${url}${queryParams}`;
}

function onCLickClusteredBarChart(ev, url, queryParamsKey, queryParamsField) {
    /* console.log("params: ", params)*/
    let queryParams = getQueryParams();
    const params = new URLSearchParams(window.location.search)
    if (params.get('question_id') === "42") {
        console.log(ev.target.dataItem.component._settings.valueYField)
        const valueYfield = ev.target.dataItem.component._settings.valueYField;
        queryParams = queryParams + `&&set_aside=${valueYfield.indexOf('1') != -1 ? ev.target.dataItem.dataContext.set_aside_code1 :
            ev.target.dataItem.dataContext.set_aside_code2}&&set_aside_code=${valueYfield.indexOf('1') != -1 ? ev.target.dataItem.dataContext.set_aside_code1 :
                ev.target.dataItem.dataContext.set_aside_code2}`
       
    }
   
    queryParams = queryParams + `&&y_axis=${ev.target.dataItem.component._settings.valueYField}`
  

    document.location = `${url}${queryParams}`;
}

function clusteredBarChart(dataChart, xAxisLabel, yAxisLabel, queryParamsKey, queryParamsField) {
    console.log("4 bars")
    const urlParams = new URLSearchParams(window.location.search);
    const question_id = urlParams.get('question_id');
    am5.ready(() => {
      //  console.log(dataChart, xAxisLabel, yAxisLabel, queryParamsKey, queryParamsField)
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("chartDivBar");
        const data = dataChart
        code1 = dataChart[0].type_of_set_aside1
        code2 = dataChart[0].type_of_set_aside2
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
                am5.color(0x68dc76),
                am5.color("#8b5edd")
            ]); 
            series.columns.template.events.on("click", function (ev) {
                onCLickClusteredBarChart(ev, '/AnswerWizard/DrillDown1', queryParamsKey, queryParamsField)
            });

            legend.data.push(series);
        }
        yAxisLabel = yAxisLabel.split(',').forEach(item => {
            if (question_id == 42) {
                //item.replaceAll('1','8A');
                makeSeries(item.replaceAll('_', ' ').replaceAll('1', code1).replaceAll('2', code2) .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()), item);
            }
            else {
                makeSeries(item.replaceAll('_',' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()), item);
            }
        });
      

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);

    }); // end am5.ready()
}

function barChart(data, xAxisLabel, yAxisLabel, queryParamsKey, queryParamsField) {
    const urlParams = new URLSearchParams(window.location.search);
    const question_id = urlParams.get('question_id');
    am5.ready(function () {
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        let root = am5.Root.new("chartDivBar");

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
            //centerX: am5.p100,
            paddingRight: 15,
            //textContent:center
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
           fontSize:14
        });

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            //min: 0,
            //max: 5,
            maxPrecision: 0,
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
            if (question_id == 44 || question_id == 50) {
                onCLickBarChart(ev, '/AnswerWizard/OpportunityDataGrid', queryParamsKey, queryParamsField)
            } else if (question_id == 61) {
                onCLickBarChart(ev, '/AnswerWizard/DrillDown2', queryParamsKey, queryParamsField)
            } else if (question_id == 65 || question_id == 66) {
                onCLickBarChart(ev, '/AnswerWizard/HdrDataGrid', queryParamsKey, queryParamsField)
            } else {
                onCLickBarChart(ev, '/AnswerWizard/DrillDown1', queryParamsKey, queryParamsField)
            }
           
        });    

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
      /*  const exporting=am5plugins_exporting.Exporting.new(root, {
            menu: am5plugins_exporting.ExportingMenu.new(root, {}),
            dataSource: data
        });*/
    }); 
}

function columnLineChart(data, xAxisLabel, yAxisBar, yAxisLine, queryParamsKey, queryParamsField) {
    am5.ready(function () {

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("chartDivBar");

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
            var providerData = data[providerName];
            // add data of one provider to temp array
            var tempArray = [];
            var count = 0;
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

function clusteredColumnLineChart(widgetData, xAxisLabel, yAxisBar, yAxisLine, queryParamsKey, queryParamsField) {
    const urlParams = new URLSearchParams(window.location.search);
    const question_id = urlParams.get('question_id');
    am5.ready(function () {

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("chartDivBar");

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
              
            })
        );

        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0.3,
                renderer: am5xy.AxisRendererY.new(root, {}),
                
            })
        );
       
        var yAxis2 = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0.3,
                syncWithAxis: yAxis,
                renderer: am5xy.AxisRendererY.new(root, { opposite: true })

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
                    labelText: "{provider}: {valueY}"
                })
            })
        );
 
        series.columns.template.setAll({
            fillOpacity: 0.9,
            strokeOpacity: 0,
            location:0
        });
        chart.get("colors").set("colors", [
            am5.color("#fdd023"),
            am5.color("#6771dc"),
            am5.color("#fdd023"),
            am5.color("#6771dc"),
            am5.color("#fdd023"),
            am5.color("#6771dc"),
            am5.color("#fdd023"),
            am5.color("#6771dc"),
            am5.color("#fdd023"),
            am5.color("#6771dc"),
            am5.color("#fdd023"),
            am5.color("#6771dc"),
            am5.color("#fdd023"),
            am5.color("#6771dc"),
            am5.color("#fdd023"),
            am5.color("#6771dc"),
            am5.color("#fdd023"),
            am5.color("#6771dc"),
            am5.color("#fdd023"),
            am5.color("#6771dc"),
            am5.color("#fdd023"),
            am5.color("#6771dc"),
            am5.color("#fdd023"),
            am5.color("#6771dc"),
            am5.color("#fdd023"),
            am5.color("#6771dc"),
            am5.color("#fdd023"),
            am5.color("#6771dc"),
            am5.color("#fdd023"),
            am5.color("#6771dc")
        ]);
        //chart.get("colors").set("colors", [
        //    am5.color("#76bedf"),
        //    am5.color("#769edf"),
        //    am5.color("#76bedf"),
        //    am5.color("#769edf"),
        //    am5.color("#76bedf"),
        //    am5.color("#769edf"),
        //    am5.color("#76bedf"),
        //    am5.color("#769edf"),
        //    am5.color("#76bedf"),
        //    am5.color("#769edf")
        //]); 
        
        series.columns.template.adapters.add("fill", (fill, target) => {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", (stroke, target) => {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.events.on("click", function (ev) {
            ev.target.dataItem.dataContext[queryParamsField] = ev.target.dataItem.dataContext[queryParamsField].replace('_', '')
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
        var data = {}
       
        const yAxisSplit = yAxisBar.split(',')
   
        widgetData.forEach((item) => {
            data[item[xAxisLabel]] = {};
            data[item[xAxisLabel]][yAxisSplit[0]] = item[yAxisSplit[0]];
            data[item[xAxisLabel]][yAxisSplit[1]] = item[yAxisSplit[1]]
            data[item[xAxisLabel]][yAxisLine] = item[yAxisLine]
            data[item[xAxisLabel]][queryParamsKey] = !isNaN(item[queryParamsField]) ? `_${item[queryParamsField]}` : item[queryParamsField]
           
          //  data[item[xAxisLabel]][queryParamsKey] = item[queryParamsField]
        })


        // process data ant prepare it for the chart
        for (var providerName in data) {
            var providerData = data[providerName];
            if (typeof providerData == "function") {
                break;
            }
            // add data of one provider to temp array
            var tempArray = [];
            var count = 0;
            // add items
            for (var itemName in providerData) {
                //console.log(itemName, queryParamsField)
                if (itemName != yAxisLine && itemName != queryParamsField) {
                    count++;
                    // we generate unique category for each column (providerName + "_" + itemName) and store realName
                    const obj = {
                        category: providerName + "_" + itemName,
                        realName: "",
                        value: providerData[itemName],
                        provider: providerName,
                    }
                    obj[queryParamsKey] = providerData[queryParamsField]
                    tempArray.push(obj);
                }
            }
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
          //  range.strokes.template.set("strokeWidth", 0);
            
            var label = range.get("label");

            label.setAll({
                text: tempArray[0].provider,
                dy: 30,
                location: 0 ,
                tooltipText: tempArray[0].provider,
                rotation: -90,
               // paddingTop:130

            });

            var tick = range.get("tick");
            tick.setAll({ visible: true, strokeOpacity: 0, length: 50, location: 0 });

            var grid = range.get("grid");
            grid.setAll({ strokeOpacity: 1, location: 0 });
        }

        // add range for the last grid
        var range = xAxis.makeDataItem({});
        xAxis.createAxisRange(range);
        range.set("category", chartData[chartData.length - 1].category);
        
        var tick = range.get("tick");
        tick.setAll({ visible: true, strokeOpacity: 0, length: 50, location: 0 });

        var grid = range.get("grid");
        grid.setAll({ strokeOpacity: 1, location: 1, });

        xAxis.data.setAll(chartData);
        series.data.setAll(chartData, { location: 0, strokeOpacity: 0 });
        lineSeries.data.setAll(chartData);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);

    }); // end am5.ready()
}

function dualBar(data, xAxisValue, yAxisValue1, yAxisValue2, yAxisLabel1, yAxisLabel2, query_params_key, query_params_field) {
    console.log("Dual Bar")

    am5.ready(function () {

        data.sort((a, b) => a[xAxisValue] - b[xAxisValue]);
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("chartDivBar");


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
        function makeSeries(name, fieldName, color) {
            var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: xAxisValue
            }));

            series.columns.template.events.on("click", function (ev) {
                onCLickBarChart(ev, '/AnswerWizard/DrillDown1', query_params_key, query_params_field)

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

function fetchWidgets() {
    const urlParams = new URLSearchParams(window.location.search);
    const question_id = urlParams.get('question_id');
    const category = urlParams.get('category')
    $("#categoryQuestion").html(`<a href="${localStorage.getItem("answerWidgetPage2Url")}">${category.charAt(0).toUpperCase() + category.slice(1)} Question List</a>`)
    $.ajax({
        type: "POST",
        data: { question_id},
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/GetQuestionWidgetsList",
        success: function (result) {
            result = jQuery.parseJSON(result);
           
            if (result.records && result.records != 0) {
                const records = result.records;
                const filteredObject= checkPageNumber(records)
                $("#heading").html(`<strong>${filteredObject.question_name}</strong>`)
                $("#sub_heading").html(`<strong>${filteredObject.description}</strong>`)
                $("#description").html(`<strong>${filteredObject.widget_help_description}</strong>`)
                getDataByStorePorcedure(filteredObject)
            }
            else {
             
            }
        },
        error: function (error) { }
    });
}

function checkPageNumber(records) {
        let object = "";
    let foundFlag = false;
      for (let a = 0; a < records.length; a++) {
          if (records[a].page_number == 4) {
              object = records[a]
              foundFlag = true;
              break;
          } else if (records[a].page_number == 6) {
              document.location =`/AnswerWizard/DrillDown2${getQueryParams()}`
              break;
          }
    }
    if (foundFlag) {
        return object;
    }
   
}

function paramRenderer(widgetData,graphType) {

    const obj = { store_procedure: widgetData.store_procedure }
    const params = new URLSearchParams(window.location.search)
    //console.log("type ",widgetData.wizard_widget_type_type)
    let html = '';
    if (widgetData.wizard_widget_type_type == 'clustered-column-line') {
        html = html + `<tr><td><b>X-Axis</b></td><td> ${widgetData.x_axis_label} </td></tr>
                    <tr><td><b>Y-Axis Bar 1</b></td><td> ${widgetData.y_axis_label}</td></tr>
                    <tr><td><b>Y-Axis Bar 2</b></td><td> ${widgetData.y_axis_bar_label}</td></tr>
                    <tr><td><b>Y-Axis Line</b></td><td> ${widgetData.y_axis_line_label}</td></tr>`;
    }
    else {
        html = html + `<tr><td><b>X-Axis</b></td><td> ${widgetData.x_axis_label} </td></tr><tr><td><b>${widgetData.y_axis_line_label ? 'Y-Axis Bar (Left)' : 'Y-Axis'}</b></td><td> ${widgetData.y_axis_label}</td></tr>`;

        if (widgetData.y_axis_line_label) {
            html = html + `<tr><td><b>Y-Axis Line (Right)</b></td><td> ${widgetData.y_axis_line_label}</td></tr>`
        }
    }


    for (const param of params) {
        if (param[0] != "question_id" && param[0] != 'category') {
            let object = JSON.parse(param[1]);

            if (object.label === 'Naics Family') {
                object.label = 'NAICS Family'
            }
            else if (object.label === 'Naics') {
                object.label = 'NAICS'
            }
            const value = `<td>${object.description ? object.label == 'NAICS' ||
                object.label == 'NAICS Family' ||
                object.label == 'Contract Vehicle' ? object.description : '' + object.description.split(', ').join("<br>") : object.value}</td >`

            html = html + `<tr><td><b>${object.label == 'Socio-Economic Designation' ? 'Socio-Economic' : object.label}</b ></td > ${value} </tr >`;
            param[0] = param[0].replace("+", '').trim()
            obj[param[0]] = object.value

        } else {
            obj[param[0]] = param[1]

        }

    }

    $("#paramRenderer").html(html);
    if (params.get('question_id') == 1 || params.get('question_id') == 3 || params.get('question_id') == 5 || params.get('question_id') == 6
        || params.get('question_id') == 7 || params.get('question_id') == 8 || params.get('question_id') == 41 || params.get('question_id') == 58
        || params.get('question_id') == 63) {
        obj.display_type = graphType
    }
    //console.log("-------", obj)
    return obj;
}

function getDataByStorePorcedure(widgetData) {    
    //console.log("widgetData: ", widgetData)   
    $.ajax({
        type: "POST",
        data: paramRenderer(widgetData,'graph') ,
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/ExecuteStoreProcedure",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                let filterRecords = [];
                if (widgetData.question_id === 1 || widgetData.question_id === 3 || widgetData.question_id === 5 || widgetData.question_id === 6
                    || widgetData.question_id === 7 || widgetData.question_id === 8 || widgetData.question_id === 41 || widgetData.question_id === 58
                    || widgetData.question_id === 63) {
                    for (let a = 0; a < 20; a++) {
                        if (records[a]) {
                            filterRecords.push(records[a])
                        }
                       
                    }

                } else {
                    filterRecords = records
                    $("#searchTr").hide()
                }
                if (widgetData.wizard_widget_type_type === 'bar') {
                    barChart(filterRecords, widgetData.x_axis, widgetData.y_axis, widgetData.query_params_key, widgetData.query_params_field)
                }
                else if (widgetData.wizard_widget_type_type === 'clustered-bar') {
                    clusteredBarChart(filterRecords, widgetData.x_axis, widgetData.y_axis, widgetData.query_params_key, widgetData.query_params_field);
                }
                else if (widgetData.wizard_widget_type_type === 'column-line') {
                    columnLineChart(filterRecords, widgetData.x_axis, widgetData.y_axis, widgetData.y_axis_line, widgetData.query_params_key, widgetData.query_params_field);
                }
                else if (widgetData.wizard_widget_type_type === 'clustered-column-line' ) {
                    clusteredColumnLineChart(filterRecords, widgetData.x_axis, widgetData.y_axis, widgetData.y_axis_line, widgetData.query_params_key, widgetData.query_params_field);
                }
                else if (widgetData.wizard_widget_type_type === 'dual-bar') {
                    dualBar(filterRecords, widgetData.x_axis, widgetData.y_axis, widgetData.y_axis_line, widgetData.y_axis_bar_label, widgetData.y_axis_line_label, widgetData.query_params_key, widgetData.query_params_field);
                }
                if (widgetData.question_id == 1 || widgetData.question_id == 3 || widgetData.question_id == 6 || widgetData.question_id == 7
                    || widgetData.question_id == 8 || widgetData.question_id == 41  || widgetData.question_id == 58 || widgetData.question_id == 63) {
                   console.log("111111")
                    fetchVendorDetails(paramRenderer(widgetData, 'table'), widgetData)
                } else {
                    console.log("22222")
                    renderVendorTable(widgetData, records);
                }
            }
            else {
                noDataDisplay();
            }
        },
        error: function (error) { }
    });
}

function routeToVendorPlus(vendor_uei) {
   
    if (vendor_uei && vendor_uei != 'null') {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category')
        $("#searchVendorTable").val("").click().trigger("keyup");
       
        document.location = `/AnswerWizard/VendorPlus?vendor_uei=${vendor_uei}&&category=${category}`;   
    }
    
    else {
        console.log("Not a Vendor")      
    }
    
}

function renderVendorTable(widgetData, data) {
    console.log('rrrrrrrrrrrr')
    let tbody = '';
    //console.log("graph type: ", widgetData.wizard_widget_type_type)
    
    if (widgetData.wizard_widget_type_type == 'clustered-bar') {
        $('.vendor__table').hide();
    }
    else {

        if (widgetData.wizard_widget_type_type === 'clustered-column-line') {
            widgetData.y_axis = widgetData.y_axis.includes(',') ? widgetData.y_axis.split(',')[1] : widgetData.y_axis
        }
        //else {
        //    console.log(widgetData.wizard_widget_type_type)
        //}
        $.ajax({
            type: "POST",
            data: paramRenderer(widgetData,'table'),
            enctype: 'multipart/form-data',
            url: "/AnswerWizard/ExecuteStoreProcedure",
            success: function (result) {
                result = jQuery.parseJSON(result);
                if (result.records && result.records != 0) {
                    const records = result.records;
                    //console.log("+++++",records)
                    let filterRecords = [];
                    for (let a in data) {
                            //console.log("+++++", data[a][widgetData.x_axis])
                            //console.log("-----", data[a][widgetData.y_axis])
                        if (data[a][widgetData.x_axis] && data[a][widgetData.y_axis]) {
                            let budget, x;
                            const widgetDetail = JSON.stringify(widgetData);
                            const thead = ``;
                            let html = ` ${thead} ${tbody} `
                            $("#xAxisHeader").html(widgetData.x_axis_label)
                            $("#yAxisHeader").html(widgetData.y_axis_label)                         
                            $("#searchVendorTable").attr('widgetData', widgetDetail)
                            $("#searchVendorTable").attr('placeholder', `Search ${widgetData.x_axis_label}`)
                            if (widgetData.widget_currency_field) {
                                let temp = data[a][widgetData.y_axis];
                                budget = (temp).toLocaleString('en-us', {
                                    style: 'currency',
                                    currency: 'usd',
                                });
                            } else {
                                budget = data[a][widgetData.y_axis];
                            }
                                x = data[a][widgetData.x_axis];

                            tbody = tbody + `<tr onclick=routeToVendorPlus('${data[a].vendor_uei ? data[a].vendor_uei : data[a].recipient_uei}');><td colspan="2"><b>${x}</b></td><td colspan="2"> ${budget} </td></tr>`
                        }
                    }
                    $("#vendorTableBody").html(tbody)
                }
                else {
                    $('.vendor__table').hide();
                }
            },
            error: function (error) { }
        });
        
        
    }
}

function searchFilter(event) {
    const restrictedKeys = [37, 38, 39, 40]
    if (restrictedKeys.includes(event.which)) {
        return;
    }
    const widgetData = JSON.parse(event.target.getAttribute("widgetData"))
    let searchKeyword = event.target.value;
    if (searchKeyword.length > 2) {
        const data = paramRenderer(widgetData, 'table');
        data.search_text = searchKeyword
        fetchVendorDetails(data, widgetData)
    } else if (searchKeyword.length == 0) {
        fetchVendorDetails(paramRenderer(widgetData, 'table'), widgetData)
    }

}

function fetchVendorDetails(data, widgetData) {
    console.log('ffffffffffff')
    $.ajax({
        type: "POST",
        data,
        enctype: 'multipart/form-data',
        url: "/AnswerWizard/ExecuteStoreProcedure",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                let filterRecords = [];
                if (widgetData.question_id === 1 || widgetData.question_id === 3 || widgetData.question_id === 5 || widgetData.question_id === 6
                    || widgetData.question_id === 7 || widgetData.question_id === 8 || widgetData.question_id === 41 || widgetData.question_id === 58
                    || widgetData.question_id === 63) {
                    //for (let a = 0; a < 20; a++) {
                    //    if (records[a]) {
                    //        filterRecords.push(records[a])
                    //    }
                    //}
                    let html = ''
                    $("#xAxisHeader").html(widgetData.x_axis_label)
                    $("#yAxisHeader").html(widgetData.y_axis_label)
                    for (let a in records) {
                        //console.log("+++++", records[a][widgetData.x_axis])
                        //console.log("-----", records[a][widgetData.y_axis])


                        if (records[a][widgetData.x_axis] && records[a][widgetData.y_axis]) {
                            let budget, x;
                            const widgetDetail = JSON.stringify(widgetData);
                            $("#searchVendorTable").attr('widgetData', widgetDetail)
                            $("#searchVendorTable").attr('placeholder', `Search ${widgetData.x_axis_label}`)
                            if (widgetData.widget_currency_field) {
                                let temp = records[a][widgetData.y_axis];
                                budget = (temp).toLocaleString('en-us', {
                                    style: 'currency',
                                    currency: 'usd',
                                });
                            } else {
                                budget = records[a][widgetData.y_axis];
                            }
                            x = records[a][widgetData.x_axis];

                           
                            html = html + `<tr onclick = routeToVendorPlus('${records[a].vendor_uei ? records[a].vendor_uei : records[a].recipient_uei}');><td colspan="2"><b>${x}</b></td><td colspan="2"> ${budget} </td></tr >`
                        }
                    }
                    $("#vendorTableBody").html(html)
                } else {
                    filterRecords = records
                }
                //renderVendorTable(widgetData, records);
            }
            else {
                $("#vendorTableBody").html(`<tr><td colspan="8" style="text-align: center;">No Data to display.</td></tr>`)
            }
        },
        error: function (error) { }
    });

}

function exportToPpt() {
    html2canvas(document.querySelector("#chartDivBar")).then(canvas => {
       // document.body.appendChild(canvas);
        //console.log(canvas.toDataURL());  
        dataURL = canvas.toDataURL();
       //console.log(dataURL)
        bg_image = 'data:image/jpeg;base64,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';
        bg_image2 = 'data:image/jpeg;base64,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';

        let pptx = new PptxGenJS();
        $("small").before(
            '<code class="d-block text-black-50 mb-3">(pptxgenjs version: ' +
            pptx.version +
            ")</code>"
        );
        // Simple Slide
  //      const doDemo = () => {
          //  let pptx = new PptxGenJS();
        //pptx.author = 'Brent Ely';
        //pptx.company = 'S.T.A.R. Laboratories';
        //pptx.revision = '15';
        //pptx.subject = 'Annual Report';
        //pptx.title = 'PptxGenJS Sample Presentation'; 
        //pptx.defineLayout({ name: 'A3', width: 16.5, height: 11.7 });

        // Set presentation to use new layout
       // pptx.layout = 'MASTER_SLIDE'

        

       // let slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
       // slide.addText("How To Create PowerPoint Presentations with JavaScript", { x: 0.5, y: 0.7, fontSize: 18 });
       // slide.background = { color: "F1F1F1" };
        // Slide 1
        let slide1 = pptx.addSlide().addText("DEPARTMENT OF HEALTH AND HUMAN", {
            x:0.5,
            y: 1,
            w: "90%",
            fontFace: "Arial",
            fontSize: 30,
            color: "000000",
            bold: true, 
            underline: true,
            isTextBox: true,
        }).addImage({
            x: 0.5,
            y: 1.5, data: dataURL, w: 8, h: 4
        });
        slide1.background = { color: "FF3399", transparency: 50 };
        let slide2 = pptx.addSlide().addText("SERCO INC.", {
            x: 0.5,
            y: 1,
            w: "90%",
            fontFace: "Arial",
            fontSize: 30,
            color: "000000",
            bold: true,
            underline: true,
            isTextBox: true,
        }).addText(
            [
                { text: "075 - DEPARTMENT OF HEALTH AND HUMAN SERVICES (HHS)", options: { bullet: true, color: "0000AB" } },
                { text: "75FCMC - OFC OF ACQUISITION AND GRANTS MGMT", options: { bullet: true, color: "0000AB" } },
                { text: "FULL AND OPEN COMPETITION", options: { bullet: true, color: "0000AB" } },
                { text: "FAIR OPPORTUNITY GIVEN", options: { bullet: true, color: "0000AB" } },
            ],
            {
                x: 0.5, y: 2.0, w: "90%", color: "0000AB", fontFace: "Arial",
                fontSize: 15, }
        )
            .addText("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", {
            x: 0.5,
            y: 3.5,
            w: "90%",
            fontFace: "Arial",
            fontSize: 15,
            color: "00000",
            isTextBox: true,
            });
        slide2.background = { data: bg_image2 };
        let slide3 = pptx.addSlide().addText("CENTERS FOR MEDICARE", {
            x: 0.5,
            y: 1,
            w: "90%",
            fontFace: "Arial",
            fontSize: 30,
            color: "FFFFFF",
            bold: true,
            underline: true,
            isTextBox: true,
        }).addImage({
            x: 0,
            y: 2, data: dataURL, w: 5, h: 3
        }).addImage({
            x: 5,
            y: 2, data: bg_image2, w: 5, h: 3
        });
        slide3.background = { data: bg_image };
            pptx.writeFile();
            console.log("ppt downloaded")
      //  };

        //$.ajax({
        //    type: "POST",
        //    data: {
        //        image: dataURL,
        //        text: ''
        //    },
        //    enctype: 'multipart/form-data',
        //    url: "/AnswerWizard/ExportToPpt",
        //    success: function (result) {
        //        result = jQuery.parseJSON(result);
        //        console.log(result)
                
        //    },
        //    error: function (error) { }
        //});
    });  

}