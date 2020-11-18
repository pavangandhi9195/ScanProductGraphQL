import Product from '../screen/Product';
import { connect } from 'react-redux';
import { getProduct } from '../redux/actions';

/*========================================================
    * function Name: Product pages
    * function Purpose: called action and stored state
    * function Parameters: Product, mapStateToProps, dispatchers
    * function ReturnType: state
    * function Description: called action of dispatchers and stored state of mapStateToProps
    *=====================================================*/

const mapStateToProps = state => ({
    productLoading: state.product.productLoading,
    productList: state.product.productList,
    productError: state.product.productError
});

const mapDispatchToProps = {
    getProduct
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Product);