import Category from '../screen/Category';
import { connect } from 'react-redux';
import { getCategory } from '../redux/actions';

/*========================================================
    * function Name: Category pages
    * function Purpose: called action and stored state
    * function Parameters: Category, mapStateToProps, dispatchers
    * function ReturnType: state
    * function Description: called action of dispatchers and stored state of mapStateToProps
    *=====================================================*/

const mapStateToProps = state => ({
    categoryLoading: state.category.categoryLoading,
    categoryList: state.category.categoryList,
    categoryError: state.category.categoryError
});

const mapDispatchToProps = {
    getCategory
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Category);