
import React from "react";


function Form({ formData, setFormData, handleSubmit }) {

  // Handle normal inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add action
  const addAction = (type) => {
    setFormData({
      ...formData,
      actions: [...(formData.actions || []), { type, value: "" }]
    });
  };

  // Update action value
  const updateActionValue = (index, value) => {
    const updated = [...formData.actions];
    updated[index].value = value;
    setFormData({ ...formData, actions: updated });
  };

  // Delete action
  const deleteAction = (index) => {
    const updated = formData.actions.filter((_, i) => i !== index);
    setFormData({ ...formData, actions: updated });
  };

  return (
    <div className="enterdetails">

      <h2>Profile Builder</h2>

      <form onSubmit={handleSubmit}>

        {/* BASIC INFO */}
        <div className="form-section">
          <h3>Basic Info</h3>
<label>Profile Image</label>

<input type="file" accept="image/*"  onChange={(e) => {
   const file = e.target.files[0];

setFormData({
  ...formData,
  profilePicture: file
});
  }}
/><br />

          <input name="prefix" placeholder="Prefix (Mr, Dr)" onChange={handleChange} /><br />
          <input name="firstname" placeholder="First Name" onChange={handleChange} /><br />
          <input name="lastname" placeholder="Last Name" onChange={handleChange} /><br />
          
<label>Brand Logo</label>

<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];

setFormData({
  ...formData,
  brandImage: file
});
  }}
/><br />
          <input name="company" placeholder="Company" onChange={handleChange} /><br />
          <input name="jobtitle" placeholder="Job Title" onChange={handleChange} />
        </div>

        {/* ADDRESS */}
        <div className="form-section">
          <h3>Address</h3>

          <input name="address" placeholder="Address" onChange={handleChange} /><br />
          {/* <input name="city" placeholder="City" onChange={handleChange} /> */}
          <input name="state" placeholder="State" onChange={handleChange} /><br />
          {/* <input name="postalcode" placeholder="Postal Code" onChange={handleChange} /> */}
          <input name="country" placeholder="Country" onChange={handleChange} />
        </div>

        {/* ACTIONS */}
        <div className="form-section">
          <h3>Primary Actions</h3>

          {/* ICON SELECTOR */}
          <div className="action-buttons">
            <div onClick={() => addAction("call")}>📞</div>
            <div onClick={() => addAction("whatsapp")}>💬</div>
            <div onClick={() => addAction("email")}>✉️</div>
            <div onClick={() => addAction("website")}>🌐</div>
            <div onClick={() => addAction("location")}>📍</div>
          </div>

          {/* DYNAMIC INPUTS */}
          <div className="action-inputs">
            {(formData.actions || []).map((action, index) => (
              <div key={index} className="action-row">

                <span className="action-label">
                  {action.type.toUpperCase()}
                </span>

                <input
                  type="text"
                  placeholder={`Enter ${action.type}`}
                  value={action.value}
                  onChange={(e) => updateActionValue(index, e.target.value)}
                />

                <button type="button"  onClick={() => deleteAction(index)}>
                  ❌
                </button>

              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <button type="submit" className="save-btn">
          Save Card
        </button>

      </form>
     
    </div>
  );
}

export default Form;

