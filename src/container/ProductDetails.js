import ProductDetails from '../screen/ProductDetails';
import { connect } from 'react-redux';
import { getProductDetails } from '../redux/actions';

/*========================================================
    * function Name: ProductDetails pages
    * function Purpose: called action and stored state
    * function Parameters: ProductDetails, mapStateToProps, dispatchers
    * function ReturnType: state
    * function Description: called action of dispatchers and stored state of mapStateToProps
    *=====================================================*/

const mapStateToProps = state => ({
    productDetailsLoading: state.product.productDetailsLoading,
    productDetails: state.product.productDetails,
    productDetailsError: state.product.productDetailsError
});

const mapDispatchToProps = {
    getProductDetails
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductDetails);