import React, { useState } from 'react';
import '../style/newRoom.css';

function NewForm() {
  const [formInfo, setFormInfo] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    contactNumber: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
  };

  // 👇 handle image separately
  const handleImageChange = (e) => {
    setFormInfo({
      ...formInfo,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', formInfo.title);
    formData.append('location', formInfo.location);
    formData.append('price', formInfo.price);
    formData.append('description', formInfo.description);
    formData.append('contactNumber', formInfo.contactNumber);
    formData.append('image', formInfo.image);

    try {
      const res = await fetch('http://localhost:8000/room/addroom', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      alert('Room added successfully 🎉');

      //navigate to the home page
      navigate('/');

      // reset form
      setFormInfo({
        title: '',
        location: '',
        price: '',
        description: '',
        contactNumber: '',
        image: null,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="body">
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

          {/* ✅ Image Upload */}
          <div>
            <label>Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button type="submit">Add Room</button>
        </form>
      </div>
    </div>
  );
}

export default NewForm;
