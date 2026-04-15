import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú Principal</Text>
      <Text>Selecciona Alimentos y Bebidas</Text>
      <Button title="Ir a Selección" onPress={() => navigation.navigate('Selection')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center' },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20 }
});
