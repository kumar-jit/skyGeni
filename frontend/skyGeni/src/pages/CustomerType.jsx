import { connect } from "react-redux";
import { customerTypeReducerInitialLoadThunk } from "../redux/reducers/CustomerReducer";
import { useEffect } from "react";
import PageSkeleton from "../components/PageSkeleton/PageSkeleton";

const CustomerType = (props) => {
    const { barChartData, inittialDataLoad, collerPalette, doughnutChartData,tableData } = props;
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
            tableData={tableData}
            width={width}
            height={height}
            heading="Cust Type"
        />
    );
};

const mapStateToProps = (state) => ({
    barChartData: state.customerTypeReducer?.barChartData,
    collerPalette: state.customerTypeReducer.collerPalette,
    doughnutChartData: state.customerTypeReducer.doughnutChartData,
    tableData: state.customerTypeReducer.tableData,
});
const mapDispatchToProps = (dispatch) => ({
    inittialDataLoad: () => dispatch(customerTypeReducerInitialLoadThunk()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CustomerType);

// export const CustomerType = connect(mapStateToProps,mapDispatchToProps)(CustomerTypeComponent);
