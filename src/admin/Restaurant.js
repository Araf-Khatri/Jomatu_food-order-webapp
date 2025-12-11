import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import {
  addRestaurantMeal,
  getRestaurant,
  getRestaurantMeals,
} from "../firebase/handlers";

import Dialog from "../components/Dialog";
import "./Restaurant.css";

const createRestaurantMealInputs = [
  {
    id: "name",
    name: "name",
    label: "Meal Name",
    type: "text",
    placeholder: "Enter Meal Name",
    required: true,
    className: "orders-page-form-input",
  },
  {
    id: "description",
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter Meal description",
    required: true,
    className: "orders-page-form-input orders-page-form-textarea",
    rows: 4,
  },
  {
    id: "price",
    name: "price",
    label: "Price",
    type: "number",
    placeholder: "Enter price",
    required: true,
    className: "orders-page-form-input",
  },
];

const Restaurant = () => {
  const params = useParams();
  const [_, setSearchParams] = useSearchParams();
  const [restaurant, setRestaurant] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const restaurantId = params.restaurantId;
    getRestaurant(restaurantId).then((data) => setRestaurant(data));
    getRestaurantMeals(restaurantId).then((data) => setMeals(data));
  }, []);

  const onCreateMeal = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const name = formData.get("name");
      const description = formData.get("description");
      const price = parseFloat(formData.get("price"));
      const restaurantId = params.restaurantId;

      setSearchParams({});
      const meal = await addRestaurantMeal(restaurantId, {
        name,
        description,
        price,
        restaurant_name: restaurant?.name,
      });
      setMeals((prev) => [meal, ...prev]);
      setShowDialog(false);
    } catch (error) {
      console.error("Error creating meal:", error);
    }
  };

  return (
    <div className="meals-page-wrapper">
      <div className="meals-heading-container">
        <div className="meals-page-header">
          <h1 className="meals-page-title">
            {restaurant?.name ?? "Restaurant"} Meals
          </h1>
          <p className="meals-page-subtitle">
            Delicious dishes from our restaurant located at{" "}
            <strong>{restaurant?.address}</strong>
          </p>
        </div>
        <button
          className="restaurant-listing-create-btn"
          onClick={() => setShowDialog(true)}
        >
          + Create a Meal
        </button>
        <Dialog
          heading={
            "Create a Meal for " + (restaurant?.name || "the Restaurant")
          }
          formFields={createRestaurantMealInputs}
          onFormSubmit={onCreateMeal}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
      </div>

      <div className="meals-page-container">
        {meals.map((meal) => (
          <div key={meal.id} className="meals-page-card">
            <div className="meals-page-icon">🍽️</div>
            <div className="meals-page-content">
              <h2 className="meals-page-name">{meal.name}</h2>
              <p className="meals-page-description">{meal.description}</p>
              <div className="meals-page-footer">
                <span className="meals-page-price">₹{meal.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
