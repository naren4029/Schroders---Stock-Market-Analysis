import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options: any = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        fontColor: "#002a5e",
        fontFamily: "NotoSans-Regular",
      },
    },
    title: {
      display: true,
      text: "Stock Prices (in USD)",
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#002a5e",
      },
    },
    y: {
      ticks: {
        color: "#002a5e",
      },
    },
  },
};

const colors: any[string] = ["#42a5f5", "#ffa726", "#66bb6a"];

export const getLineChartData = (
  fromToDate: any,
  dataList: any,
  selectedData: string,
) => {
  const data: any = {
    labels: [],
    datasets: [],
  };

  data.datasets = dataList.map((obj: any, index: number) => {
    const dataSet = {
      borderColor: colors[index],
      backgroundColor: colors[index],
      label: obj.symbol,
      data: obj[selectedData] || [],
    };
    return dataSet;
  });

  let maxDataCount = data.datasets.reduce(
    (pervValue: number, currValue: any) => {
      if (currValue.data.length > pervValue) {
        return currValue.data.length;
      }
      return pervValue;
    },
    0,
  );

  const incrementBy: number = Math.round(
    (fromToDate.toDt - fromToDate.fromDt) / maxDataCount,
  );

  let incrementedDate: number = fromToDate.fromDt;

  let labels = [];

  for (let i = 0; i < maxDataCount; i++) {
    incrementedDate = incrementedDate + incrementBy;
    labels.push(formatDate(incrementedDate));
  }

  data.labels = labels;

  return { data, options };
};

export const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const formatDate = (date: number) => {
  const dt = new Date(date);
  return (
    [
      padTo2Digits(dt.getMonth() + 1),
      padTo2Digits(dt.getDate()),
      dt.getFullYear(),
    ].join("/") +
    " " +
    [
      padTo2Digits(dt.getHours()),
      padTo2Digits(dt.getMinutes()),
      padTo2Digits(dt.getSeconds()),
    ].join(":")
  );
};
