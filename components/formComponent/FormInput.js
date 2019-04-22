import React from 'react';
import _ from 'lodash';
import { View, StyleSheet } from 'react-native';
import { Text, Input } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { HelperText } from 'react-native-paper';

const FormInput = ({
  label,
  showRequireSign = false,
  placeholder = '',
  numberOfLines=1,
  multiline = false,
  keyboardType = 'default',
  values,
  onChangeText,
  errors,
  touched
}) => {
  return (
    <View>
      <Text style={styles.label}>
        {label}
        <Text style={styles.requireFieldLabel}>
          {showRequireSign ? '*' : ''}
        </Text>
      </Text>
      <Input
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={values}
        numberOfLines={numberOfLines}
        multiline={multiline}
        keyboardType = {keyboardType}
      />
      <HelperText type="error" visible={!errors && touched}>
        {errors && touched && errors}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { color: Colors.grayText, marginLeft: 10 },
  requireFieldLabel: { color: Colors.redText }
});

export default FormInput;
