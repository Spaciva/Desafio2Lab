import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { products } from '../data/products';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SelectionScreen({ navigation }) {
  const [order, setOrder] = useState([]);
  const [productCounts, setProductCounts] = useState({});

  useEffect(() => {
    const loadProductCounts = async () => {
      try {
        const stored = await AsyncStorage.getItem('orders');
        if (stored) {
          const orders = JSON.parse(stored);
          const counts = {};
          orders.forEach(orderData => {
            orderData.order.forEach(item => {
              counts[item.id] = (counts[item.id] || 0) + 1;
            });
          });
          setProductCounts(counts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadProductCounts();
  }, []);

  const addToOrder = (item) => {
    setOrder([...order, item]);
  };

  const renderProduct = ({ item }) => {
    const previousOrders = productCounts[item.id] || 0;
    const isFood = item.type === 'food';
    
    return (
      <View style={[styles.card, isFood ? styles.foodCard : styles.drinkCard]}>
        <View style={styles.cardContent}>
          <Image source={item.image} style={styles.image}/>
          
          <View style={styles.textContainer}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            
            {previousOrders > 0 && (
              <View style={styles.orderCountBadge}>
                <Text style={styles.orderCountText}>
                  📦 Pedidos anteriores: {previousOrders}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity 
            style={[styles.addButton, isFood ? styles.addButtonFood : styles.addButtonDrink]}
            onPress={() => addToOrder(item)}
          >
            <Text style={styles.addButtonText}>➕</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerDecor}>🌮 🌶️ 🌮</Text>
        <Text style={styles.title}>Selecciona tus productos</Text>
        <Text style={styles.headerDecor}>🌮 🌶️ 🌮</Text>
      </View>

      {order.length > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>🛒 {order.length} items en tu orden</Text>
        </View>
      )}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        scrollEnabled={true}
      />

      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={[styles.viewOrderButton, order.length === 0 && styles.buttonDisabled]}
          onPress={() => navigation.navigate('Order', { order })}
          disabled={order.length === 0}
        >
          <Text style={styles.viewOrderButtonText}>
            {order.length > 0 ? `Ver Orden (${order.length})` : 'Selecciona productos'}
          </Text>
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
    backgroundColor: '#c41e3a',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#228B22'
  },
  headerDecor: {
    fontSize: 20,
    marginVertical: 5
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  cartBadge: {
    backgroundColor: '#228B22',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700'
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  card: {
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5
  },
  foodCard: {
    backgroundColor: '#fff8f0',
    borderColor: '#c41e3a'
  },
  drinkCard: {
    backgroundColor: '#e8f5ff',
    borderColor: '#228B22'
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: { 
    width: 90, 
    height: 90, 
    marginRight: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFD700'
  },
  textContainer: {
    flex: 1
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 4
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c41e3a',
    marginBottom: 6
  },
  orderCountBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#228B22'
  },
  orderCountText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2c2c2c'
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 2
  },
  addButtonFood: {
    backgroundColor: '#c41e3a',
    borderColor: '#8b1528'
  },
  addButtonDrink: {
    backgroundColor: '#228B22',
    borderColor: '#1a6b1a'
  },
  addButtonText: {
    fontSize: 24
  },
  footerContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 3,
    borderTopColor: '#228B22'
  },
  viewOrderButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#c41e3a'
  },
  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: '#ccc'
  },
  viewOrderButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2c2c'
  }
});
