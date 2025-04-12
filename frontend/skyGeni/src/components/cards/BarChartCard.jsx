import { Stack } from "@mui/material";
import BarChart from "../BarCharts/BarCharts"
import Legend from "../Legend/Legend";

const BarChartCard = (props) => {
    const { barChartData, collerPalette,width, height } = props;

    return (
        <Stack alignItems="center">
            <BarChart data={barChartData} collerPalette={collerPalette} widthP={width} heightP={height} />
            <Legend collerPalette={collerPalette}/>
        </Stack>
        
    );
}
export default BarChartCard;
