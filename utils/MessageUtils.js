let messageId = 0;

const getNextId = () => {
  messageId += 1;
  return messageId;
};

export const createTextMessage = text => {
  return {
    type: 'text',
    id: getNextId(),
    text
  };
};

export const createImageMessage = uri => {
  return {
    type: 'image',
    id: getNextId(),
    uri
  };
};

export const createLocationMessage = coordinate => {
  return {
    type: 'location',
    id: getNextId(),
    coordinate
  };
};
