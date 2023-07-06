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
      return 'lime'; 
    }
    if (message.includes('You defeated')) {
      return 'orangeRed'; 
    }
    if (message.includes('magic')) {
      return 'cyan';
    }
    if (message.includes('found')) {
      return 'gold';
    }
    if (message.includes('You dodged')) {
      return 'lightSkyBlue';
    }
    if (message.includes('critical')) {
      return 'Magenta';
    }
    if (message.includes('the enemy dodged')) {
      return 'pink';
    }
    if (message.includes('equipped')) {
      return 'lawnGreen';
    }
    if (message.includes('restore')) {
      return 'lawnGreen';
    }
    if (message.includes('You were defeated')) {
      return '#ff8989';
    }
    if (message.includes('noble')) {
      return '#ffa659';
    }
    if (message.includes('Project Dungeon')) {
      return '#00ff60';
    }
    return 'white';
  };

  export { useMessage, getMessageColor };
