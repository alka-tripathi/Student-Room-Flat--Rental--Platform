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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormInfo({
  //     ...formInfo,
  //     images: Arrays.from(e.target.files),
  //   });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInfo({
      ...formInfo,
      [name]: value, // ✅ correct
    });
  };

  // 👇 handle image separately
  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);

    setFormInfo((prev) => {
      const allImages = [...prev.images, ...newImages];

      //👉 remove duplicates (by name)
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

    // ✅ SEND DATA

    const formData = new FormData();
    formData.append('title', formInfo.title);
    formData.append('location', formInfo.location);
    formData.append('price', formInfo.price);
    formData.append('description', formInfo.description);
    formData.append('contactNumber', formInfo.contactNumber);
    for (let i = 0; i < formInfo.images.length; i++) {
      formData.append('images', formInfo.images[i]);
    }

    try {
      const res = await fetch('http://localhost:8000/room/addroom', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      alert('Room added successfully 🎉');

      //navigate to the home page
      navigate('/home');

      // reset form
      setFormInfo({
        title: '',
        location: '',
        price: '',
        description: '',
        contactNumber: '',
        image: [],
      });
    } catch (err) {
      alert('Room not added');
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
              multiple
              accept="image/*"
              name="images"
              onChange={handleImageChange}
            />
            {/* ✅ Show count */}
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
