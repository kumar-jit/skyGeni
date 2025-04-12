import { connect } from "react-redux";
// import BarCharts from "../components/cards/barChart"
import { customerTypeReducerInitialLoadThunk } from "../redux/reducers/CustomerReducer";
import { useEffect } from "react";
import PageSkeleton from "../components/PageSkeleton/PageSkeleton";

const CustomerType = (props) => {
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
            heading="Cust Type"
        />
    );
};

const mapStateToProps = (state) => ({
    barChartData: state.customerTypeReducer?.barChartData,
    collerPalette: state.customerTypeReducer.collerPalette,
});
const mapDispatchToProps = (dispatch) => ({
    inittialDataLoad: () => dispatch(customerTypeReducerInitialLoadThunk()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CustomerType);

// export const CustomerType = connect(mapStateToProps,mapDispatchToProps)(CustomerTypeComponent);
