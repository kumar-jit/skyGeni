import { Box, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import BarChartCard from "../cards/BarChartCard";

const PageSkeleton = (props) => {
    const { barChartData, collerPalette, width, height, heading } = props;

    return (
        <Card>
            <CardContent>
                <Typography align="center"  variant="h6" fontWeight="550">
                <span>{`Won ACV mix by ${heading}`}</span>
                    </Typography>
                <Grid container spacing={2}>
                    <Grid display="flex" justifyContent="start" size={8}>
                        <BarChartCard
                            barChartData={barChartData}
                            collerPalette={collerPalette}
                            width={width.barChart}
                            height={height.barChart}
                        />
                    </Grid>

                    <Grid display="flex" justifyContent="start" size={4}></Grid>

                    <Grid>{/* Optional additional content */}</Grid>

                    <Grid>{/* Optional additional content */}</Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PageSkeleton;
