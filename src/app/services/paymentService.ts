import { db } from '../config/firebase';
import { collection, doc, getDocs, getDoc, updateDoc, query, where, orderBy, Timestamp, addDoc } from 'firebase/firestore';

export interface PaymentData {
  id: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentDate: Timestamp;
  customerInfo: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
  };
  bankName: string;
  accountNumber: string;
  accountName: string;
  transferContent: string;
}

class PaymentService {
  private readonly collectionName = 'payments';

  async getPayments(): Promise<PaymentData[]> {
    try {
      const paymentsRef = collection(db, this.collectionName);
      console.log("PaymentService.getPayments: Attempting to fetch from collection path:", paymentsRef.path);
      const querySnapshot = await getDocs(paymentsRef);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PaymentData[];
    } catch (error) {
      console.error('Error getting payments:', error);
      throw error;
    }
  }

  async getPaymentById(paymentId: string): Promise<PaymentData> {
    try {
      const paymentRef = doc(db, this.collectionName, paymentId);
      const paymentDoc = await getDoc(paymentRef);
      
      if (!paymentDoc.exists()) {
        throw new Error('Payment not found');
      }

      return {
        id: paymentDoc.id,
        ...paymentDoc.data()
      } as PaymentData;
    } catch (error) {
      console.error('Error getting payment by ID:', error);
      throw error;
    }
  }

  async updatePaymentStatus(paymentId: string, newStatus: string): Promise<void> {
    try {
      const paymentRef = doc(db, this.collectionName, paymentId);
      await updateDoc(paymentRef, {
        status: newStatus,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  }

  async addPayment(payment: Omit<PaymentData, 'id'>): Promise<string> {
    try {
      console.log("paymentService.addPayment: Received payment data:", payment);
      const paymentsRef = collection(db, this.collectionName);
      console.log("paymentService.addPayment: Attempting to add to collection path:", paymentsRef.path);
      const docRef = await addDoc(paymentsRef, {
        ...payment,
        paymentDate: payment.paymentDate || Timestamp.now(),
        status: payment.status || 'pending',
      });
      console.log("paymentService.addPayment: Payment added successfully with ID:", docRef.id, "at path:", docRef.path);
      return docRef.id;
    } catch (error) {
      console.error('paymentService.addPayment: Error adding payment:', error);
      throw error;
    }
  }

  async getPaymentsByOrderId(orderId: string): Promise<PaymentData[]> {
    try {
      const paymentsRef = collection(db, this.collectionName);
      const q = query(
        paymentsRef,
        where('orderId', '==', orderId),
        orderBy('paymentDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PaymentData[];
    } catch (error) {
      console.error('Error getting payments by order ID:', error);
      throw error;
    }
  }
}

export const paymentService = new PaymentService(); 