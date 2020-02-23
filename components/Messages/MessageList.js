/**
 * Author : Sashank Pindiproli
 * Date: 17/02/2020
 * Description: This component is used to display an list of messages in iPhone or Android phone
 */

import React from 'react';

import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';
export default function MessagesList({ messages, onPressMessage }) {
  const messageObject = (text, uri, coordinate) => ({
    text: (
      <View style={styles.messageBubble}>
        <Text style={styles.text}>{text}</Text>
      </View>
    ),
    image: <Image style={styles.image} source={{ uri }} />,
    location: (
      <MapView
        style={styles.map}
        initialRegion={{
          ...coordinate,
          latitudeDelta: 0.08,
          longitudeDelta: 0.04
        }}
      >
        <MapView.Marker coordinate={coordinate} />
      </MapView>
    ),
    default: null
  });
  const renderMessageBody = ({
    type,
    text,
    uri,
    coordinate = { latitude: 0, longitude: 0 }
  }) => {
    return messageObject(text, uri, coordinate)[type];
  };
  const renderMessageItem = ({ item }) => {
    keyExtractor = item => item.id.toString();
    return (
      <View key={item.id} style={styles.messageRow}>
        <TouchableOpacity onPress={() => onPressMessage(item)}>
          {renderMessageBody(item)}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList
      style={styles.container}
      inverted
      data={messages}
      renderItem={renderMessageItem}
      keyboardShouldPersistTaps="handled"
      keyExtractor={({ id }) => id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible'
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 60
  },
  messageBubble: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(16,135,255)',
    borderRadius: 20
  },
  text: {
    fontSize: 18,
    color: 'white'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10
  },
  map: {
    width: 150,
    height: 150,
    borderRadius: 10
  }
});
