import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import * as Font from 'expo-font';
import MultipleChoiceSelector from './selector.js';
import UserInput from './userinput.js';

const App = () => {
  // import montserrat font
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      'montserrat-regular': require('./assets/Montserrat/static/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/Montserrat/static/Montserrat-Bold.ttf'),
      // Add other font styles if needed
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const handlePress = () => {
    Keyboard.dismiss();
  };

  return (
    //need to figure out how to implement TouchableW/O feedback
    <TouchableWithoutFeedback onPress={handlePress}>
      <ImageBackground source={require('./assets/poster.png')} style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.title1}> Register </Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.text}>
              Are you a ...
            </Text>
            <MultipleChoiceSelector />
            <UserInput />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop:0,
  },
  title1: {
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 65,
    fontFamily: 'montserrat-bold',
  },
  body: {
    flex: 6,
    width: "100%",
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: 'transparent',
    opacity:0.8,
  },
  text: {
    fontFamily: "montserrat-regular",
    fontSize: 20,
    textAlign: "left",
    width: 300,
    height: 60,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: 'rgba(211, 211, 211, 1)',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: 'rgba(140, 20, 252,0.7)',
  },
  button: {
    backgroundColor: 'rgba(140, 20, 252,1)',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: "100%"
  },
});


export default App;