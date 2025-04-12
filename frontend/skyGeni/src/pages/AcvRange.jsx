import { connect } from "react-redux";
import { useEffect } from "react";

import { acvRangeReducerInitialLoadThunk } from "../redux/reducers/AcvRangeReducer";
import PageSkeleton from "../components/PageSkeleton/PageSkeleton";

const AcvRange = (props) => {
    const { barChartData, inittialDataLoad, collerPalette } = props;
    let width = {
        barChart: 800,
        card: 400,
    };
    let height = {
        barChart: 400,
        card: 400,
    };
    useEffect(() => {
        inittialDataLoad();
    }, []);

    return (
        <PageSkeleton
            barChartData={barChartData}
            collerPalette={collerPalette}
            width={width}
            height={height}
            heading="ACV Range"
        />
    );
};

const mapStateToProps = (state) => ({
    barChartData: state.acvRangeReducer?.barChartData,
    collerPalette: state.acvRangeReducer.collerPalette,
});
const mapDispatchToProps = (dispatch) => ({
    inittialDataLoad: () => dispatch(acvRangeReducerInitialLoadThunk()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AcvRange);
