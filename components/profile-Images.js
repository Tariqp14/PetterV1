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