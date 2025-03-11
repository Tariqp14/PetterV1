import { db } from "./firebase";
import { collection, addDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore";

export const saveExerciseData = async (data) => {
    try {
      await addDoc(collection(db, 'exercises'), {
        distance: data.distance,
        time: data.time,
        date: new Date(),
      });
      console.log('Exercise data saved!');
    } catch (error) {
      console.error('Error saving exercise data:', error);
    }
  };
  
  export const getRecentActivity = async () => {
    try {
      const q = query(
        collection(db, 'exercises'),
        orderBy('date', 'desc'),
        limit(1)
      );
      const snapshot = await getDocs(q);
  
      if (!snapshot.empty) {
        return snapshot.docs[0].data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      return null;
    }
  };
  
  export const getWeeklyData = async () => {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
      const q = query(
        collection(db, 'exercises'),
        where('date', '>=', oneWeekAgo)
      );
      const snapshot = await getDocs(q);
  
      const data = snapshot.docs.map((doc) => doc.data());
      console.log('Weekly data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching weekly data:', error);
      return [];
    }
  };