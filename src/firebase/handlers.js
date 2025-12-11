import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";

const mapDocsToData = (documents) => {
  const array = [];
  documents.forEach((doc) => {
    array.push({ id: doc.id, ...doc.data() });
  });
  return array;
};

const getMeals = async () => {
  const mealDocs = await getDocs(collection(db, "meals"));
  const meals = mapDocsToData(mealDocs);
  return meals;
};

const getRestaurants = async () => {
  try {
    const restaurantsDocs = await getDocs(collection(db, "restaurants"));
    const restaurants = mapDocsToData(restaurantsDocs);
    return restaurants;
  } catch (error) {
    console.error("Error fetching restaurants: ", error);
    return [];
  }
};

const getRestaurant = async (restaurantId) => {
  try {
    const restaurantDocs = await getDoc(doc(db, "restaurants", restaurantId));
    const restaurants = mapDocsToData([restaurantDocs]);
    return restaurants[0];
  } catch (err) {
    console.error("Error fetching restaurant: ", err);
    return null;
  }
};

const addRestaurant = async (restaurantData) => {
  try {
    const restaurantsRef = doc(collection(db, "restaurants"));
    await setDoc(restaurantsRef, restaurantData);
    return { id: restaurantsRef.id, ...restaurantData };
  } catch (err) {
    console.error("Error adding restaurant: ", err);
  }
};

const addRestaurantMeal = async (restaurantId, mealData) => {
  try {
    const mealsRef = doc(collection(db, "meals"));
    const newMealData = {
      ...mealData,
      restaurant_id: restaurantId,
    };
    await setDoc(mealsRef, newMealData);
    return { id: mealsRef.id, ...newMealData };
  } catch (err) {
    console.error("Error adding meal: ", err);
  }
};

const getRestaurantMeals = async (restaurantId) => {
  const mealDocs = await getDocs(
    query(collection(db, "meals"), where("restaurant_id", "==", restaurantId))
  );
  const meals = mapDocsToData(mealDocs);
  return meals;
};

const getOrders = async () => {
  const orderDocs = await getDocs(collection(db, "orders"));
  const orders = mapDocsToData(orderDocs);
  return orders;
};

const addOrder = async (orderData) => {
  const ordersRef = doc(collection(db, "orders"));
  const newOrder = {
    ...orderData,
    created_at: serverTimestamp(),
  };
  await setDoc(ordersRef, newOrder);
};

export {
  addOrder,
  addRestaurant,
  addRestaurantMeal,
  getMeals,
  getOrders,
  getRestaurant,
  getRestaurantMeals,
  getRestaurants,
};
