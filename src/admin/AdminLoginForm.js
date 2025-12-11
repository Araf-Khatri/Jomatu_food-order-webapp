import "./AdminLoginForm.css";

const AdminLoginForm = ({ confirmPasswordHandler }) => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const password = event.target.password.value;
    confirmPasswordHandler(password);
  };

  return (
    <div className="admin-form-wrapper">
      <div className="admin-form-container">
        <h1 className="admin-form-title">Enter Password</h1>
        <form className="admin-form-form" onSubmit={onSubmitHandler}>
          <label className="admin-form-label" htmlFor="password">
            Password
          </label>
          <input
            className="admin-form-input"
            type="password"
            id="password"
            name="password"
            required
          />
          <button className="admin-form-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
