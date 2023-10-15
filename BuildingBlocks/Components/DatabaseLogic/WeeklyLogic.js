import { db } from '../../FirebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import { fetchUserScores } from './FetchLogic';

export default async function updateWeeklyScore(uid) {
  try {
      const response = fetchUserScores(uid);
      const newNumWeeks = response.num_weeks;
      const newScore = newNumWeeks + 1;
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
          num_daily: newScore
      });
      alert('Your number of weeks was updated successfully!');
  } catch (err) {
      alert('Failed to update daily score: ' + err.message);
  }
}