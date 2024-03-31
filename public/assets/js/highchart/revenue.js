function revenueBarChart(orderDetails, currentYear, provider, currencySymbol) {
    let seriesData = [];
    let weeklyData = [];

    orderDetails.forEach(function (monthData) {
        let monthlyData = {
            name: monthData.name,
            y: monthData.y,
            drilldown: monthData.drilldown,
        };
        seriesData.push(monthlyData);

        let transformedData = {
            name: monthData.name,
            id: monthData.name,
            data: $.map(monthData.weeks, function (value, key) {
                return [
                    [
                        value.week_in_month,
                        value.weekly_commission
                    ]
                ];
            })
        };
        weeklyData.push(transformedData);

    });


    let chartOption = {
        chart: {
            type: 'column'
        },
        title: {
            align: 'left',
            text: 'Commission for year ' + currentYear
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category',
            title: {
                text: 'Month'
            }
        },
        yAxis: {
            title: {
                text: provider + ' Commission'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: `${currencySymbol}{point.y:,.2f}`
                }
            }
        },
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: [
                        'printChart',
                        'separator',
                        'downloadPNG',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadCSV',
                        'downloadXLS'
                    ]
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: `<span style="color:{point.color}">{point.name}</span>: <b>${currencySymbol}{point.y:,.2f}</b><br/>`
        },

        series: [
            {
                name: 'Month',
                colorByPoint: true,
                data: seriesData
            }
        ],
        drilldown: {
            breadcrumbs: {
                position: {
                    align: 'right'
                }
            },
            series: weeklyData
        }
    }

    let chartData = Highcharts.chart('revenueChart', chartOption);
}
