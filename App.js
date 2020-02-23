/**
 * Author : Sashank Pindiproli
 * Date: 19/02/2020
 * Description: This component is container for different components required for iMessage
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Image,
  TouchableHighlight
} from 'react-native';
import Status from './components/Status';
import MessageList from './components/Messages/MessageList';
import Toolbar from './components/Toolbar';
import ImageGrid from './components/Grid/ImageGrid';

import {
  createImageMessage,
  createTextMessage,
  createLocationMessage
} from './utils/MessageUtils';

export default function App() {
  const [messages, setMessages] = useState([
    createImageMessage('https://unsplash.it/300/300'),
    createTextMessage('Hello World'),
    createLocationMessage({
      latitude: 37.78825,
      longitude: -122.4324
    })
  ]);
  const [fullScreenImageId, setFullScreenImageId] = useState(null);

  const [inputFocused, setInputFocused] = useState(false);
  const onPressCamera = () => {};

  /**
   * onPressLocation is a helper function to share user location
   */
  const onPressLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const {
        coords: { latitude, longitude }
      } = position;

      setMessages([
        createLocationMessage({
          latitude,
          longitude
        }),
        ...messages
      ]);
    });
  };

  /**
   * handlePressImage is a helper function to share image and delete the image if they choose to
   */
  const handlePressImage = uri => {
    setMessages([createImageMessage(uri), ...messages]);
  };
  const handlePressMessage = ({ id, type }) => {
    switch (type) {
      case 'text':
        Alert.alert(
          'Delete Message?',
          'Are you sure you want to permanently delete this message?',
          [
            { text: 'Cancel', style: 'Cancel' },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                setMessages(messages.filter(message => message.id !== id));
              }
            }
          ]
        );
        break;
      case 'image':
        setFullScreenImageId(id);
        setInputFocused(false);
        break;
    }
  };

  /**
   * renderMessageList is a helper function to share message
   */
  const renderMessageList = () => {
    return (
      <View style={styles.content}>
        <MessageList messages={messages} onPressMessage={handlePressMessage} />
      </View>
    );
  };

  /**
   * renderInputMethodEditor is a wrapper for image grid
   */
  const renderInputMethodEditor = () => {
    return (
      <View style={styles.inputMethodEditor}>
        <ImageGrid onPressImage={uri => handlePressImage(uri)} />
      </View>
    );
  };

  const onSubmit = text => {
    text.length > 0
      ? setMessages([createTextMessage(text), ...messages])
      : null;
  };

  const handleChangeFocus = focus => {
    setInputFocused(focus);
  };

  const renderToolbar = () => {
    return (
      <View style={styles.toolbar}>
        <Toolbar
          isFocused={inputFocused}
          onPressCamera={onPressCamera}
          onPressLocation={onPressLocation}
          onSubmit={onSubmit}
          onChangeFocus={focus => handleChangeFocus(focus)}
        />
      </View>
    );
  };

  const dismissFullScreenImage = () => {
    setFullScreenImageId(null);
  };

  /**
   * renderFullScreenImage is a helper function to enlarge an image that has been shared
   */
  const renderFullScreenImage = () => {
    if (fullScreenImageId === null) return;

    const image = messages.find(message => message.id === fullScreenImageId);

    if (image === null) return;

    const { uri } = image;

    return (
      <TouchableHighlight
        style={styles.fullScreenOverlay}
        onPress={dismissFullScreenImage}
      >
        <Image style={styles.fullScreenImage} source={{ uri }} />
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <Status />
      {renderMessageList()}
      {renderInputMethodEditor()}
      {renderToolbar()}
      {renderFullScreenImage()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff'
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: '#fff'
  },
  toolbar: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: '#fff',
    height: 300
  },
  fullScreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2
  },
  fullScreenImage: {
    flex: 1,
    resizeMode: 'contain'
  }
});
