import React, { useState } from 'react';
import '../style/newRoom.css';
import { useNavigate } from 'react-router-dom';

function NewForm() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [formInfo, setFormInfo] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    contactNumber: '',
    images: [],
  });

  const navigate = useNavigate();

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);

    setFormInfo((prev) => {
      const allImages = [...prev.images, ...newImages];

      const uniqueImages = allImages.filter(
        (file, index, self) =>
          index === self.findIndex((f) => f.name === file.name),
      );

      return {
        ...prev,
        images: uniqueImages,
      };
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formInfo.title.trim()) return alert('Title is required');
    if (formInfo.title.trim().length < 5)
      return alert('Title must be at least 5 characters');
    if (!formInfo.location.trim()) return alert('Location is required');
    if (!formInfo.price || formInfo.price <= 0)
      return alert('Enter valid price');
    if (!formInfo.contactNumber.match(/^[6-9]\d{9}$/))
      return alert('Enter valid contact number');
    if (formInfo.images.length === 0)
      return alert('Please upload at least one image');

    const formData = new FormData();
    formData.append('title', formInfo.title);
    formData.append('location', formInfo.location);
    formData.append('price', formInfo.price);
    formData.append('description', formInfo.description);
    formData.append('contactNumber', formInfo.contactNumber);

    formInfo.images.forEach((img) => {
      formData.append('images', img);
    });

    try {
      const res = await fetch(`${API_URL}/room/addroom`, {
        method: 'POST',
        credentials: 'include', // 🔥 VERY IMPORTANT
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to add room');
      }

      const data = await res.json();
      console.log(data);

      alert('Room added successfully 🎉');
      navigate('/home');

      // reset form
      setFormInfo({
        title: '',
        location: '',
        price: '',
        description: '',
        contactNumber: '',
        images: [],
      });
    } catch (err) {
      console.error(err);
      alert('Room not added ❌');
    }
  };

  return (
    <div className="body">
      <div className="container">
        <h1>Add Your Room</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formInfo.title}
              onChange={handleChange}
              placeholder="e.g. Spacious 1BHK Room near UIT College"
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
              placeholder="e.g. Naini, Prayagraj"
            />
          </div>

          <div>
            <label>Price (₹):</label>
            <input
              type="number"
              name="price"
              value={formInfo.price}
              onChange={handleChange}
              placeholder="e.g. 5000"
            />
          </div>

          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formInfo.description}
              onChange={handleChange}
              placeholder="Room details..."
            ></textarea>
          </div>

          <div>
            <label>Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={formInfo.contactNumber}
              onChange={handleChange}
              placeholder="9876543210"
            />
          </div>

          <div>
            <label>Upload Images:</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            {formInfo.images.length > 0 && (
              <p>{formInfo.images.length} image(s) selected</p>
            )}
          </div>

          <button type="submit">Add Room</button>
        </form>
      </div>
    </div>
  );
}

export default NewForm;
