import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
      alert(' ¡Orden guardada en historial!');
      navigation.navigate('Selection');
    } catch (error) {
      console.log(error);
    }
  };

  const getItemCount = (productName) => {
    return order.filter(item => item.name === productName).length;
  };

  const uniqueItems = Array.from(new Map(
    order.map(item => [item.id, item])
  ).values());

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Tu Orden</Text>
        <Text style={styles.headerDecor}>🌮</Text>
      </View>

      <View style={styles.orderSummary}>
        <Text style={styles.itemCountText}>
           {order.length} artículos seleccionados
        </Text>
      </View>

      <ScrollView style={styles.itemsList}>
        {uniqueItems.map((item) => {
          const count = getItemCount(item.name);
          const itemTotal = item.price * count;
          return (
            <View key={item.id} style={[styles.item, item.type === 'food' ? styles.foodItem : styles.drinkItem]}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)} c/u</Text>
              </View>
              <View style={styles.itemQuantity}>
                <View style={styles.quantityBadge}>
                  <Text style={styles.quantityText}>x{count}</Text>
                </View>
                <Text style={styles.itemTotal}>${itemTotal.toFixed(2)}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.divider} />

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total a Pagar:</Text>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={saveOrder}
        >
          <Text style={styles.saveButtonText}> Guardar Orden</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f1e8',
    paddingHorizontal: 0
  },
  header: {
    backgroundColor: '#228B22',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#c41e3a'
  },
  backButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  headerDecor: {
    fontSize: 24
  },
  orderSummary: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 15,
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#c41e3a'
  },
  itemCountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c2c2c'
  },
  itemsList: {
    flex: 1,
    paddingHorizontal: 12
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderLeftWidth: 4
  },
  foodItem: {
    backgroundColor: '#fff8f0',
    borderColor: '#c41e3a',
    borderLeftColor: '#c41e3a'
  },
  drinkItem: {
    backgroundColor: '#e8f5ff',
    borderColor: '#228B22',
    borderLeftColor: '#228B22'
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 4
  },
  itemPrice: {
    fontSize: 12,
    color: '#666'
  },
  itemQuantity: {
    alignItems: 'flex-end'
  },
  quantityBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#c41e3a'
  },
  quantityText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c2c2c'
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#c41e3a'
  },
  divider: {
    height: 2,
    backgroundColor: '#228B22',
    marginVertical: 12
  },
  totalContainer: {
    backgroundColor: '#228B22',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 15,
    gap: 10
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#999'
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c2c2c'
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#FFD700',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#c41e3a'
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c2c2c'
  }
});
