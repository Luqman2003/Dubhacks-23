// import { db } from '../../FirebaseConfig';
// import { doc, updateDoc } from "firebase/firestore";
// import { fetchUserScores } from './FetchLogic';

// export default async function updateWeeklyScore(uid) {
//   try {
//       const response = fetchUserScores(uid);
//       const numDaily = response.num_daily;
//       if (numDaily % 4 == 0) {
//         const newNumWeeks = response.num_weeks;
//         const newScore = newNumWeeks + 1;
//         const userRef = doc(db, 'users', uid);
//         await updateDoc(userRef, {
//             num_weeks: newScore
//         });
//         await updateDoc(userRef, {
//             num_daily: 0
//         })
//         alert('Your number of weeks was updated successfully!');
//       } else {
//         alert('You need to do enough dailies before adding a weekly!');
//       }

//   } catch (err) {
//       alert('Failed to update daily score: ' + err.message);
//   }
// }