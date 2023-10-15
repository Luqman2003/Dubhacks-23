// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// const DropdownComponent = () => {
//   const [selectedValue, setSelectedValue] = useState('Daily');

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Dropdown / List</Text>

//       <Picker
//         selectedValue={selectedValue}
//         style={styles.picker}
//         onValueChange={(itemValue) => setSelectedValue(itemValue)}
//       >
//         <Picker.Item label="Daily" value="Daily" />
//         <Picker.Item label="Weekly" value="Weekly" />
//         <Picker.Item label="Monthly" value="Monthly" />
//       </Picker>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//   },
// });

// export default DropdownComponent;
