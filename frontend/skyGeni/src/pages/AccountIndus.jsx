import { connect } from "react-redux";
import { useEffect } from "react";

import { accountIndusReducerInitialLoadThunk } from "../redux/reducers/AccountIndusReducer.js";

import PageSkeleton from "../components/PageSkeleton/PageSkeleton.jsx";

const AccountIndus = (props) => {
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
            heading="Acc Indus"
        />
    );
};

const mapStateToProps = (state) => ({
    barChartData: state.accountIndusReducer?.barChartData,
    collerPalette: state.accountIndusReducer.collerPalette,
});
const mapDispatchToProps = (dispatch) => ({
    inittialDataLoad: () => dispatch(accountIndusReducerInitialLoadThunk()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AccountIndus);
