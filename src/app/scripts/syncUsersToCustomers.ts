import { db } from '../modules/firebase/firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

async function syncUsersToCustomers() {
  const usersSnapshot = await getDocs(collection(db, 'users'));
  for (const userDoc of usersSnapshot.docs) {
    const userData = userDoc.data();
    const customerData = {
      name: (userData.firstName || '') + ' ' + (userData.lastName || ''),
      email: userData.email || '',
      phone: userData.phone || '',
      status: 'active',
      totalBookings: 0,
      totalSpent: 0,
      lastBooking: '',
    };
    await setDoc(doc(db, 'customers', userDoc.id), customerData);
    console.log(`Đã thêm customer cho user ${userData.email}`);
  }
  console.log('Đồng bộ hoàn tất!');
}

syncUsersToCustomers(); 