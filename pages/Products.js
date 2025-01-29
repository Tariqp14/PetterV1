import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
// Ionicons is a soruce for icons that can be just linked in the project instead of importing it as a jpg. - Alisa
import { Ionicons } from '@expo/vector-icons';

// Food products. Called it 'prodcuts' insttead of 'food' - Alisa 
// Each array of objects contains one product with description, rating, price, and its image - Alisa
const products = [
  { id: '1', name: 'Blue Buffalo Life Protection Formula', description: 'Helps Build and Maintain Strong Muscles, Beef & Brown Rice Recipe, 30-lb. Bag', rating: 4.6, price: '$69.98', image: 'https://m.media-amazon.com/images/I/81R8QsRTabL._AC_UL320_.jpg', link: 'https://www.amazon.com/Blue-Buffalo-Protection-Formula-Natural/dp/B000X91KI4' },
  { id: '2', name: 'Pedigree Complete Nutrition Adult Dry Dog Food', description: 'Grilled Steak & Vegetable Flavor, 18 lb. Bag', rating: 4.7, price: '$45', image: 'https://m.media-amazon.com/images/I/81cUsfXa6wL._AC_UL320_.jpg', link: 'https://www.amazon.com/PEDIGREE-Complete-Nutrition-Grilled-Vegetable/dp/B09RPL4Z4J' },
  { id: '3', name: 'Purina ONE Chicken and Rice Formula Dry Dog Food', description: '40 lb. Bag', rating: 4.7, price: '$58.99', image: 'https://m.media-amazon.com/images/I/719YSIMps7L._AC_UL320_.jpg', link: 'https://www.amazon.com/Purina-Smartblend-Natural-Chicken-Formula/dp/B073PCGRR2' },
  { id: '4', name: 'Purina Pro Plan Sensitive Skin and Stomach Dog Food', description: 'Adult Salmon & Rice Formula, Digestive Health - 30 lb. Bag', rating: 4.5, price: '$71.98', image: 'https://m.media-amazon.com/images/I/81cnlh1S7aL._AC_UL320_.jpg', link: 'https://www.amazon.com/Purina-Pro-Plan-Sensitive-Stomach/dp/B01EY9KQ2Y' },
  { id: '5', name: 'Purina Beneful Small Breed Wet Dog Food Variety Pack', description: 'IncrediBites With Real Beef, Chicken and Salmon - (Pack of 30) 3 Oz. Cans', rating: 4.7, price: '$25.30', image: 'https://m.media-amazon.com/images/I/81o9IU55A+L._AC_UL320_.jpg', link: 'https://www.amazon.com/Purina-Beneful-Variety-IncrediBites-Chicken/dp/B08S7QQXCX' },
  { id: '6', name: 'CESAR Adult Wet Dog Food Classic Loaf in Sauce Variety Pack', description: 'Beef Recipe, Filet Mignon, Grilled Chicken and Porterhouse Steak, Pack of 24', rating: 4.7, price: '$27.96', image: 'https://m.media-amazon.com/images/I/81vDEU0XWyL._AC_UL320_.jpg', link: 'https://www.amazon.com/Cesar-Cuisine-Grilled-Chicken-Porterhouse/dp/B008NHLZ2Y' },
  { id: '7', name: 'Pedigree High Protein Adult Dry Dog Food', description: 'Beef and Lamb Flavor Dog Kibble, 18 lb. Bag', rating: 4.6, price: '$20.98', image: 'https://m.media-amazon.com/images/I/81iFQ5Fjb6L._AC_UL320_.jpg', link: 'https://www.amazon.com/PEDIGREE-Protein-Adult-Flavor-Kibble/dp/B09RPJ11VT' },
  { id: '8', name: "Hill's Science Diet Sensitive Stomach & Skin Dry Dog Food", description: 'Chicken Recipe, 15 lb Bag', rating: 4.7, price: '$55.99', image: 'https://m.media-amazon.com/images/I/71uI4RAOboL._AC_UL320_.jpg', link: 'https://www.amazon.com/Science-Diet-Sensitive-Stomach-Chicken/dp/B01BKECERG' },
];
// Toy products
const toys = [
  { id: '1', name: 'Benebone Small 4-Pack Dog Chew Toys for Aggressive Chewers', description: 'Made in USA, 30lbs and Under', rating: 4.7, price: '$23.69', image: 'https://m.media-amazon.com/images/I/81RJyCaKL6L._AC_UL320_.jpg', link: 'https://www.amazon.com/Benebone-Holiday-Durable-Aggressive-Chewers/dp/B09DJGXWKW' },
  { id: '2', name: 'Best Pet Supplies Crinkle Dog Toy', description: 'No Stuffing Duck with Soft Squeaker, Yellow', rating: 4.4, price: '$5.99', image: 'https://m.media-amazon.com/images/I/61iLNIUwPnL._AC_UL320_.jpg', link: 'https://www.amazon.com/Best-Pet-Supplies-Stuffing-Squeaker/dp/B09BBM5CX8' },
  { id: '3', name: 'Vitscan Upgraded Goose Indestructible Dog Toys', description: 'Crinkle Squeaky Plush Dog Puppy Chew Toys for Teething', rating: 2.6, price: '$15.99', image: 'https://m.media-amazon.com/images/I/81qFBkq4DgL._AC_UL320_.jpg', link: 'https://www.amazon.com/Vitscan-Upgraded-Indestructible-Aggressive-Interactive/dp/B0BG8Q8R1Y' },
  { id: '4', name: 'Carllg Dog Chew Toys for Aggressive Chewers', description: 'Indestructible Tough Durable Squeaky Interactive Dog Toy', rating: 3.9, price: '$12.99', image: 'https://m.media-amazon.com/images/I/71KHlJw+8TL._AC_UL320_.jpg', link: 'https://www.amazon.com/Toothbrush-Interactive-Squeaky-Aggressive-Chewers/dp/B08NJJQ1KW' },
  { id: '5', name: 'Tough Dog Toys for Aggressive Chewers Large Breed', description: 'Bone Toy Nylon, Almost Indestructible', rating: 4.3, price: '$9.96', image: 'https://m.media-amazon.com/images/I/71tFDfkQUCL._AC_UL320_.jpg', link: 'https://www.amazon.com/Aggressive-Chewers-Kseroo-Durable-Indestructible/dp/B08TVRVZL1' },
  { id: '6', name: 'Chuckit! Ultra Duo Tug Dog Toy', description: 'Two Ultra Balls on a Durable Nylon Cord Handle, Orange and Blue', rating: 4.5, price: '$9.99', image: 'https://m.media-amazon.com/images/I/71DAtXe3L4L._AC_UL320_.jpg', link: 'https://www.amazon.com/Chuckit-Medium-Ultra-Duo-Tug/dp/B008APMO7O' },
  { id: '7', name: 'Dog Toys for Aggressive Chewers', description: 'Tough, Indestructible Dog Toys for Large, Medium, Small Breeds', rating: 4.0, price: '$11.99', image: 'https://m.media-amazon.com/images/I/71u4ICg71GL._AC_UL320_.jpg', link: 'https://www.amazon.com/Jeefome-Large-Toys-Aggressive-Chewers/dp/B0BHN7K52L' },
  { id: '8', name: 'Best Pet Supplies Interactive Bunny Buddy Dog Toy', description: 'Crinkle and Squeaky Enrichment, Cute and Plush Bunny (Gray)', rating: 4.4, price: '$8.99', image: 'https://m.media-amazon.com/images/I/81uBZynGXIL._AC_UL320_.jpg', link: 'https://www.amazon.com/Best-Pet-Supplies-Interactive-Enrichment/dp/B0CKY4WXGJ' },
];

