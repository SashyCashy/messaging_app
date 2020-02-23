/**
 * Author : Sashank Pindiproli
 * Date: 17/02/2020
 * Description: This component displays toolbar buttons
 */

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
export default function ToolbarButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    top: -2,
    marginRight: 12,
    fontSize: 20,
    color: 'grey'
  }
});
