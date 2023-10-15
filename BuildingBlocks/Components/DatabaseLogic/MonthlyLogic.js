import { db } from '../../FirebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import { fetchUserScores } from './FetchLogic';

export default async function updateWeeklyScore(uid) {
  try {
      const response = fetchUserScores(uid);
      const numWeeks = response.num_weeks;
      const numDaily = response.num_daily;
      if (numDaily % 4 == 0 || numWeeks % 2 == 0) {
        const numMonths = response.num_months;
        const newScore = numMonths + 1;
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            num_months: newScore
        });
        await updateDoc(userRef, {
            num_weeks: 0,
            num_daily: 0
        });
        alert('Your number of months was updated successfully!');
      } else {
        alert('You need to do enough weeklies before adding a weekly!');
      }

  } catch (err) {
      alert('Failed to update daily score: ' + err.message);
  }
}