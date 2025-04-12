import { connect } from "react-redux";
import { useEffect } from "react";

import { teamReducerInitialLoadThunk } from "../redux/reducers/TeamReducer";

import PageSkeleton from "../components/PageSkeleton/PageSkeleton";

const Team = (props) => {
    const { barChartData, inittialDataLoad, collerPalette,doughnutChartData } = props;
    let width = {
        barChart: 800,
        card: 400,
        donutChart: 550
    };
    let height = {
        barChart: 400,
        card: 400,
        donutChart: 400
    };
    useEffect(() => {
        inittialDataLoad();
    }, []);

    return (
        <PageSkeleton
            barChartData={barChartData}
            collerPalette={collerPalette}
            doughnutChartData={doughnutChartData}
            width={width}
            height={height}
            heading="Team"
        />
    );
};

const mapStateToProps = (state) => ({
    barChartData: state.teamReducer?.barChartData,
    collerPalette: state.teamReducer.collerPalette,
    doughnutChartData: state.teamReducer.doughnutChartData,
});
const mapDispatchToProps = (dispatch) => ({
    inittialDataLoad: () => dispatch(teamReducerInitialLoadThunk()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Team);
