import React, { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import '../styles/AddUser.css';

function AddUser() {
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Save cropped area dimensions when cropping is done
  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  // Handle file input change and read image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError('');
    setCroppedImage(null);
    setCroppedBlob(null);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      setError("Please select a valid image file (jpg or png)");
    }
  };

  // Generate cropped image preview
  const showCroppedImage = async () => {
    try {
      const blob = await getCroppedImg(image, croppedAreaPixels);
      const previewUrl = URL.createObjectURL(blob);
      setCroppedImage(previewUrl);
      setCroppedBlob(blob);
    } catch (e) {
      console.error(e);
      setError("Failed to crop image");
    }
  };

  // Clear uploaded image and reset crop
  const handleRemoveImage = () => {
    setImage(null);
    setCroppedImage(null);
    setCroppedBlob(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Submit user data and avatar to backend
  const handleSubmit = async () => {
    setError('');
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (image && !croppedBlob) {
      setError("Please crop the uploaded image before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', username);
      if (croppedBlob) {
        formData.append('avatar', croppedBlob, `${uuidv4()}.jpeg`);
      }

      await axios.post('http://localhost:5000/api/user/register', formData);

      alert('User registered successfully');
      setUsername('');
      setImage(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedImage(null);
      setCroppedBlob(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      const msg = err.response?.data?.msg || "Something went wrong";
      setError(msg);
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="adduser-container">
      <h2 className="adduser-title">Register & Upload Avatar</h2>

      <input
        type="text"
        placeholder="Enter username"
        className="adduser-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        className="adduser-file"
        onChange={handleFileChange}
        ref={fileInputRef}
      />

      {image && (
        <>
          <div className="crop-preview-wrapper">
            <div className="cropper-box">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            {croppedImage && (
              <div className="preview-box">
                <h4>Preview:</h4>
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className="preview-avatar"
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={showCroppedImage} className="adduser-btn">
              Crop & Preview
            </button>
            <button onClick={handleRemoveImage} className="adduser-btn danger">
              Remove Image
            </button>
          </div>
        </>
      )}

      <button onClick={handleSubmit} className="adduser-btn submit-btn">
        Submit
      </button>

      {error && <p className="adduser-error">{error}</p>}
    </div>
  );
}

export default AddUser;
