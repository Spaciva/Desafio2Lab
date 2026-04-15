import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú Principal</Text>
      <Button title="Seleccionar Productos" onPress={() => navigation.navigate('Selection')} />
      <Button title="Historial de Compras" onPress={() => navigation.navigate('History')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center' },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20 }
});
