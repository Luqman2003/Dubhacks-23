import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropdownComponent = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Daily', value: 'daily'},
    {label: 'Weekly', value: 'weekly'},
    {label: 'Monthly', value: 'monthly'},
  ]);

  const handleValueChange = (selectedValue) => {
    setValue(selectedValue);

    // Navigate based on selected value
    if (selectedValue == 'daily') {
      navigation.navigate('details');
      console.log('hello');
    } else if (selectedValue === 'banana') {
      navigation.navigate('BananaScreen');
    }
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={handleValueChange}
        setItems={setItems}
        containerStyle={styles.dropdownContainer}
        dropDownContainerStyle={styles.dropDownStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20, // Adjust this value if you want the dropdown to be even higher
    width: '100%',
  },
  dropdownContainer: {
    width: '70%',
  },
  dropDownStyle: {
    borderColor: 'gray',
    width: '100%',
  },
});


export default DropdownComponent;
