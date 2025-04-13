
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

/**
 * @description This function is used to group the data for the doughnut chart and calculate the total acv and percentage for each quarter.
 * @param {Array} data the data to be grouped
 * @param {String} groupedFieldName field name for grouping
 * @param {String} metricField field name for metric
 * @returns 
 */
export const groupQuarterDataForDoughnut = (data, groupedFieldName, metricField) => {
    const result = {
      totalAcv: 0,
      data: []
    };
  
    const groupedMap = {};
  
    // Step 1: Group and Sum the calculatedValue
    data.forEach(item => {
      const key = item[groupedFieldName];
      const value = Math.round(item[metricField]) || 0;
  
      if (!groupedMap[key]) {
        groupedMap[key] = 0;
      }
  
      groupedMap[key] += value;
      result.totalAcv += value;
    });
  
    // Step 2: Prepare data with percentage
    for (const [name, acv] of Object.entries(groupedMap)) {
      const percentage = Math.round(result.totalAcv ? (acv / result.totalAcv) * 100 : 0);
  
      result.data.push({
        name,
        acv,
        percentage: percentage //Number(percentage.toFixed(2))
      });
    }
  
    return result;
}


/**
 * @description This function is used to group the data for the table and calculate the total acv and count for each quarter and metric.
 * @param {Array} data the data to be grouped
 * @param {String} quarterField field name for quarter
 * @param {String} metricField field name for metric
 * @param {String} tableName field name for table
 * @returns 
 */
export const groupQuarterDataForTable = (data=[], quarterField, metricField, tableName) => {
    // need for table header
    const listOfQuarter = [];
    const listOfMetric = [];

    // need for table data
    const tableData = [];

    const grouopByQuarter = {};
    // to calculate total acv and count for last column "Total"
    const groupByMetric = {};

    // sum of all acv, and count for last column "Total"
    let sumOfAcv = 0, sumOfCount = 0, umOfPercentage = 0;

    data.forEach(item => {

        // stage 1 grouping by quarter
        // if quarter is not present in the object, then create a new object for that quarter
        if(!grouopByQuarter[item[quarterField]]){
            grouopByQuarter[item[quarterField]] = {
                totalAcv: item['acv'],
                percentage: 100,
                totalCount: item['count'],
                metricsObject: {
                    [item[metricField]]: {
                        acv: item['acv'],
                        percentage: 0,
                        count: item['count']
                    }
                }
            };
            listOfQuarter.push(item[quarterField]);
        }
        else{
            grouopByQuarter[item[quarterField]].totalAcv += item['acv'];
            grouopByQuarter[item[quarterField]].totalCount += item['count'];
            grouopByQuarter[item[quarterField]].metricsObject[item[metricField]] = {
                acv: item['acv'],
                percentage: 0,
                count: item['count']
            }
        }
        
        // stage 2 grouping by metric
        // if metric is not present in the object, then create a new object for that metric
        if(!groupByMetric[item[metricField]]){
            groupByMetric[item[metricField]] = {
                totalAcv: item['acv'],
                percentage: 0,
                totalCount: item['count'],
            };
            listOfMetric.push(item[metricField]);
        }
        else{
            groupByMetric[item[metricField]].totalAcv += item['acv'];
            groupByMetric[item[metricField]].totalCount += item['count'];
        }

        sumOfAcv += item['acv'];    // sum of acv for last column "Total"
        sumOfCount += item['count']; // sum of count for last column "Total"
    })

    // stage 3 calculate percentage for each quarter and metric and preapring row data
    Object.entries(groupByMetric).map(([metricKey, value]) => {
        let row = {};
        row['rowName'] = metricKey;

        // preapring row data on the basis of quarter and metric
        Object.entries(grouopByQuarter).map(([quarter, quarterValue]) => {
            let cellCount = 0, cellAcv = 0, cellPercentage = 0;
            if(quarterValue['metricsObject'][metricKey]){
                cellCount = quarterValue['metricsObject'][metricKey]['count'];
                cellAcv = quarterValue['metricsObject'][metricKey]['acv'];
                cellPercentage = Math.round((cellAcv / quarterValue.totalAcv) * 100);
            }
            row[`${quarter}_Opps`] = cellCount;
            row[`${quarter}_ACV`] = cellAcv;
            row[`${quarter}_PercenOfTotal`] = cellPercentage;
        });

        // total column data calculation
        row['Total_Opps'] = value.totalCount;
        row['Total_ACV'] = value.totalAcv;
        row['Total_PercenOfTotal'] = Math.round((value.totalAcv / sumOfAcv) * 100);

        tableData.push(row);
    });

    // calculate total row data
    let totalRow = {};
    totalRow['rowName'] = 'Total';
    Object.entries(grouopByQuarter).map(([quarter, quarterValue]) => {
        totalRow[`${quarter}_Opps`] = quarterValue.totalCount;
        totalRow[`${quarter}_ACV`] = quarterValue.totalAcv;
        totalRow[`${quarter}_PercenOfTotal`] = 100;
    });

    // total column data calculation
    totalRow['Total_Opps'] = sumOfCount;
    totalRow['Total_ACV'] = sumOfAcv;
    totalRow['Total_PercenOfTotal'] = 100;

    // add the last row "Total" to the table data
    tableData.push(totalRow); 
    listOfQuarter.push('Total');

    return {
        colHeaders: listOfQuarter,
        rowHeaders: listOfMetric,
        tableContent: tableData,
        tableName: tableName
    }
}