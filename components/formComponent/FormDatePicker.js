import React from 'react';
import _ from 'lodash';
import { View, StyleSheet } from 'react-native';
import { Text, Input } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { HelperText } from 'react-native-paper';
import DatePicker from 'react-native-datepicker';

const FormDatePicker = ({
  label,
  showRequireSign = false,
  placeholder = '',
  values,
  onDateChange,
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
      <DatePicker
        style={{ width: 200 }}
        date={values}
        mode="date"
        placeholder={placeholder}
        format="DD/MM/YYYY"
        minDate="01/05/1900"
        maxDate="01/06/2050"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 10,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 46
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={onDateChange}
      />
      <HelperText type="error" visible={!errors && touched}>
        {errors && touched && errors}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { color: Colors.grayText, marginLeft: 10, paddingBottom: 3 },
  requireFieldLabel: { color: Colors.redText }
});

export default FormDatePicker;
