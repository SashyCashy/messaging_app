# Messaging App

This project is a messaging app (similar to iMessage) that will introduce some of the most basic APIs. It will allow us send text, send photos from the camera roll and share our location.

## Table of contents

- [General Info](#general-info)
- [Technologies](#technolgies)
- [API Source](#ap_source)
- [Setup](#setup)
- [App Structure](#directory)

## General Info

This project is an attempt to recreate messaging on the phone

## Technologies

Project is created with:

- React Native
- React
- Expo (https://expo.io/learn)
- Android SDK

## API Source

```
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

export const getImageFromId = id => `https://unsplash.it/${600}/${600}?image=${id}`
```

## Setup

### Install npm Packages

- npm install react package
- npm install react-native package
- npm install react-dom package
- npm install yarn
- npm install expo-cli --global

### Create expo project

```
$ expo init instagram-clone --template blank@sdk-34 --yarn
$ cd messaging_app
$ expo start
```

## App Structure

- [App.js](App.js)
- [Constants.js](Constants.js)
- [README.md](README.md)
- [app.json](app.json)
- [babel.config.js](babel.config.js)
- **components**
  - **Grid**
    - [ImageGrid.js](components/Grid/ImageGrid.js)
    - [index.js](components/Grid/index.js)
  - **Messages**
    - [MessageList.js](components/Messages/MessageList.js)
  - **Status**
    - [index.js](components/Status/index.js)
  - **Toolbar**
    - [ToolbarButton.js](components/Toolbar/ToolbarButton.js)
    - [index.js](components/Toolbar/index.js)
- [package.json](package.json)
- **utils**
  - [MessageUtils.js](utils/MessageUtils.js)

```

```
