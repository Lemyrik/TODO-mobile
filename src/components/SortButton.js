import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SortButton = ({ sortBy, sortAsc, onSortChange }) => {
  const options = [
    { id: 'dateAdded', label: 'Date Added' },
    { id: 'status', label: 'Status' },
  ];

  
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.button,
            sortBy === option.id && styles.activeButton,
          ]}
          onPress={() => {
            if (sortBy === option.id) {
              onSortChange(option.id, !sortAsc);
            } else {
              onSortChange(option.id, false);
            }
          }}
        >
          <Text style={styles.buttonText}>{option.label}</Text>
          {sortBy === option.id && (
            <Icon
              name={sortAsc ? 'arrow-upward' : 'arrow-downward'}
              size={16}
              color="#6200ee"
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginRight: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeButton: {
    borderColor: '#6200ee',
    backgroundColor: '#f3e5f5',
  },
  buttonText: {
    marginRight: 5,
    color: '#333',
  },
});

export default SortButton;
