import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setSubCategories } from '../../redux/directory/directory.actions';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import { getSubCategories } from '../../api/api-labcourse';

import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component';

//import sections from './sections.data';

const Directory = ({ sections, setSubCategories }) => {
    console.log("sections", sections)
    useEffect(() => {
        async function fetchCategories() {
            const res = await getSubCategories();
            console.log(res)
            setSubCategories(res.data);
        }
        fetchCategories()
            .then(() => console.log(sections))
    }, [])

    if (!sections) {
        return (<div><h3>No categories!</h3></div>)
    }

    return <div className="directory-menu">
        {sections.map(({ _id, ...otherProps }) =>  (
            <MenuItem key={_id} {...otherProps} linkUrl={`shop/${otherProps.name.toLowerCase()}/${_id}`} />
        ))}
    </div>
}

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})

const mapDispatchToProps = dispatch => ({
    setSubCategories: subcategories => dispatch(setSubCategories(subcategories))
    // setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Directory);