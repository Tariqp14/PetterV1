import { db, auth } from "./firebase";
import { collection, addDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore";

export const saveExerciseData = async (data, petId) => {
    try {
      const userId = auth.currentUser.uid;
      const exerciseRef = collection(db, 'users', userId, 'pets', petId, 'exercises');
      await addDoc(exerciseRef, {
        distance: data.distance,
        time: data.time,
        date: new Date(),
      });
      console.log('Exercise data saved!');
    } catch (error) {
      console.error('Error saving exercise data:', error);
    }
  };

  export const getRecentActivity = async (petId) => {
  if (!petId) return null;
  const userId = auth.currentUser.uid;
  const q = query(
    collection(db, 'users', userId, 'pets', petId, 'exercises'),
    orderBy('date', 'desc'),
    limit(1)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty ? snapshot.docs[0].data() : null;
};

export const getWeeklyData = async (petId) => {
  if (!petId) return [];
  const userId = auth.currentUser.uid;
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const q = query(
    collection(db, 'users', userId, 'pets', petId, 'exercises'),
    where('date', '>=', oneWeekAgo)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};