//Grooming tools
const tools = [
  { id: '1', name: 'oneisall Grooming Set for Pets', description: ' Low Noise Rechargeable Cordless Electric Quiet Hair Clippers Set for Dogs Cats Pets', rating: 4.4, price: '$25.48', image: 'https://m.media-amazon.com/images/I/71UA8w5Y78L._AC_SX679_.jpg', link: 'https://www.amazon.com/ONEISALL-Cllippers-Rechargeable-Cordless-Electric/dp/B01HRSZRXM/ref=sr_1_1_sspa?crid=169O6OMCMOT0W&dib=eyJ2IjoiMSJ9.NgZ53jRb9C7IsL5dIotQO6i32U0oubO9lAtoY9WREzDlYKnGmIgYE-PT9UOiv4I07Z7W70Jxq1hTwn0pJu8DEAmkyFDt0yBPeVjSQNUE8pJmacyh7EPeZbtB5lYzjjSE90bpNMtqNKTB5SP3JgTkMU5qzxhKIJISWDcIzuhL7BbJ5CRvg9lPpJd04TmZpa_65ETLtYxoo_zwQVsZaK36vY_HjO8GsqvtNpbGovDkkFCKFaVh1vZARB-IU-03mtCuLZj0UvpM2KaNwWhRcGVaEf7e3JlKY4GhHDlhxLGbX-4.RczSl0kSsRxymEZI_dblhe7T4mkKb2nwQ41pI3yplLw&dib_tag=se&keywords=dog%2Bgrooming%2Btool&qid=1738185338&sprefix=dog%2Bgrooming%2Btool%2Caps%2C184&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1' },
  { id: '2', name: 'oneisall Pet Hair Vacuum & Dog Grooming Kit', description: '1.5L Dust Cup Dog Brush Vacuum with 7 Pet Grooming Tools for Shedding Pet Hair', rating: 4.6, price: '$99.99', image: 'https://m.media-amazon.com/images/I/71RIawma33L._AC_SX679_.jpg', link: 'https://www.amazon.com/oneisall-Grooming-Grinder-Shedding-Cleaning/dp/B0BHYZV3HY/ref=sr_1_8?crid=169O6OMCMOT0W&dib=eyJ2IjoiMSJ9.CBmO1ecvlFXsvpBqiFf8XHdWehZMabV9Oghv-wyVIZEPxYSjw_PjxoSeO2azy2eQqKhF8UktFBOBO46RKVfEk18QUbrgWk-8jeKJZvxXHJtAAwK-aVcjNzbg8DHD4sMI58hQOXjgua3fPb6_G5rNP2IUPO6wgENTjlCbBqOKimwyQQYMDZYoNYnDQaTleGz3cX4_d87kQQVey8YUpgDq-66aOHX_4fCowR3LmGmKMvmVrggDwrUEB-rfSh7adiv-rdTN5cbbuz6hsl8F6OM2LW_7OU4VeEWwkOwU-YZ-DU7kIm9ZQZLtX9N-VSADdoktSNa_srR77b0X__lMpo1gCpHbBKAZ7N8NSL6XTuW1_zvxhzhR19GVHbApbdSggb8NNphvOAutYIE5JXYzapdTsGWOYUBrqx9zdd0oBk_lpr65hIxkTCG2PtlSuM_lKysw.yfKF1QFV-pfaiznNWv7YX_RxoC4nTCa3p-wD-P00IpU&dib_tag=se&keywords=dog%2Bgrooming%2Btool&qid=1738187658&sprefix=dog%2Bgrooming%2Btool%2Caps%2C184&sr=8-8&th=1' },
  { id: '3', name: 'GLADOG Professional Dog Grooming Scissors Set', description: 'Set with Safety Round Tips, Sharp and Heavy-duty Pet Grooming Shears', rating: 4.5, price: '$19.99', image: 'https://m.media-amazon.com/images/I/81iArO0Zr6L._AC_SX679_.jpg', link: 'https://www.amazon.com/GLADOG-Professional-Grooming-Scissors-Upgraded/dp/B07ZN238CL/ref=sr_1_9?crid=169O6OMCMOT0W&dib=eyJ2IjoiMSJ9.CBmO1ecvlFXsvpBqiFf8XHdWehZMabV9Oghv-wyVIZEPxYSjw_PjxoSeO2azy2eQqKhF8UktFBOBO46RKVfEk18QUbrgWk-8jeKJZvxXHJtAAwK-aVcjNzbg8DHD4sMI58hQOXjgua3fPb6_G5rNP2IUPO6wgENTjlCbBqOKimwyQQYMDZYoNYnDQaTleGz3cX4_d87kQQVey8YUpgDq-66aOHX_4fCowR3LmGmKMvmVrggDwrUEB-rfSh7adiv-rdTN5cbbuz6hsl8F6OM2LW_7OU4VeEWwkOwU-YZ-DU7kIm9ZQZLtX9N-VSADdoktSNa_srR77b0X__lMpo1gCpHbBKAZ7N8NSL6XTuW1_zvxhzhR19GVHbApbdSggb8NNphvOAutYIE5JXYzapdTsGWOYUBrqx9zdd0oBk_lpr65hIxkTCG2PtlSuM_lKysw.yfKF1QFV-pfaiznNWv7YX_RxoC4nTCa3p-wD-P00IpU&dib_tag=se&keywords=dog%2Bgrooming%2Btool&qid=1738187658&sprefix=dog%2Bgrooming%2Btool%2Caps%2C184&sr=8-9&th=1' },
  { id: '4', name: 'Maxpower Planet Pet Grooming Rake', description: 'Extra-Wide Grooming Brush for Long Hair, Reduces Shedding 95%', rating: 4.6, price: '$9.99', image: 'https://m.media-amazon.com/images/I/811llCYuA0L._SX679_.jpg', link: 'https://www.amazon.com/Maxpower-Planet-Pet-Grooming-Brush/dp/B07P2N8HQH/ref=sr_1_10?crid=169O6OMCMOT0W&dib=eyJ2IjoiMSJ9.CBmO1ecvlFXsvpBqiFf8XHdWehZMabV9Oghv-wyVIZEPxYSjw_PjxoSeO2azy2eQqKhF8UktFBOBO46RKVfEk18QUbrgWk-8jeKJZvxXHJtAAwK-aVcjNzbg8DHD4sMI58hQOXjgua3fPb6_G5rNP2IUPO6wgENTjlCbBqOKimwyQQYMDZYoNYnDQaTleGz3cX4_d87kQQVey8YUpgDq-66aOHX_4fCowR3LmGmKMvmVrggDwrUEB-rfSh7adiv-rdTN5cbbuz6hsl8F6OM2LW_7OU4VeEWwkOwU-YZ-DU7kIm9ZQZLtX9N-VSADdoktSNa_srR77b0X__lMpo1gCpHbBKAZ7N8NSL6XTuW1_zvxhzhR19GVHbApbdSggb8NNphvOAutYIE5JXYzapdTsGWOYUBrqx9zdd0oBk_lpr65hIxkTCG2PtlSuM_lKysw.yfKF1QFV-pfaiznNWv7YX_RxoC4nTCa3p-wD-P00IpU&dib_tag=se&keywords=dog%2Bgrooming%2Btool&qid=1738187658&sprefix=dog%2Bgrooming%2Btool%2Caps%2C184&sr=8-10&th=1' },
  { id: '5', name: 'Dog Nail Trimming Kit', description: '3 Speeds, 2 Grinding Wheels', rating: 4.5, price: '$15.95', image: 'https://m.media-amazon.com/images/I/71hz7en4TYL._AC_SX679_.jpg', link: 'https://www.amazon.com/YABIFE-Trimmers-Clippers-Electric-Rechargeable/dp/B09XLGLX5G/ref=sr_1_17?crid=169O6OMCMOT0W&dib=eyJ2IjoiMSJ9.CBmO1ecvlFXsvpBqiFf8XHdWehZMabV9Oghv-wyVIZEPxYSjw_PjxoSeO2azy2eQqKhF8UktFBOBO46RKVfEk18QUbrgWk-8jeKJZvxXHJtAAwK-aVcjNzbg8DHD4sMI58hQOXjgua3fPb6_G5rNP2IUPO6wgENTjlCbBqOKimwyQQYMDZYoNYnDQaTleGz3cX4_d87kQQVey8YUpgDq-66aOHX_4fCowR3LmGmKMvmVrggDwrUEB-rfSh7adiv-rdTN5cbbuz6hsl8F6OM2LW_7OU4VeEWwkOwU-YZ-DU7kIm9ZQZLtX9N-VSADdoktSNa_srR77b0X__lMpo1gCpHbBKAZ7N8NSL6XTuW1_zvxhzhR19GVHbApbdSggb8NNphvOAutYIE5JXYzapdTsGWOYUBrqx9zdd0oBk_lpr65hIxkTCG2PtlSuM_lKysw.yfKF1QFV-pfaiznNWv7YX_RxoC4nTCa3p-wD-P00IpU&dib_tag=se&keywords=dog%2Bgrooming%2Btool&qid=1738187658&sprefix=dog%2Bgrooming%2Btool%2Caps%2C184&sr=8-17&th=1' },
  { id: '6', name: 'Swihauk Self Cleaning Slicker Brush', description: '3 Speeds, 2 Grinding Wheels', rating: 4.6, price: '$12.99', image: 'https://m.media-amazon.com/images/I/61B-7qGE7eL._SX679_.jpg', link: 'https://www.amazon.com/Swihauk-Cleaning-Friendly-Grooming-Deshedding/dp/B0CLLPVZRV/ref=sr_1_20_sspa?crid=169O6OMCMOT0W&dib=eyJ2IjoiMSJ9.CBmO1ecvlFXsvpBqiFf8XHdWehZMabV9Oghv-wyVIZEPxYSjw_PjxoSeO2azy2eQqKhF8UktFBOBO46RKVfEk18QUbrgWk-8jeKJZvxXHJtAAwK-aVcjNzbg8DHD4sMI58hQOXjgua3fPb6_G5rNP2IUPO6wgENTjlCbBqOKimwyQQYMDZYoNYnDQaTleGz3cX4_d87kQQVey8YUpgDq-66aOHX_4fCowR3LmGmKMvmVrggDwrUEB-rfSh7adiv-rdTN5cbbuz6hsl8F6OM2Lap-13NaqOsAD6xejAOMu9U.TCgIU_qDIamWvWisQ4UrXqFAKxEb4TAi1scWdGKb9QU&dib_tag=se&keywords=dog%2Bgrooming%2Btool&qid=1738187658&sprefix=dog%2Bgrooming%2Btool%2Caps%2C184&sr=8-20-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&th=1' },
];

