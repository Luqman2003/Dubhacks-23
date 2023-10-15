// import { db } from '../../FirebaseConfig';
// import { doc, updateDoc } from "firebase/firestore";
// import fetchUserScores from './FetchLogic';
// export default async function updateDailyScore(uid) {
//   try {
//       const response = await fetchUserScores(uid);
//       let newNumDaily = response.num_daily;
//       let newScore = newNumDaily + 1;
//       const userRef = doc(db, 'users', uid);
//       await updateDoc(userRef, {
//           num_daily: newScore
//       });
//       alert('Daily score updated successfully.');
//   } catch (err) {
//       alert('Failed to update daily score: ' + err.message);
//   }
// }