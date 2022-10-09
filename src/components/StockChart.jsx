import Chart from "react-apexcharts";
import { useState } from "react";

export const StockChart = ({ chartData, symbol }) => {
    const { day, week, year } = chartData;
    const [dateFormat, setDateFormat] = useState("24h");

    const determineTimeFormat = () => {
        switch (dateFormat) {
            case "24h":
                return day;
            case "7d":
                return week;
            case "1y":
                return year;
            default:
                return day;
        }
    }

    const selectedData = determineTimeFormat();
    const color = selectedData[selectedData.length - 1].y - selectedData[0].y > 0 ? "#26C281" : "#ed3419";

    const options = {
        colors: [color],
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px"
            }
        },
        chart: {
            id: "stock data",
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: "MMM dd HH:MM"
            }
        }
    }

    const series = [{
        name: symbol,
        data: selectedData
    }]

    const renderButtonSelect = (button) => {
        const classes = "btn m-1 ";
        if (button === dateFormat) {
            return classes + "btn-primary";
        } else {
            return classes + "btn-outline-primary";
        }
    }

    return (
        <div
            style={{ backgroundColor: "rgb(145, 158, 171, 0.04)" }}
            className="mt-5 p-4 shadow-sm bg-white"
        >
            <Chart options={options} series={series} type="area" width="100%" />
            <div>
                <button className={renderButtonSelect("24h")} onClick={() => setDateFormat("24h")}>24h</button>
                <button className={renderButtonSelect("7d")} onClick={() => setDateFormat("7d")}>7d</button>
                <button className={renderButtonSelect("1y")} onClick={() => setDateFormat("1y")}>1y</button>
            </div>
        </div>
    )
}