// Vets
const vets = [
  { id: '1', name: 'Veterinary Emergency Group', address: '1490 W Fairbanks Ave, Winter Park, FL 32789', rating: 4.8, image: 'https://media.yourobserver.com/img/photos/2023/10/06/KK2_t1100.jpg?31a214c4405663fd4bc7e33e8c8cedcc07d61559', link: 'https://maps.app.goo.gl/ejNPM2kgTPudwGLE8' },
  { id: '2', name: 'NewDay Veterinary Care', address: '7107 Palm Pkwy, Orlando, FL 32836', rating: 4.7, image: 'https://s3-media0.fl.yelpcdn.com/bphoto/jXxhg10P-k57VYMAPoUMQQ/348s.jpg', link: 'https://maps.app.goo.gl/9rqmbmmibsyiNQgU7' },
  { id: '3', name: '4 Paws Animal Clinic', address: '700 Clay St, Winter Park, FL 32789', rating: 4.9, image: 'https://www.fpvs.net/uploads/5/1/9/2/51924503/2032078.jpg?840', link: 'https://maps.app.goo.gl/MepNGx6gb1Kxi34k7' },
  { id: '4', name: 'Kirkman Road Veterinary Clinic', address: '38 S Kirkman Rd, Orlando, FL 32811', rating: 4.8, image: 'https://orlandostylemagazine.com/wp-content/uploads/2021/03/kirkman-scaled.jpg', link: 'https://maps.app.goo.gl/J1YqvJLC6VBYufRc6' },
  { id: '5', name: '24/7 Animal Hospital of Orlando', address: '8742 White Rd, Orlando, FL 32818', rating: 4.3, image: 'https://cdcssl.ibsrv.net/ibimg/smb/2790x1500_80/webmgr/22/b/5/home-del-mar-1/banner_3.jpg.webp?d9a8ba94275a690afcff4939f55a1a15', link: 'https://www.google.com/maps/place/24%2F7+Animal+Hospital+of+Orlando/@28.5624807,-81.5757435,13z/data=!4m6!3m5!1s0x88e77871c43e3d2f:0x6a2ea917b4e0d116!8m2!3d28.5624807!4d-81.5057057!16s%2Fg%2F1tdc613c?entry=ttu&g_ep=EgoyMDI1MDEyNi4wIKXMDSoASAFQAw%3D%3D' },
];

