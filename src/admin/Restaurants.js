import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { addRestaurant, getRestaurants } from "../firebase/handlers";

import Dialog from "../components/Dialog";
import "./Restaurants.css";

const createRestaurantInputs = [
  {
    id: "name",
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter customer name",
    required: true,
    className: "orders-page-form-input",
  },
  {
    id: "address",
    name: "address",
    type: "textarea",
    label: "Address",
    placeholder: "Enter customer address",
    required: true,
    className: "orders-page-form-input orders-page-form-textarea",
    rows: 4,
  },
];

const Restaurants = () => {
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    getRestaurants().then((data) => setRestaurants(data));
  }, []);

  const handleViewMeals = (restaurantId) => {
    navigate(`/admin/restaurants/${restaurantId}`);
  };

  const onCreateRestaurant = async (event) => {
    // Implement restaurant creation logic here
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const name = formData.get("name");
      const address = formData.get("address");
      setSearchParams({});
      const restaurant = await addRestaurant({ name, address });
      setRestaurants((prev) => [restaurant, ...prev]);
      setShowDialog(false);
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  };

  return (
    <div className="restaurant-listing-page">
      <div className="restaurant-listing-heading-container">
        <div className="restaurant-listing-header">
          <h1 className="restaurant-listing-title">Restaurants</h1>
          <p className="restaurant-listing-subtitle">
            Explore our amazing restaurants and their menus
          </p>
        </div>
        <button
          className="restaurant-listing-create-btn"
          onClick={() => setShowDialog(true)}
        >
          + Create Restaurant
        </button>
        <Dialog
          heading={"Add Restaurant"}
          formFields={createRestaurantInputs}
          onFormSubmit={onCreateRestaurant}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
      </div>

      <div className="restaurant-listing-container">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-listing-card-wrapper">
            <div className="restaurant-listing-card">
              <div className="restaurant-listing-icon">🍽️</div>
              <div className="restaurant-listing-info">
                <h2 className="restaurant-listing-name">{restaurant.name}</h2>
                <p className="restaurant-listing-address">
                  {restaurant.address}
                </p>
              </div>
            </div>
            <button
              className="restaurant-listing-cta"
              onClick={() => handleViewMeals(restaurant.id)}
            >
              View Restaurant Meals
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;

{
  /*
  
    const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setFormData({ name: '', address: '' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

    const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Customer Info - Name: ${formData.name}, Address: ${formData.address}`);
    handleCloseDialog();
  };


   {showDialog && (
        <div className="orders-page-dialog-overlay" onClick={handleCloseDialog}>
          <div className="orders-page-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="orders-page-dialog-header">
              <h2 className="orders-page-dialog-title">Add Customer Information</h2>
              <button className="orders-page-close-button" onClick={handleCloseDialog}>×</button>
            </div>
            <form className="orders-page-dialog-form" onSubmit={handleFormSubmit}>
              <div className="orders-page-form-group">
                <label className="orders-page-form-label" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="orders-page-form-input"
                  placeholder="Enter customer name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="orders-page-form-group">
                <label className="orders-page-form-label" htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  className="orders-page-form-input orders-page-form-textarea"
                  placeholder="Enter customer address"
                  value={formData.address}
                  onChange={handleFormChange}
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="orders-page-dialog-actions">
                <button 
                  type="button" 
                  className="orders-page-dialog-cancel-button"
                  onClick={handleCloseDialog}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="orders-page-dialog-submit-button"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  
  */
}
