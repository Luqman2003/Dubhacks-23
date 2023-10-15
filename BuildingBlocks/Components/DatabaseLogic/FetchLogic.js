import { db } from '../../FirebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default async function fetchUserScores(uid) {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('User not found');
    }
  } catch(err) {
    alert('Failed to fetch scores: ' + err.message);
    return null;
  }
}