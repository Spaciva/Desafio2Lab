import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const stored = await AsyncStorage.getItem('orders');
        if (stored) setOrders(JSON.parse(stored));
      } catch (error) {
        console.log(error);
      }
    };
    loadOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Compras</Text>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Fecha: {item.date}</Text>
            <Text>Total: ${item.total.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20 },
  card: { marginBottom:15, padding:10, borderWidth:1, borderColor:'#ccc' }
});