// Products function
// activeTab is Food products by default since it is the first one that displays when the Product Page is opened - Alisa
export default function Products() {
  const [activeTab, setActiveTab] = useState('food');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [favoritesMode, setFavoritesMode] = useState(false);
  const [selectedPet, setSelectedPet] = useState('Coco');
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);


  const [is24HoursOpen, setIs24HoursOpen] = useState(false);
  const [isWeekendOpen, setIsWeekendOpen] = useState(false);
  const [isOpen7Days, setIsOpen7Days] = useState(false);
  const [isPrivateClinic, setIsPrivateClinic] = useState(false);
  const [isPublicClinic, setIsPublicClinic] = useState(false);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toys, vets, etc. tabs. Will need to add more product types (tabs) that we want to display. - Alisa
  const getFilteredItems = () => {
    // activeTab is the tab that is displayed currently (when pressed)
    // 
    const items = activeTab === 'toys' ? toys : activeTab === 'vet' ? vets : activeTab === 'tools' ? tools : products;
    return favoritesMode
      ? items.filter((item) => favorites.includes(item.id)) 
      : items.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
  };

   // Render function for products - food tab
  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name={i < Math.floor(item.rating) ? 'star' : 'star-outline'}
              size={16}
              color="#FFD700"
            />
          ))}
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
      {/* TouchableOpacity is a wrapper. On press down, the opacity of the wrapped view is decreased, dimming it. - Alisa */}
      <TouchableOpacity
        onPress={() => toggleFavorite(item.id)}
        style={styles.favoriteIcon}
      >
        <Ionicons
          name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
          size={20}
          color={favorites.includes(item.id) ? 'red' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );

  // Render function for vet tab
  const renderVet = ({ item }) => (
    <View style={styles.vetContainer}>
     
      <View style={styles.vetDetails}>
        <Text style={styles.vetName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name={i < Math.floor(item.rating) ? 'star' : 'star-outline'}
              size={16}
              color="#FFD700"
            />
          ))}
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <Text style={styles.vetAddress}>{item.address}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.vetImage} />
        <TouchableOpacity
          onPress={() => toggleFavorite(item.id)}
          style={styles.favoriteIcon}
        >
          <Ionicons
            name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
            size={20}
            color={favorites.includes(item.id) ? 'red' : 'black'}
          />
        </TouchableOpacity>
    </View>
  );

  // Page filters (for filtering prodcuts) - will fix those to match products vs. services requirements - Alisa
  // Used AI (https://venice.ai) to help me create the filter 
  return (
    <View style={styles.container}>
     <View style={styles.topBar}>
     <Modal
        visible={isSettingsModalVisible}
        transparent={true}
        animationType="slide"
      >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsSettingsModalVisible(false)}>
              <Ionicons name="close-circle-outline" size={24} color="black" />
            </TouchableOpacity>
            {/* TouchableOpacity function reduces opacity of the page when the filter is opened. AKA when the user touches the wrapped component, opacity of the view is reduced - Alisa */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Location</Text>
              <TouchableOpacity style={styles.locationButton}>
                <Ionicons name="locate-outline" size={20} color="black" />
                <Text style={styles.locationButtonText}>My current location</Text>
              </TouchableOpacity>
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownLabel}>Country</Text>
                <TextInput style={styles.dropdownInput} placeholder="Select" />
              </View>
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownLabel}>Zip code/Postal code</Text>
                <TextInput style={styles.dropdownInput} placeholder="Type..." />
              </View>
            </View>

            <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Hours</Text>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity 
                style={styles.checkbox} 
                onPress={() => setIs24HoursOpen(!is24HoursOpen)} 
              >
                {is24HoursOpen && <Ionicons name="checkmark-outline" size={20} color="green" /> } 
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Open 24 hours</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity 
                style={styles.checkbox} 
                onPress={() => setIsWeekendOpen(!isWeekendOpen)} 
              >
                {isWeekendOpen && <Ionicons name="checkmark-outline" size={20} color="green" /> } 
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Open on weekends</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity 
                style={styles.checkbox} 
                onPress={() => setIsOpen7Days(!isOpen7Days)} 
              >
                {isOpen7Days && <Ionicons name="checkmark-outline" size={20} color="green" /> } 
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Open 7 days a week</Text>
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Ownership Type</Text>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity 
                style={styles.checkbox} 
                onPress={() => setIsPrivateClinic(!isPrivateClinic)} 
              >
                {isPrivateClinic && <Ionicons name="checkmark-outline" size={20} color="green" /> } 
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Private clinics</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity 
                style={styles.checkbox} 
                onPress={() => setIsPublicClinic(!isPublicClinic)} 
              >
                {isPublicClinic && <Ionicons name="checkmark-outline" size={20} color="green" /> } 
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Public/Corporate clinics</Text>
            </View>
          </View>

          {/* Filters button */}
            <TouchableOpacity style={styles.viewResultsButton}>
              <Text style={styles.viewResultsButtonText} onPress={() => setIsSettingsModalVisible(false)}>View results</Text>
            </TouchableOpacity>
        </View>
      </Modal>
      {/* Page title */}
      <Text style={styles.title}>Products & Services</Text>
      <TouchableOpacity>
        {/*  */}
        <Image
          source={{
            // Changed Samantha's profile image to match the pet on file- Alisa
            uri: 'https://images.pexels.com/photos/7210691/pexels-photo-7210691.jpeg'
          }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
    <View style={styles.petSelector}>
    <View style={styles.petsContainer}>
      {/* Tabs for different pets */}
      {['Coco', 'Mr Whiskers'].map((pet) => (
        <TouchableOpacity
          key={pet}
          onPress={() => setSelectedPet(pet)}
          style={[styles.petButton, selectedPet === pet && styles.activePetButton]}
        >
          <Text style={[styles.petText, selectedPet === pet && styles.activePetText]}>
            {pet}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.iconsContainer}>
    <TouchableOpacity onPress={() => setFavoritesMode(!favoritesMode)}>
      {/* Heart Icon for favoritet products aka favoritesMode - Alisa */}
      <Ionicons
        name={favoritesMode ? 'heart' : 'heart-outline'}
        size={24}
        color="black"
      />
    </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsSettingsModalVisible(true)}>
          {/* Filters icon for filtering prodcuts */}
          <Ionicons name="filter-outline" size={24} color="black" />
        </TouchableOpacity>
    </View>
  </View>

      {/* Search bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {/* Map function takes each value (info) from array of 'toys'/'food'/'vet' and renders (look render functions) them - displays on the screen - Alisa  */}
      <View style={styles.tabsContainer}>
        {['food', 'toys', 'tools', 'vet'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)} 
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={getFilteredItems()}
        renderItem={activeTab === 'vet' ? renderVet : renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={activeTab === 'vet' ? 1 : 2}
        key={activeTab}
        columnWrapperStyle={activeTab === 'vet' ? null : styles.row}
        contentContainerStyle={styles.listContainer}
      />
      <StatusBar style="auto" />
    </View>
  );
}

// Page styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    borderRadius: 20,
    paddingVertical: 12,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#388E3C',
  },
  tabText: {
    fontSize: 14,
    color: '#388E3C', 
  },
  activeTabText: {
    color: 'white',
  },
  
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    flex: 1,
    marginHorizontal: 5,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  productInfo: {
    marginTop: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    padding: 5, 
    borderRadius: 20, 
  },
  vetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  vetImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  vetDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  vetName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vetRating: {
    fontSize: 14,
  },
  vetAddress: {
    fontSize: 12,
    paddingTop: 5,
    color: '#666',
  },
  petSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  petsContainer: {
    flexDirection: 'row',
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  petButton: {
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activePetButton: {
    borderBottomColor: 'green',
  },
  petText: {
    fontSize: 16,
    color: 'black',
  },
  activePetText: {
    fontWeight: 'bold',
    color: 'black',
  },
  topBarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, 
  },  
  modalContainer: {
    minHeight: '100%',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    minHeight: '100%',
    backgroundColor: 'white',
    marginTop: 35,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  locationButtonText: {
    marginLeft: 5,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdownLabel: {
    marginBottom: 5,
  },
  dropdownInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: 'green',
    borderRadius: 2,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  viewResultsButton: {
    backgroundColor: '#388E3C',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewResultsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12, 
    height: 12, 
    borderRadius: 3, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#388E3C',
  },
  checkmark: {
    position: 'absolute',
    top: 0,
    left: 0, 
    width: 12, 
    height: 12, 
  },
});