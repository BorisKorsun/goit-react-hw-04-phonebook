import { Field } from 'formik';
import PropTypes from 'prop-types'

export default function FormField ({ name, onChange, value, pattern }) {
    return (
    <label>
       {name}
        <Field
        onChange={(e) => {onChange(e)}}
        value={value}
        type="text"
        name={name}
        pattern={pattern}
        />
    </label>)
};

FormField.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

