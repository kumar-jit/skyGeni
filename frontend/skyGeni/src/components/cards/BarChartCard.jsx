import { Stack, Typography } from "@mui/material";
import BarChart from "../BarCharts/BarCharts"

const BarChartCard = (props) => {
    const { barChartData, collerPalette, width, height } = props;
    return (
        <Stack >
            <BarChart data={barChartData} collerPalette={collerPalette} widthP={width} heightP={height} />
            <Typography gutterBottom align="center"  variant="h8" >
                <span>{`Closed Fiscal Quarter`}</span>
            </Typography>
        </Stack>
        
    );
}
export default BarChartCard;
