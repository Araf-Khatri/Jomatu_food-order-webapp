import { useState } from "react";
import "./index.css";

const Dialog = ({
  heading,
  formFields,
  showDialog,
  setShowDialog,
  onFormSubmit,
}) => {
  const [formData, setFormData] = useState({});

  const handleCloseDialog = () => {
    setShowDialog(false);
    setFormData({});
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {showDialog && (
        <div className="orders-page-dialog-overlay" onClick={handleCloseDialog}>
          <div
            className="orders-page-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="orders-page-dialog-header">
              <h2 className="orders-page-dialog-title">
                {heading || "Add Customer Information"}
              </h2>
              <button
                className="orders-page-close-button"
                onClick={handleCloseDialog}
              >
                ×
              </button>
            </div>
            <form className="orders-page-dialog-form" onSubmit={onFormSubmit}>
              {formFields.map((field) => (
                <div key={field.id} className="orders-page-form-group">
                  <label className="orders-page-form-label" htmlFor={field.id}>
                    {field.label}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      name={field.name}
                      className={field.className}
                      placeholder={field.placeholder}
                      value={formData?.[field.name] || ""}
                      onChange={handleFormChange}
                      rows={field.rows}
                      required={field.required}
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      className={field.className}
                      placeholder={field.placeholder}
                      value={formData?.[field.name] || ""}
                      onChange={handleFormChange}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
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
    </>
  );
};

export default Dialog;
