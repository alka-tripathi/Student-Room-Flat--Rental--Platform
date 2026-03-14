import React from 'react';
import { useState } from 'react';

function NewForm() {
  const [formInfo, setFormInfo] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    contactNimber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formInfo);
  };

  return (
    <div className="container">
      <h1>Add New Room</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formInfo.title}
            onChange={handleChange}
            placeholder="Example: 1BHK Room for Students"
            autoFocus
          />
        </div>

        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formInfo.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formInfo.price}
            onChange={handleChange}
            placeholder="Enter rent price"
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formInfo.description}
            onChange={handleChange}
            placeholder="Write details about the room"
          ></textarea>
        </div>

        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formInfo.contactNumber}
            onChange={handleChange}
            placeholder="Enter contact number"
          />
        </div>

        <button type="submit">Add Room</button>
      </form>
    </div>
  );
}

export default NewForm;
