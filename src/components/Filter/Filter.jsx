import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';

export default function Filter ({ onChange, value }) {
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

Filter.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
}