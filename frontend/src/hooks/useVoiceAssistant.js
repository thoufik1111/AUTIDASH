import { useState, useEffect, useCallback } from 'react';
import { voiceCommands } from '../mock/dashboardData';

export const useVoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      setRecognition(recognitionInstance);
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, []);

  const speak = useCallback((text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  }, []);

  const processCommand = useCallback((command) => {
    const lowerCommand = command.toLowerCase();
    
    // Navigation commands
    if (voiceCommands.navigation.some(cmd => lowerCommand.includes(cmd))) {
      return { action: 'navigation', command: lowerCommand };
    }
    
    // Music commands
    if (voiceCommands.music.some(cmd => lowerCommand.includes(cmd))) {
      return { action: 'music', command: lowerCommand };
    }
    
    // Emergency commands
    if (voiceCommands.emergency.some(cmd => lowerCommand.includes(cmd))) {
      return { action: 'emergency', command: lowerCommand };
    }
    
    // Fuel commands
    if (voiceCommands.fuel.some(cmd => lowerCommand.includes(cmd))) {
      return { action: 'fuel', command: lowerCommand };
    }
    
    // Speed commands
    if (voiceCommands.speed.some(cmd => lowerCommand.includes(cmd))) {
      return { action: 'speed', command: lowerCommand };
    }
    
    // Call commands
    if (voiceCommands.call.some(cmd => lowerCommand.includes(cmd))) {
      return { action: 'call', command: lowerCommand };
    }
    
    // Media commands
    if (voiceCommands.media.some(cmd => lowerCommand.includes(cmd))) {
      return { action: 'media', command: lowerCommand };
    }
    
    // Theme commands
    if (voiceCommands.theme.some(cmd => lowerCommand.includes(cmd))) {
      return { action: 'theme', command: lowerCommand };
    }
    
    return { action: 'unknown', command: lowerCommand };
  }, []);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      setIsListening(false);
      recognition.stop();
    }
  }, [recognition, isListening]);

  useEffect(() => {
    if (recognition) {
      recognition.onresult = (event) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          setTranscript(finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, [recognition]);

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    speak,
    processCommand
  };
};