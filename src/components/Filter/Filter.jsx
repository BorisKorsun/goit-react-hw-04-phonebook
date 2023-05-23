import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';

const Filter = ({ onChange, value }) => {
    return <Formik>
        <Form>
            <label>
                Find contacts by name
                <Field
                name="filter" 
                onChange={onChange}
                value={value}
                ></Field>
            </label>
        </Form>
    </Formik>
};

export default Filter;

Filter.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
}