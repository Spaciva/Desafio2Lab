import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function OrderScreen({ route }) {
  const { order } = route.params;

  // Calcular total
  const total = order.reduce((sum, item) => sum + item.price, 0);

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20 },
  item: { marginBottom:10 },
  total: { fontSize:20, fontWeight:'bold', marginTop:20 }
});
