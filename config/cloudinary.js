import { Cloudinary } from '@cloudinary/url-gen';

// Initializes Cloudinary with cloud name
// This is for using Cloudinary's SDK
// Not being used yet. Need to look into it. It seems like it can streamline some processes but the implementation is more complex. 
export const cld = new Cloudinary({
  cloud: {
    cloudName: 'petterapp' 
  }
});