import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
 StyleSheet,
 Text,
 View,
 FlatList,
 Image,
 TouchableOpacity,
 ScrollView,
 TextInput,
 Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { Linking } from "react-native";

export default function Products() {
 // States for pet profiles, products, tabs, search and favorites
 const [pets, setPets] = useState([]);
 const [selectedPet, setSelectedPet] = useState(null);
 const [dynamicProducts, setDynamicProducts] = useState([]);
 const [activeTab, setActiveTab] = useState("food");
 const [searchQuery, setSearchQuery] = useState("");
 const [favorites, setFavorites] = useState([]);
 const [favoritesMode, setFavoritesMode] = useState(false);
 const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

 // Filtering for products
 const [sortBy, setSortBy] = useState("best match");
 const [selectedFlavors, setSelectedFlavors] = useState([]);
 const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);
 const [isSortByExpanded, setIsSortByExpanded] = useState(false);
 const [isFlavorExpanded, setIsFlavorExpanded] = useState(false);
 const [isFoodTypeExpanded, setIsFoodTypeExpanded] = useState(false);

 // Filtering for vets
 const [is24HoursOpen, setIs24HoursOpen] = useState(false);
 const [isWeekendOpen, setIsWeekendOpen] = useState(false);
 const [isOpen7Days, setIsOpen7Days] = useState(false);
 const [isPrivateClinic, setIsPrivateClinic] = useState(false);
 const [isPublicClinic, setIsPublicClinic] = useState(false);

 // Function for clearing product filters ('clear all' button)
 const clearAllFilters = () => {
 setSortBy("best match");
 setSelectedFlavors([]);
 setSelectedFoodTypes([]);
 setIsSortByExpanded(false);
 setIsFlavorExpanded(false);
 setIsFoodTypeExpanded(false);
 };

 // Function to clear vet-specific filters
 const clearVetFilters = () => {
 setIs24HoursOpen(false);
 setIsWeekendOpen(false);
 setIsOpen7Days(false);
 setIsPrivateClinic(false);
 setIsPublicClinic(false);
 };

 // Fetches pet profiles from Firestore
 useEffect(() => {
 if (auth.currentUser) {
 const petsRef = collection(db, "users", auth.currentUser.uid, "pets");
 const unsubscribe = onSnapshot(petsRef, (snapshot) => {
 const petProfiles = [];
 snapshot.forEach((doc) => {
 petProfiles.push({ id: doc.id, ...doc.data() });
 });
 setPets(petProfiles);
 if (!selectedPet && petProfiles.length > 0) {
 setSelectedPet(petProfiles[0]);
 }
 });
 return () => unsubscribe();
 }
 }, [auth.currentUser]);

 // Query products from Firestore based on the active category and pet type
 useEffect(() => {
 let q;
 if (activeTab !== "vet" && activeTab !== "tools") {
 let petType = "dog";
 if (selectedPet && selectedPet.petType) {
 petType = selectedPet.petType.toLowerCase();
 }
 q = query(
 collection(db, "products"),
 where("category", "==", activeTab),
 where("petType", "==", petType)
 );
 } else {
 // This shows all products in the given categoryr for vets and products - Alisa L.
 q = query(collection(db, "products"), where("category", "==", activeTab));
 }
 const unsubscribe = onSnapshot(q, (snapshot) => {
 const items = [];
 snapshot.forEach((doc) => {
 items.push({ id: doc.id, ...doc.data() });
 });
 setDynamicProducts(items);
 });
 return () => unsubscribe();
 }, [activeTab, selectedPet]);

 // Filtering Logic
 const getFilteredItems = () => {
 let items = [...dynamicProducts];

 // Filter by search query - if provided
 if (searchQuery.trim().length > 0) {
 items = items.filter((item) =>
 item.name.toLowerCase().includes(searchQuery.toLowerCase())
 );
 }

 // Filter by favorites - if favoritesMode is active
 if (favoritesMode) {
 items = items.filter((item) => favorites.includes(item.id));
 }

 if (activeTab !== "vet") {
 // Applying product filters
 if (selectedFlavors.length > 0) {
 items = items.filter(
 (item) =>
 item.flavor && selectedFlavors.includes(item.flavor.toLowerCase())
 );
 }
 if (selectedFoodTypes.length > 0) {
 items = items.filter(
 (item) =>
 item.foodType &&
 selectedFoodTypes.includes(item.foodType.toLowerCase())
 );
 }
 if (sortBy === "lowest price") {
 items.sort((a, b) => {
 const aPrice = a.price ? parseFloat(a.price.replace(/[^0-9.]/g, "")) : 0;
 const bPrice = b.price ? parseFloat(b.price.replace(/[^0-9.]/g, "")) : 0;
 return aPrice - bPrice;
 });
 } else if (sortBy === "highest price") {
 items.sort((a, b) => {
 const aPrice = a.price ? parseFloat(a.price.replace(/[^0-9.]/g, "")) : 0;
 const bPrice = b.price ? parseFloat(b.price.replace(/[^0-9.]/g, "")) : 0;
 return bPrice - aPrice;
 });
 } else if (sortBy === "most popular") {
 items.sort((a, b) => b.rating - a.rating);
 }
 } else {
//  Filtering logic for vets using Firebase fields for each vet clinic
 if (is24HoursOpen) {
 items = items.filter(item => item.is24Hours);
 }
 if (isWeekendOpen) {
 items = items.filter(item => item.isWeekendOpen);
 }
 if (isOpen7Days) {
 items = items.filter(item => item.isOpen7Days);
 }
 if (isPrivateClinic) {
 items = items.filter(item => item.ownershipType === "private");
 }
 if (isPublicClinic) {
 items = items.filter(item => item.ownershipType === "public");
 }
 }
 return items;
 };

 const toggleFavorite = (id) => {
 setFavorites((prev) =>
 prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
 );
 };

 // Renders product card
 const renderProduct = ({ item }) => (
 <TouchableOpacity
 onPress={() => Linking.openURL(item.link)}
 style={styles.productCard}
 >
 <Image source={{ uri: item.image }} style={styles.productImage} />
 <View style={styles.productInfo}>
 <Text style={styles.productName}>{item.name}</Text>
 <View style={styles.ratingContainer}>
 {[...Array(5)].map((_, i) => (
 <Ionicons
 key={i}
 name={i < Math.floor(item.rating) ? "star" : "star-outline"}
 size={16}
 color="#FFD700"
 />
 ))}
 <Text style={styles.ratingText}>{item.rating}</Text>
 </View>
 <Text style={styles.productPrice}>{item.price}</Text>
 </View>
 <TouchableOpacity
 onPress={() => toggleFavorite(item.id)}
 style={styles.favoriteIcon}
 >
 <Ionicons
 name={favorites.includes(item.id) ? "heart" : "heart-outline"}
 size={20}
 color={favorites.includes(item.id) ? "red" : "black"}
 />
 </TouchableOpacity>
 </TouchableOpacity>
 );

 // Rendes vet card
 const renderVet = ({ item }) => (
 <TouchableOpacity
 onPress={() => Linking.openURL(item.link)}
 style={styles.vetContainer}
 >
 <View style={styles.vetDetails}>
 <Text style={styles.vetName}>{item.name}</Text>
 <View style={styles.ratingContainer}>
 {[...Array(5)].map((_, i) => (
 <Ionicons
 key={i}
 name={i < Math.floor(item.rating) ? "star" : "star-outline"}
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
 name={favorites.includes(item.id) ? "heart" : "heart-outline"}
 size={20}
 color={favorites.includes(item.id) ? "red" : "black"}
 />
 </TouchableOpacity>
 </TouchableOpacity>
 );

 return (
 <View style={styles.container}>
 {/* Pet Selector */}
 <View style={styles.petSelector}>
 <ScrollView horizontal showsHorizontalScrollIndicator={false}>
 {pets.length > 0
 ? pets.map((pet) => (
 <TouchableOpacity
 key={pet.id}
 onPress={() => setSelectedPet(pet)}
 style={[
 styles.petButton,
 selectedPet &&
 selectedPet.id === pet.id &&
 styles.activePetButton,
 ]}
 >
 <Text
 style={[
 styles.petText,
 selectedPet &&
 selectedPet.id === pet.id &&
 styles.activePetText,
 ]}
 >
 {pet.Name}
 </Text>
 </TouchableOpacity>
 ))
 : ["Dog", "Cat"].map((pet) => (
 <TouchableOpacity
 key={pet}
 onPress={() =>
 setSelectedPet({ Name: pet, petType: pet.toLowerCase() })
 }
 style={[
 styles.petButton,
 selectedPet &&
 selectedPet.Name === pet &&
 styles.activePetButton,
 ]}
 >
 <Text
 style={[
 styles.petText,
 selectedPet &&
 selectedPet.Name === pet &&
 styles.activePetText,
 ]}
 >
 {pet}
 </Text>
 </TouchableOpacity>
 ))}
 </ScrollView>
 <View style={styles.iconsContainer}>
 <TouchableOpacity onPress={() => setFavoritesMode(!favoritesMode)}>
 <Ionicons
 name={favoritesMode ? "heart" : "heart-outline"}
 size={24}
 color="black"
 />
 </TouchableOpacity>
 <TouchableOpacity onPress={() => setIsSettingsModalVisible(true)}>
 <Ionicons name="filter-outline" size={24} color="black" />
 </TouchableOpacity>
 </View>
 </View>

 {/* Search Bar */}
 <View style={styles.searchContainer}>
 <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
 <TextInput
 style={styles.searchInput}
 placeholder="Search..."
 value={searchQuery}
 onChangeText={setSearchQuery}
 />
 </View>

 {/* Tabs for Categories */}
 <View style={styles.tabsContainer}>
 {["food", "toys", "tools", "vet"].map((tab) => (
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

 {/* Products / Vets List */}
 <FlatList
 data={getFilteredItems()}
 renderItem={activeTab === "vet" ? renderVet : renderProduct}
 keyExtractor={(item) => item.id}
 numColumns={activeTab === "vet" ? 1 : 2}
 key={activeTab}
 columnWrapperStyle={activeTab === "vet" ? null : styles.row}
 contentContainerStyle={styles.listContainer}
 />
 <StatusBar style="auto" />

 {/* Filter Modal */}
 <Modal visible={isSettingsModalVisible} transparent animationType="slide">
 {activeTab === "vet" ? (
 // Filters for vet tabs
 <View style={styles.modalContent}>
 <View style={styles.modalHeader}>
 <TouchableOpacity onPress={clearVetFilters}>
 <Text style={styles.clearAllText}>Clear All</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => setIsSettingsModalVisible(false)}>
 <Ionicons name="close-circle-outline" size={24} color="black" />
 </TouchableOpacity>
 </View>
 <Text style={styles.modalTitle}>Filter</Text>
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
 {is24HoursOpen && (
 <Ionicons name="checkmark-outline" size={20} color="green" />
 )}
 </TouchableOpacity>
 <Text style={styles.checkboxLabel}>Open 24 hours</Text>
 </View>
 <View style={styles.checkboxContainer}>
 <TouchableOpacity
 style={styles.checkbox}
 onPress={() => setIsWeekendOpen(!isWeekendOpen)}
 >
 {isWeekendOpen && (
 <Ionicons name="checkmark-outline" size={20} color="green" />
 )}
 </TouchableOpacity>
 <Text style={styles.checkboxLabel}>Open on weekends</Text>
 </View>
 <View style={styles.checkboxContainer}>
 <TouchableOpacity
 style={styles.checkbox}
 onPress={() => setIsOpen7Days(!isOpen7Days)}
 >
 {isOpen7Days && (
 <Ionicons name="checkmark-outline" size={20} color="green" />
 )}
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
 {isPrivateClinic && (
 <Ionicons name="checkmark-outline" size={20} color="green" />
 )}
 </TouchableOpacity>
 <Text style={styles.checkboxLabel}>Private clinics</Text>
 </View>
 <View style={styles.checkboxContainer}>
 <TouchableOpacity
 style={styles.checkbox}
 onPress={() => setIsPublicClinic(!isPublicClinic)}
 >
 {isPublicClinic && (
 <Ionicons name="checkmark-outline" size={20} color="green" />
 )}
 </TouchableOpacity>
 <Text style={styles.checkboxLabel}>Public/Corporate clinics</Text>
 </View>
 </View>
 <TouchableOpacity
 style={styles.viewResultsButton}
 onPress={() => setIsSettingsModalVisible(false)}
 >
 <Text style={styles.viewResultsButtonText}>View results</Text>
 </TouchableOpacity>
 </View>
 ) : (
 // Filters for product tabs
 <ScrollView style={styles.modalContent}>
 <View style={styles.modalHeader}>
 <TouchableOpacity onPress={clearAllFilters}>
 <Text style={styles.clearAllText}>Clear All</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => setIsSettingsModalVisible(false)}>
 <Ionicons name="close-circle-outline" size={24} color="black" />
 </TouchableOpacity>
 </View>
 <View style={styles.filterSection}>
 <TouchableOpacity
 style={styles.accordionHeader}
 onPress={() => setIsSortByExpanded(!isSortByExpanded)}
 >
 <Text style={styles.filterSectionTitle}>Sort By</Text>
 <Ionicons
 name={isSortByExpanded ? "chevron-up-outline" : "chevron-down-outline"}
 size={20}
 color="black"
 />
 </TouchableOpacity>
 {isSortByExpanded &&
 ["best match", "lowest price", "highest price", "most popular"].map((option) => (
 <TouchableOpacity
 key={option}
 style={styles.radioOption}
 onPress={() => setSortBy(option)}
 >
 <Ionicons
 name={sortBy === option ? "radio-button-on" : "radio-button-off"}
 size={20}
 color="black"
 />
 <Text style={styles.radioOptionText}>
 {option.charAt(0).toUpperCase() + option.slice(1)}
 </Text>
 </TouchableOpacity>
 ))}
 </View>
 <View style={styles.filterSection}>
 <TouchableOpacity
 style={styles.accordionHeader}
 onPress={() => setIsFlavorExpanded(!isFlavorExpanded)}
 >
 <Text style={styles.filterSectionTitle}>Flavor</Text>
 <Ionicons
 name={isFlavorExpanded ? "chevron-up-outline" : "chevron-down-outline"}
 size={20}
 color="black"
 />
 </TouchableOpacity>
 {/* Filter options by food flavor */}
 {isFlavorExpanded &&
 [
 "chicken",
 "turkey",
 "duck",
 "beef",
 "lamb",
 "pork",
 "rabbit",
 "venison",
 "salmon",
 "tuna",
 "fish",
 "seafood",
 ].map((option) => (
 <TouchableOpacity
 key={option}
 style={styles.checkboxContainer}
 onPress={() => {
 selectedFlavors.includes(option)
 ? setSelectedFlavors(selectedFlavors.filter((f) => f !== option))
 : setSelectedFlavors([...selectedFlavors, option]);
 }}
 >
 <View style={styles.checkbox}>
 {selectedFlavors.includes(option) && (
 <Ionicons name="checkmark-outline" size={20} color="green" />
 )}
 </View>
 <Text style={styles.checkboxLabel}>
 {option.charAt(0).toUpperCase() + option.slice(1)}
 </Text>
 </TouchableOpacity>
 ))}
 </View>
 <View style={styles.filterSection}>
 <TouchableOpacity
 style={styles.accordionHeader}
 onPress={() => setIsFoodTypeExpanded(!isFoodTypeExpanded)}
 >
 <Text style={styles.filterSectionTitle}>Food Type</Text>
 <Ionicons
 name={isFoodTypeExpanded ? "chevron-up-outline" : "chevron-down-outline"}
 size={20}
 color="black"
 />
 </TouchableOpacity>
 {isFoodTypeExpanded &&
 ["dry", "wet", "raw", "freeze-dried"].map((option) => (
 <TouchableOpacity
 key={option}
 style={styles.checkboxContainer}
 onPress={() => {
 selectedFoodTypes.includes(option)
 ? setSelectedFoodTypes(selectedFoodTypes.filter((f) => f !== option))
 : setSelectedFoodTypes([...selectedFoodTypes, option]);
 }}
 >
 <View style={styles.checkbox}>
 {selectedFoodTypes.includes(option) && (
 <Ionicons name="checkmark-outline" size={20} color="green" />
 )}
 </View>
 <Text style={styles.checkboxLabel}>
 {option.charAt(0).toUpperCase() + option.slice(1)}
 </Text>
 </TouchableOpacity>
 ))}
 </View>
 <TouchableOpacity
 style={styles.viewResultsButton}
 onPress={() => setIsSettingsModalVisible(false)}
 >
 <Text style={styles.viewResultsButtonText}>View results</Text>
 </TouchableOpacity>
 </ScrollView>
 )}
 </Modal>
 </View>
 );
}

const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: "#fff",
 paddingTop: 20,
 paddingHorizontal: 16,
 },
 topBar: {
 flexDirection: "row",
 justifyContent: "space-between",
 alignItems: "center",
 marginBottom: 20,
 },
 profileImage: {
 width: 40,
 height: 40,
 borderRadius: 20,
 },
 title: {
 fontSize: 24,
 fontWeight: "600",
 },
 searchContainer: {
 flexDirection: "row",
 alignItems: "center",
 backgroundColor: "#E5E5E6",
 borderRadius: 8,
 paddingHorizontal: 15,
 height: 40,
 width: "100%",
 marginBottom: 22,
 },
 searchIcon: {
 marginRight: 10,
 },
 searchInput: {
 height: 40,
 paddingHorizontal: 10,
 color: "#828286",
 fontSize: 16,
 flex: 1,
 },
 tabsContainer: {
 flexDirection: "row",
 justifyContent: "space-between",
 marginBottom: 20,
 },
 tab: {
 flex: 1,
 backgroundColor: "#CDF4E0",
 borderRadius: 20,
 paddingVertical: 12,
 marginHorizontal: 5,
 alignItems: "center",
 },
 activeTab: {
 backgroundColor: "#15653D",
 },
 tabText: {
 fontSize: 14,
 color: "black",
 },
 activeTabText: {
 color: "white",
 },
 listContainer: {
 paddingBottom: 20,
 },
 row: {
 justifyContent: "space-between",
 },
 productCard: {
 backgroundColor: "#f9f9f9",
 borderRadius: 8,
 padding: 10,
 marginVertical: 10,
 flex: 1,
 marginHorizontal: 5,
 position: "relative",
 },
 productImage: {
 width: "100%",
 height: 150,
 borderRadius: 8,
 },
 productInfo: {
 marginTop: 10,
 },
 productName: {
 fontSize: 14,
 fontWeight: "600",
 },
 ratingContainer: {
 flexDirection: "row",
 alignItems: "center",
 marginTop: 5,
 },
 ratingText: {
 marginLeft: 5,
 fontSize: 12,
 color: "#666",
 },
 productPrice: {
 fontSize: 14,
 fontWeight: "bold",
 marginTop: 5,
 },
 favoriteIcon: {
 position: "absolute",
 top: 10,
 right: 10,
 backgroundColor: "rgba(255, 255, 255, 0.8)",
 padding: 5,
 borderRadius: 20,
 },
 vetContainer: {
 flexDirection: "row",
 alignItems: "center",
 backgroundColor: "#f9f9f9",
 borderRadius: 8,
 padding: 10,
 marginVertical: 10,
 width: "100%",
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
 fontWeight: "bold",
 },
 vetAddress: {
 fontSize: 12,
 paddingTop: 5,
 color: "#666",
 },
 petSelector: {
 flexDirection: "row",
 justifyContent: "space-between",
 alignItems: "center",
 marginBottom: 15,
 },
 petButton: {
 marginRight: 20,
 borderBottomWidth: 2,
 borderBottomColor: "transparent",
 },
 activePetButton: {
 borderBottomColor: "green",
 },
 petText: {
 fontSize: 16,
 color: "black",
 },
 activePetText: {
 fontWeight: "bold",
 color: "black",
 },
 iconsContainer: {
 flexDirection: "row",
 gap: 15,
 },
 // Styling for filters
 modalContent: {
 flex: 1,
 backgroundColor: "white",
 marginTop: 35,
 padding: 20,
 borderRadius: 10,
 },
 modalTitle: {
 fontSize: 18,
 fontWeight: "bold",
 marginBottom: 15,
 },
 closeButton: {
 position: "absolute",
 top: 10,
 right: 10,
 },
 filterSection: {
 marginBottom: 20,
 },
 filterSectionTitle: {
 fontSize: 16,
 fontWeight: "bold",
 marginBottom: 10,
 },
 // Styling for vet filters specifically
 locationButton: {
 flexDirection: "row",
 alignItems: "center",
 padding: 10,
 borderWidth: 1,
 borderColor: "#ccc",
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
 borderColor: "#ccc",
 borderRadius: 5,
 padding: 10,
 },
 checkboxContainer: {
 flexDirection: "row",
 alignItems: "center",
 marginBottom: 5,
 },
 checkbox: {
 width: 20,
 height: 20,
 borderWidth: 1,
 borderColor: "#ccc",
 borderRadius: 3,
 marginRight: 10,
 justifyContent: "center",
 alignItems: "center",
 },
 checkboxLabel: {
 fontSize: 14,
 },
 viewResultsButton: {
 backgroundColor: "#388E3C",
 padding: 15,
 borderRadius: 5,
 alignItems: "center",
 },
 viewResultsButtonText: {
 color: "white",
 fontSize: 16,
 fontWeight: "bold",
 },
 // Styling for product filters specifically
 modalHeader: {
 flexDirection: "row",
 justifyContent: "space-between",
 alignItems: "center",
 marginBottom: 20,
 },
 clearAllText: {
 textDecorationLine: "underline",
 fontSize: 16,
 color: "#15653D",
 },
 accordionHeader: {
 flexDirection: "row",
 justifyContent: "space-between",
 alignItems: "center",
 },
 radioOption: {
 flexDirection: "row",
 alignItems: "center",
 marginBottom: 5,
 paddingLeft: 10,
 },
 radioOptionText: {
 marginLeft: 5,
 fontSize: 14,
 },
});