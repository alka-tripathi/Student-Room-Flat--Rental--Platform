import React, { useState } from 'react';
import '../style/newRoom.css';
import { useNavigate } from 'react-router-dom';

function NewForm() {
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

      // remove duplicates
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

    if (!formInfo.title.trim()) {
      alert('Title is required');
      return;
    }

    if (formInfo.title.trim().length < 5) {
      alert('Title must be at least 5 characters');
      return;
    }

    if (!formInfo.location.trim()) {
      alert('Location is required');
      return;
    }

    if (!formInfo.price || formInfo.price <= 0) {
      alert('Enter valid price');
      return;
    }

    if (!formInfo.contactNumber.match(/^[6-9]\d{9}$/)) {
      alert('Enter valid contact number');
      return;
    }

    if (formInfo.images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

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
      const res = await fetch('http://localhost:8000/room/addroom', {
        method: 'POST',
        body: formData,
      });

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
          {/* Title */}
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

          {/* Location */}
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formInfo.location}
              onChange={handleChange}
              placeholder="e.g. Naini, Prayagraj, Uttar Pradesh"
            />
          </div>

          {/* Price */}
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

          {/* Description */}
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formInfo.description}
              onChange={handleChange}
              placeholder="e.g. Fully furnished room with bed, fan, attached bathroom, WiFi available"
            ></textarea>
          </div>

          {/* Contact */}
          <div>
            <label>Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={formInfo.contactNumber}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
            />
          </div>

          {/* Images */}
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
