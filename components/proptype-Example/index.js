import { PropTypes } from 'prop-types';
import React from 'react';
import { View, Input, Text } from 'react-native-elements';
import styles from './styles';

const FKTextInput = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched }
}) => (
  <View>
    <Input
      onChangeText={onChange(name)}
      onBlur={onBlur(name)}
      placeholder="Test"
      style={[
        styles.rootInput,
        {
          borderColor: errors[name] && touched[name] ? 'red' : 'gray'
        }
      ]}
      value={value}
    />
    {errors[name] && touched[name] && (
      <Text style={styles.rootError}>{errors[name]}</Text>
    )}
  </View>
);

FKTextInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }).isRequired,
  form: PropTypes.shape({
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired
  }).isRequired
};

export default FKTextInput;
