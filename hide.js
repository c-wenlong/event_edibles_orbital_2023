import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserInput = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Handle login logic
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="John Doe"
        value={username}
        onChangeText={text => setUsername(text)}
      />

      <Text style={styles.caption}>NUS Email</Text>
      <TextInput
        style={styles.input}
        placeholder="exxxxxxx@u.nus.edu"
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <Text style={styles.caption}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles.iconButton} onPress={togglePasswordVisibility}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Let's Go!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  caption: {
    fontFamily: 'montserrat-regular',
    fontSize: 14,
    textAlign: 'left',
    width: 300,
    marginBottom: 10,
  },
  input: {
    width: 300,
    height: 50,
    borderColor: 'rgba(211, 211, 211, 1)',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(140, 20, 252, 0.5)',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(211, 211, 211, 1)',
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 8,
    width: 300,
    height: 50,
    backgroundColor: 'white',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  iconButton: {
    paddingRight: 10,
  },
  button: {
    backgroundColor: 'rgba(140, 20, 252, 1)',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white'
  }
});

export default UserInput;
