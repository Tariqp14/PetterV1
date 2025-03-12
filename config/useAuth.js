//source for firebase auth https://youtu.be/idPGWpVLHP0
import { View, Text } from 'react-native';
import { auth } from '../config/firebase';
import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

export default function useAuth() {
    const [user, setUser] = React.useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            // console.log('got user', user);
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return unsub;
    }, []);

    return { user };


}