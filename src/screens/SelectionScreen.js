import React, { useState } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';
import { products } from '../data/products';

export default function SelectionScreen({ navigation }) {
  const [order, setOrder] = useState([]);

  const addToOrder = (item) => {
    setOrder([...order, item]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tus productos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image}/>
            <Text>{item.name} - ${item.price}</Text>
            <Button title="Agregar" onPress={() => addToOrder(item)} />
          </View>
        )}
      />
      <Button title="Ver Orden" onPress={() => navigation.navigate('Order', { order })}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20 },
  card: { marginBottom:15 },
  image: { width:100, height:100, marginBottom:10 }
});
