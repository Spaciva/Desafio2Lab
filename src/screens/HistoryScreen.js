import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadOrders = async () => {
    try {
      const stored = await AsyncStorage.getItem('orders');
      if (stored) setOrders(JSON.parse(stored));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrders();
    const unsubscribe = navigation.addListener('focus', loadOrders);
    return unsubscribe;
  }, [navigation]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const deleteOrder = async (index) => {
    try {
      const newOrders = orders.filter((_, i) => i !== index);
      await AsyncStorage.setItem('orders', JSON.stringify(newOrders));
      setOrders(newOrders);
      alert(' Orden eliminada');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📜 Historial de Compras</Text>
        <Text style={styles.subtitle}>{orders.length} órdenes registradas</Text>
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>No hay órdenes registradas</Text>
          <Text style={styles.emptySubText}>¡Haz tu primer pedido!</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateLabel}></Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
                <View style={styles.totalBadge}>
                  <Text style={styles.totalText}>${item.total.toFixed(2)}</Text>
                </View>
              </View>

              <View style={styles.itemsList}>
                {item.order.map((product, idx) => (
                  <View key={idx} style={styles.orderItem}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteOrder(index)}
              >
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          scrollEnabled={true}
        />
      )}
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#228B22'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  subtitle: {
    fontSize: 14,
    color: '#FFD700',
    marginTop: 8,
    fontWeight: 'bold'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 8
  },
  emptySubText: {
    fontSize: 14,
    color: '#666'
  },
  card: {
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#c41e3a',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4
  },
  cardHeader: {
    backgroundColor: '#228B22',
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  dateLabel: {
    fontSize: 18
  },
  date: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    maxWidth: '70%'
  },
  totalBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c41e3a'
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c2c2c'
  },
  itemsList: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  orderItem_last: {
    borderBottomWidth: 0
  },
  productName: {
    fontSize: 13,
    color: '#2c2c2c',
    flex: 1
  },
  productPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#c41e3a',
    marginLeft: 10
  },
  deleteButton: {
    backgroundColor: '#ffebee',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  deleteButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#c41e3a'
  }
});
