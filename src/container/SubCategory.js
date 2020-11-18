import SubCategory from '../screen/SubCategory';
import { connect } from 'react-redux';
import { getSubCategory } from '../redux/actions';

/*========================================================
    * function Name: SubCategory pages
    * function Purpose: called action and stored state
    * function Parameters: SubCategory, mapStateToProps, dispatchers
    * function ReturnType: state
    * function Description: called action of dispatchers and stored state of mapStateToProps
    *=====================================================*/

const mapStateToProps = state => ({
    subCategoryLoading: state.category.subCategoryLoading,
    subCategoryList: state.category.subCategoryList,
    subCategoryError: state.category.subCategoryError
});

const mapDispatchToProps = {
    getSubCategory
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SubCategory);