import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet, Picker, Keyboard, Alert } from 'react-native';
import { Formik } from 'formik';
import { Text, Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { ContractStatus, ContractType, PropertyType } from '../../constants';
import Colors from '../../constants/Colors';
import { HeaderText } from '../StyledText';
import { NormalIcon } from '../Icon';
import FormPicker from '../../components/formComponent/FormPicker';
import FormInput from '../../components/formComponent/FormInput';
import FormInputNumber from '../../components/formComponent/FormInputNumber';
import FormDatePicker from '../../components/formComponent/FormDatePicker';

class ContractForm extends Component {
  renderHeader(title, icon, bgColor) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: bgColor,
          height: 50
        }}
      >
        <NormalIcon name={icon} color="#FFF" />
        <HeaderText style={styles.headerText} size="2.8" color="#FFF">
          {title}
        </HeaderText>
      </View>
    );
  }

  renderMainDetail(values, handleChange, errors, touched, setFieldValue) {
    return (
      <View style={styles.content}>
        {this.renderHeader('รายละเอียด', 'info', Colors.blueBackground)}
        <FormPicker
          label="สถานะ"
          showRequireSign
          values={values.status}
          onValueChange={(itemValue, itemIndex) => {
            setFieldValue('status', itemValue);
          }}
          data={ContractStatus}
          errors={errors.status}
          touched={touched.status}
        />
        <FormPicker
          label="ประเภท"
          showRequireSign
          values={values.type}
          onValueChange={(itemValue, itemIndex) => {
            setFieldValue('type', itemValue);
          }}
          data={PropertyType}
          errors={errors.type}
          touched={touched.type}
        />
        <FormInput
          label="ชื่อหลักทรัพย์"
          placeholder="ชื่อหลักทรัพย์"
          showRequireSign
          onChangeText={handleChange('title')}
          value={values.title}
          errors={errors.title}
          touched={touched.title}
        />
        <FormInput
          label="รายละเอียด"
          placeholder="รายละเอียด"
          onChangeText={handleChange('description')}
          value={values.description}
          numberOfLines={1}
          multiline={true}
          errors={errors.description}
          touched={touched.description}
        />
        <FormPicker
          label="สัญญา"
          showRequireSign
          values={values.pact}
          onValueChange={(itemValue, itemIndex) => {
            setFieldValue('pact', itemValue);
          }}
          data={ContractType}
          errors={errors.pact}
          touched={touched.pact}
        />
        <FormInputNumber
          label="มูลค่า"
          placeholder="มูลค่า"
          showRequireSign
          onChangeText={handleChange('value')}
          value={values.value}
          errors={errors.value}
          touched={touched.value}
        />
        <FormDatePicker
          label="วันที่เริ่มสัญญา"
          placeholder="DD/MM/YYYY"
          showRequireSign
          onDateChange={date => {
            setFieldValue('beginDate', date);
          }}
          values={values.beginDate}
          errors={errors.beginDate}
          touched={touched.beginDate}
        />
        <FormDatePicker
          label="วันที่สิ้นสุด"
          placeholder="DD/MM/YYYY"
          onDateChange={date => {
            setFieldValue('closeDate', date);
          }}
          values={values.closeDate}
          errors={errors.closeDate}
          touched={touched.closeDate}
        />
      </View>
    );
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{ type: -1, status: -1, contractActions: [{isCompleted: false, _id: "5cb566dfc263e11c44ef2d6d", type: "นัดต่อสัญญา", description: "", dueDate: "17/01/2019"}, {isCompleted: false, _id: "5cb566dfc263e11c44ef2d6d", type: "นัดต่อสัญญา", description: "", dueDate: "17/01/2019"}] }}
          onSubmit={values => {
            console.log(values);
            Alert.alert(JSON.stringify(values, null, 2));
            Keyboard.dismiss();
          }}
          validate={values => {
            // same as above
            let errors = {};
            return errors;
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
          }) => {
            
            return <View>
              {this.renderMainDetail(
                values,
                handleChange,
                errors,
                touched,
                setFieldValue
              )}

              <Button onPress={handleSubmit} style={styles.button}>
                บันทึก
              </Button>
            </View>
          }}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5
  },
  content: {},
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //padding: Constants.statusBarHeight,
    backgroundColor: 'white',
    width: 280
  },
  pickerLabel: { color: Colors.grayText },
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
  },
  button: {
    marginTop: 16
  }
});

export default ContractForm;

/**/
