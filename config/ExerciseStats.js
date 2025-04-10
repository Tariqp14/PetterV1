import { db, auth } from "./firebase";
import { collection, addDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore";

export const saveExerciseData = async (data) => {
    try {
        const userId = auth.currentUser.uid; // Get the current user's UID
        const exerciseRef = collection(db, 'users', userId, 'exercises'); // Reference to the user's exercises subcollection
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

export const getRecentActivity = async () => {
    try {
        const userId = auth.currentUser.uid; // Get the current user's UID
        const q = query(
            collection(db, 'users', userId, 'exercises'), // Reference to the user's exercises subcollection
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
        const userId = auth.currentUser.uid; // Get the current user's UID
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const q = query(
            collection(db, 'users', userId, 'exercises'),
            where('date', '>=', oneWeekAgo)
        );
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => doc.data());

        // If no data exists, initialize it with 0 for each day of the week
        if (data.length === 0) {
            return Array(7).fill(0); // Return an array of 0s (7 days of the week)
        }

        return data;
    } catch (error) {
        console.error('Error fetching weekly data:', error);
        return Array(7).fill(0); // Default to zero if an error occurs
    }
};