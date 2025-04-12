// export const groupQuarterData = (data, xAxisName, yAxisName) => {
//     const grouped = {};
//     data.forEach((item) => {
//         const xValue = item[xAxisName];
//         const yValue = item[yAxisName];
//         const value = item.acv;

//         if (!grouped[xValue]) {
//             grouped[xValue] = {
//                 quarter: xValue,
//                 yAxisData: {},
//                 total: 0,
//             };
//         }

//         if (!grouped[xValue].yAxisData[yValue]) {
//             grouped[xValue].yAxisData[yValue] = 0;
//         }

//         grouped[xValue].yAxisData[yValue] += value;
//         grouped[xValue].total += value;
//     });

//     return Object.values(grouped).map((group) => {
//         const { quarter, yAxisData, total } = group;
//         const yAxisArray = Object.entries(yAxisData).map(([name, value]) => ({
//             name,
//             value: parseFloat(value.toFixed(2)),
//             persentage: (value / total) * 100,
//         }));

//         return {
//             quarter,
//             yAxisData: yAxisArray.map((entry) => ({
//                 ...entry,
//                 persentage: parseFloat(entry.persentage.toFixed(15)), // Optional: adjust precision
//             })),
//             total: parseFloat(total.toFixed(2)),
//         };
//     });
// };


export const groupQuarterDataForChart = (data, xAxisName, yAxisName) =>{
    const grouped = {};
  
    data.forEach(item => {
      const xValue = item[xAxisName];
      const yValue = item[yAxisName];
      const acv = Math.round(item.acv);
  
      if (!grouped[xValue]) {
        grouped[xValue] = {
          quarter: xValue,
          yAxisData: {},
          total: 0
        };
      }
  
      if (!grouped[xValue].yAxisData[yValue]) {
        grouped[xValue].yAxisData[yValue] = 0;
      }
  
      grouped[xValue].yAxisData[yValue] += acv;
      grouped[xValue].total += acv;
    });
  
    return Object.values(grouped).map(group => {
      const { quarter, yAxisData, total } = group;
  
      const rawData = Object.entries(yAxisData).map(([name, acv]) => {
        const actual = (acv / total) * 100;
        return {
          name,
          acv: parseFloat(acv.toFixed(2)),
          actualPersentage: parseFloat(actual.toFixed(15)),
          floored: Math.floor(actual),
          remainder: actual - Math.floor(actual),
        };
      });
  
      const totalFloored = rawData.reduce((sum, item) => sum + item.floored, 0);
      let remainderToDistribute = 100 - totalFloored;
  
      rawData.sort((a, b) => b.remainder - a.remainder);
  
      rawData.forEach((item, index) => {
        item.persentage = item.floored + (index < remainderToDistribute ? 1 : 0);
        delete item.floored;
        delete item.remainder;
      });
  
      return {
        quarter,
        yAxisData: rawData.map(({ name, acv, actualPersentage, persentage }) => ({
          name,
          acv,
          persentage,
          actualPersentage
        })),
        total: parseFloat(total.toFixed(2))
      };
    });
  }
  