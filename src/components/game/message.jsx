import { useEffect, useRef, useState } from 'react';

const useMessage = () => {
    const [message, setMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const ulRef = useRef(null);
  
    const updateMessage = (newMessage) => {
      setMessage(newMessage);
      setMessageHistory((prevHistory) => [...prevHistory, newMessage]);
    };
  
    useEffect(() => {
      if (ulRef.current) {
        const newestLi = ulRef.current.lastChild;
        if (newestLi) {
          newestLi.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [messageHistory]);
    return { message, messageHistory, updateMessage, ulRef };
};

const getMessageColor = (message) => {
    if (message.includes('Congratulations')) {
      return 'lime'; // Set the color to green for specific message
    }
    if (message.includes('You defeated')) {
      return 'orangeRed'; // Set the color to red for specific message
    }
    if (message.includes('magic')) {
      return 'cyan'; // Set the color to red for specific message
    }
    if (message.includes('found')) {
      return 'gold'; // Set the color to red for specific message
    }
    if (message.includes('You dodged')) {
      return 'lightSkyBlue'; // Set the color to red for specific message
    }
    if (message.includes('critical')) {
      return 'Magenta'; // Set the color to red for specific message
    }
    if (message.includes('the enemy dodged')) {
      return 'indianRed'; // Set the color to red for specific message
    }
    if (message.includes('equipped')) {
      return 'lawnGreen'; // Set the color to red for specific message
    }
    if (message.includes('restore')) {
      return 'lawnGreen'; // Set the color to red for specific message
    }
    // Set default color for other messages
    return 'white';
  };

  export { useMessage, getMessageColor };
