import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Food products
const products = [
  { id: '1', name: 'Royal Canin Dog Food', description: 'Specially formulated for dogs.', rating: 4.8, price: '$50', image: 'images/dogfood.png' },
  { id: '2', name: 'Hill\'s Science Diet', description: '33 lb. Bag', rating: 4.7, price: '$45', image: 'https://images.hillspet.com/dog-food.jpg' },
  { id: '3', name: 'Purina Pro Plan', description: 'High protein formula for active dogs.', rating: 4.6, price: '$48', image: 'https://images.purina.com/dog-food.jpg' },
  { id: '4', name: 'Blue Buffalo Life Protection', description: 'Natural ingredients for your dog.', rating: 4.9, price: '$55', image: 'https://images.bluebuffalo.com/dog-food.jpg' },
  { id: '5', name: 'Orijen Original Dry Dog Food', description: 'Biologically appropriate food for dogs.', rating: 5.0, price: '$85', image: 'https://images.orijen.com/dog-food.jpg' },
  { id: '6', name: 'Taste of the Wild High Prairie', description: 'Grain-free dog food with roasted bison.', rating: 4.6, price: '$60', image: 'https://images.tasteofthewild.com/dog-food.jpg' },
  { id: '7', name: 'Merrick Grain-Free Texas Beef & Sweet Potato', description: 'Real beef is the first ingredient.', rating: 4.8, price: '$65', image: 'https://images.merrickpetcare.com/dog-food.jpg' },
  { id: '8', name: 'Wellness CORE Grain-Free Original Formula', description: 'High-protein dry dog food.', rating: 4.7, price: '$70', image: 'https://images.wellnesspetfood.com/dog-food.jpg' },
  { id: '9', name: 'Canidae PURE Limited Ingredient Dog Food', description: 'Simple recipes for sensitive dogs.', rating: 4.5, price: '$55', image: 'https://images.canidae.com/dog-food.jpg' },
  { id: '10', name: 'Wag Dog Treats', description: '(120 oz) bag', rating: 4.6, price: '$50', image: 'https://images.nutrish.com/dog-food.jpg' },
];

// Toys products
const toys = [
  { id : "1", name : "KONG Classic Dog Toy", description : "Durable rubber toy for chewing and play.", image : "https://cdn.shopify.com/s/files/1/0033/1627/0800/products/KONG_Classic_Toy_1_1024x1024@2x.png?v=1614260561" },
  { id : "2", name : "Nylabone DuraChew", description : "Long-lasting chew toy for aggressive chewers.", image : "https://cdn.shopify.com/s/files/1/0033/1627/0800/products/Nylabone_DuraChew_1_1024x1024@2x.png?v=1614260561" },
  { id : "3", name : "Petstages Dogwood Stick", description : "A safe alternative to real sticks for chewing.", image : "https://cdn.shopify.com/s/files/1/0033/1627/0800/products/Petstages_Dogwood_Stick_1_1024x1024@2x.png?v=1614260561" },
  { id : "4", name : "ZippyPaws Burrow Squeaky Toy", description : "Interactive toy with squeaky plush toys inside.", image : "https://cdn.shopify.com/s/files/1/0033/1627/0800/products/ZippyPaws_Burrow_Squeaky_Toy_1_1024x1024@2x.png?v=1614260561" },
  { id : "5", name : "Outward Hound Hide-A-Squirrel Puzzle Toy", description : "Fun puzzle toy that keeps pets entertained.", image : "https://cdn.shopify.com/s/files/1/0033/1627/0800/products/Outward_Hound_Hide_A_Squirrel_1_1024x1024@2x.png?v=1614260561" },
];

// Vets
const vets = [
  {
    id:'1',
    name:'Banfield Pet Hospital',
    address:'12345 Main St, Anytown, USA',
    rating:'4.8',
    image:'https://www.alamy.com/banfield-pet-hospital-in-snellville-metro-atlanta-georgia-usa-image504100823.html'
  },
  {
    id:'2',
    name:'VCA Animal Hospitals',
    address:'6789 Elm St, Anytown, USA',
    rating:'4.7',
    image:'https://vcahospitals.com/-/media/vca/images/hospitals/1802/1802-hospital-image-1.jpg'
  },
  {
    id:'3',
    name:'PetSmart Veterinary Services',
    address:'1010 Maple Ave, Anytown, USA',
    rating:'4.6',
    image:'https://pvshospitals.com/-/media/project/petsmartvet/pvs/images/hospitals/san-diego-sports-arena-143/san-diego-sports-arena-143-hero.jpg'
  },
  {
    id:'4',
    name:'Paws & Claws Animal Hospital',
    address:'2020 Oak St, Anytown, USA',
    rating:'5.0',
    image:'https://www.pawsclawsah.com/sites/default/files/styles/large/public/2022-08/paws-claws-animal-hospital-wilmington-nc-building.jpg'
  },
  {
    id:'5',
    name:'Happy Tails Veterinary Clinic',
    address:'3030 Pine St, Anytown, USA',
    rating:'4.9',
    image:'https://happytailsvetnj.com/wp-content/uploads/2020/04/happy-tails-veterinary-hospital-front-desk.jpg'
  },
];

export default function Products() {
  const [activeTab, setActiveTab] = useState('food');
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredItems = () => {
    if (activeTab === 'toys') return toys;
    if (activeTab === 'vet') return vets;
    return products;
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage}  />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.productRating}>{item.rating}</Text>
        <Text style={styles.reviewCount}>{Math.floor(Math.random() * 50000) + 1000}+</Text>
      </View>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  const renderVet = ({ item }) => (
    <View style={styles.vetContainer}>
      <View style={styles.vetDetails}>
        <Text style={styles.vetName}>{item.name}</Text>
        <Text style={styles.vetRating}>Rating: {item.rating}</Text>
        <Text style={styles.vetAddress}>{item.address}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.vetImage} />
    </View>
  );

  const renderGrid = () => {
    const items = getFilteredItems();
    return (
      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={items}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Products & Services</Text>
        <TouchableOpacity style={styles.profileIcon}>
          <Text style={styles.iconText}>👤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.petNameContainer}>
        <Text style={styles.petName}>Coco Mr Whiskers</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="filter-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.tabsContainer}>
        {['food', 'toys', 'vet'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView>
        {activeTab === 'vet' ? (
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={false}
            key={3}
            data={vets}
            renderItem={renderVet}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          renderGrid()
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileIcon: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  iconText: {
    fontSize: 20,
  },
  petNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  petName: {
    fontSize: 18,
    fontWeight: '600',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 12,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007BFF',
  },
  tabText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#fff',
  },
  listContainer: {
    alignItems: 'center',
  },
  productCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  productRating: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 3,
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
  vetDetails: {
    flex: 1,
    paddingRight: 10,
  },
  vetImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  vetName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  vetRating: {
    fontSize: 14,
  },
  vetAddress: {
    fontSize: 14,
    color: '#666',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});