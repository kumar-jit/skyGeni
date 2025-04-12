import { Stack, Typography } from "@mui/material";
import DonutChart from "../DonutChart/DonutChart";

const DonutChartCard = (props) => {
    const { donutChartData, collerPalette,width, height } = props;

    return (
        <Stack>
            <DonutChart donutChartData={donutChartData} collerPalette={collerPalette} height={width} width={height}/>
        </Stack>
        
    );
}
export default DonutChartCard;
