import React from 'react';
import _ from 'lodash';
import { View, StyleSheet, Picker } from 'react-native';
import { Text } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { HelperText } from 'react-native-paper';

const FormPicker = ({
  label,
  showRequireSign = false,
  prompt = '--กรุณาเลือก--',
  values,
  onValueChange,
  data,
  errors,
  touched
}) => {
  return (
    <View>
      <Text style={styles.pickerLabel}>
        {label}
        <Text style={styles.pickerRequireFieldLabel}>
          {showRequireSign ? '*' : ''}
        </Text>
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          mode="dialog"
          style={styles.pickerStyle}
          itemStyle={styles.pickerItemStyle}
          selectedValue={values}
          onValueChange={onValueChange}
        >
          <Picker.Item label={prompt} value={-1} key={-1} />
          {_.map(data, (item, index) => {
            return (
              <Picker.Item label={item.label} value={item.value} key={index} />
            );
          })}
        </Picker>
        <View style={styles.arrowWrapper}>
          <Text style={styles.arrow}>&#9660;</Text>
        </View>
      </View>
      <HelperText type="error" visible={!errors && touched}>
        {errors && touched && errors}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //padding: Constants.statusBarHeight,
    backgroundColor: 'white',
    width: 250
  },
  pickerLabel: { color: Colors.grayText, marginLeft: 10, paddingBottom: 3 },
  pickerRequireFieldLabel: { color: Colors.redText },
  pickerStyle: {
    //width: 200,
    height: 44,
    backgroundColor: '#F1F1F1',
    borderColor: 'red',
    borderBottomWidth: 2,
    flex: 90,
    marginLeft: 10
  },
  pickerItemStyle: {
    height: 44,
    color: 'red'
  },
  arrowWrapper: {
    backgroundColor: '#F1F1F1',
    flex: 10,
    height: 40,
    marginLeft: -28,
    justifyContent: 'center'
  },
  arrow: {
    textAlign: 'center',
    color: '#5A5A5A'
  }
});

export default FormPicker;
