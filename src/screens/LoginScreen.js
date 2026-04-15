import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (user === 'admin' && password === '1234') {
      navigation.navigate('Menu');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Usuario" onChangeText={setUser} style={styles.input}/>
      <TextInput placeholder="Contraseña" secureTextEntry onChangeText={setPassword} style={styles.input}/>
      <Button title="Ingresar" onPress={handleLogin}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20 },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20 },
  input: { borderWidth:1, marginBottom:10, padding:10 }
});

