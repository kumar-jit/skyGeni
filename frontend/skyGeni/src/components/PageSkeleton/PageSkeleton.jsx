import { Box, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import BarChartCard from "../cards/BarChartCard";
import DonutChart from "../DonutChart/DonutChart";

const PageSkeleton = (props) => {
    const { barChartData, collerPalette,doughnutChartData, width, height, heading } = props;

    return (
        <Card>
            <CardContent>
                <Typography align="center"  variant="h6" fontWeight="550">
                <span>{`Won ACV mix by ${heading}`}</span>
                    </Typography>
                <Grid container spacing={2}>
                    <Grid display="flex" justifyContent="start" size={7}>
                        <BarChartCard
                            barChartData={barChartData}
                            collerPalette={collerPalette}
                            width={width.barChart}
                            height={height.barChart}
                        />
                    </Grid>

                    <Grid display="flex" justifyContent="center" size={5}>
                        <DonutChart chartData={doughnutChartData} collerPalette={collerPalette}></DonutChart>
                    </Grid>

                    <Grid>{/* Optional additional content */}</Grid>

                    <Grid>{/* Optional additional content */}</Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PageSkeleton;
