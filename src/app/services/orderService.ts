// src\app\services\orderService.ts
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, getDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../modules/firebase/firebase'; // Adjust path if needed

export interface OrderData {
  id?: string;
  userId?: string;
  customerInfo: {
    fullName: string;
    phone: string;
    address: string;
    note?: string;
  };
  cartItems: {
    productId: string;
    productTitle: string;
    productImage: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  paymentMethod: string;
  orderDate: any; // Firebase Timestamp
  status: string; // e.g., 'pending', 'completed', 'cancelled'
}

const addOrder = async (order: Omit<OrderData, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      orderDate: order.orderDate || serverTimestamp(),
      status: order.status || 'pending',
    });
    console.log("Order written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

const getOrders = async (): Promise<OrderData[]> => {
  try {
    const ordersCollectionRef = collection(db, 'orders');
    const q = query(ordersCollectionRef, orderBy('orderDate', 'desc'));
    const querySnapshot = await getDocs(q);
    const orders: OrderData[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      orders.push({
        id: docSnap.id,
        ...data
      } as OrderData);
    });
    return orders;
  } catch (e) {
    console.error("Error getting orders: ", e);
    throw e;
  }
};

const getOrderById = async (orderId: string): Promise<OrderData | null> => {
  try {
    const docRef = doc(db, 'orders', orderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return { id: docSnap.id, ...data } as OrderData;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting order by ID: ", e);
    throw e;
  }
};

const updateOrder = async (orderId: string, updatedOrder: Omit<OrderData, 'id'>) => {
  try {
    const orderDocRef = doc(db, 'orders', orderId);
    await setDoc(orderDocRef, { ...updatedOrder, updatedAt: serverTimestamp() }, { merge: true });
    console.log("Order updated successfully!");
  } catch (e) {
    console.error("Error updating order: ", e);
    throw e;
  }
};

const deleteOrder = async (orderId: string) => {
  try {
    const orderDocRef = doc(db, 'orders', orderId);
    await deleteDoc(orderDocRef);
    console.log("Order deleted successfully!");
  } catch (e) {
    console.error("Error deleting order: ", e);
    throw e;
  }
};

export const orderService = {
  addOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
}; 