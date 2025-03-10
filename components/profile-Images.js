import { auth, db } from '../config/firebase';
import { collection, getDocs, query, limit, where } from 'firebase/firestore';

// The selection of Profile Images and the matching Outline Image
export const AVATAR_OPTIONS = {
    greenShirt: {
      default: require('../images/Frame37.png'),
      outline: require('../images/Frame37Outline.png'),
    },
    yellowShirt: {
      default: require('../images/Frame38.png'),
      outline: require('../images/Frame38Outline.png'),
    },
    blackShirt: {
      default: require('../images/Frame39.png'),
      outline: require('../images/Frame39Outline.png'),
    }
  };
  
  // Profile Images that will be used for the user. Can change. 
  export let PROFILE_IMAGES = {
    DEFAULT: AVATAR_OPTIONS.greenShirt.default,
    OUTLINE: AVATAR_OPTIONS.greenShirt.outline,
  };
  
  // Function to update selected avatar
  export const setSelectedAvatar = (avatarType) => {
    if (AVATAR_OPTIONS[avatarType]) {
      PROFILE_IMAGES.DEFAULT = AVATAR_OPTIONS[avatarType].default;
      PROFILE_IMAGES.OUTLINE = AVATAR_OPTIONS[avatarType].outline;
      return true;
    }
    return false;
  };

  export const loadUserAvatar = async () => {
    if (!auth.currentUser) {
      console.log("No current user found");
      return false;
    }
    
    try {
      console.log("Attempting to load avatar for user:", auth.currentUser.uid);
      
      // tries to find the user's info document
      const userInfoQuery = query(
        collection(db, "users", auth.currentUser.uid, "user info"),
        limit(1)
      );
      // will pull whatever it finds 
      const querySnapshot = await getDocs(userInfoQuery);
      
      // checks to see if it found something (not empty)
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        console.log("User data retrieved:", userData);
        
        // If user has a selectedAvatar field, use it
        if (userData.selectedAvatar) {
          console.log("Found avatar:", userData.selectedAvatar);
          return setSelectedAvatar(userData.selectedAvatar);
        } else {
          console.log("No selectedAvatar field found in user data");
        }
      } else {
        console.log("No user info documents found");
      }
      return false;
    } catch (error) {
      console.log('Error loading avatar from Firebase:', error);
      return false;
    }
  };