import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderScreen({ route, navigation }) {
  const { order } = route.params;
  const total = order.reduce((sum, item) => sum + item.price, 0);

  const saveOrder = async () => {
    try {
      const existing = await AsyncStorage.getItem('orders');
      const orders = existing ? JSON.parse(existing) : [];
      const newOrders = [...orders, { order, total, date: new Date().toLocaleString() }];
      await AsyncStorage.setItem('orders', JSON.stringify(newOrders));
      alert('Orden guardada en historial');
      navigation.navigate('History');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu Orden</Text>
      <FlatList
        data={order}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - ${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      <Button title="Guardar Orden" onPress={saveOrder}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20 },
  item: { marginBottom:10 },
  total: { fontSize:20, fontWeight:'bold', marginTop:20 }
});
