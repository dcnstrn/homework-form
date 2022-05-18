import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [usernameDirty, setUsernameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [imageDirty, setImageDirty] = useState(false);
  const [usernameError, setUsernameError] = useState(
    "*Username cannot be empty"
  );
  const [emailError, setEmailError] = useState("*Email cannot be empty");
  const [phoneError, setPhoneError] = useState("*Phone cannot be empty");
  const [imageError, setImageError] = useState("*Choose photo");
  const [formValid, setFormValid] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  useEffect(() => {
    if (emailError || usernameError || phoneError || imageError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, usernameError, phoneError, imageError]);

  const usernameHandler = (e) => {
    setUsername(e.target.value);
    const re = /\w{6,}/gi;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setUsernameError("*6 characters min");
    } else {
      setUsernameError("");
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("*incorrect Email");
    } else {
      setEmailError("");
    }
  };

  const phoneHandler = (e) => {
    setPhone(e.target.value);
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!re.test(String(e.target.value))) {
      setPhoneError("*incorrect Phone");
    } else {
      setPhoneError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "username":
        setUsernameDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
      case "phone":
        setPhoneDirty(true);
      case "image":
        setImageDirty(true);
    }
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
    setImageError("");
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const submitHandler = (e) => {
    const newForm = {
      username,
      email,
      phone,
      image: URL.createObjectURL(selectedImage),
    };
    alert(JSON.stringify(newForm));
  };

  return (
    <div className="app">
      <form onSubmit={submitHandler}>
        <h2>React Form</h2>
        {usernameDirty && usernameError && (
          <div className="inputError">{usernameError}</div>
        )}
        <input
          onBlur={(e) => blurHandler(e)}
          value={username}
          onChange={(e) => usernameHandler(e)}
          name="username"
          type="text"
          placeholder="Enter your username"
        />
        {emailDirty && emailError && (
          <div className="inputError">{emailError}</div>
        )}
        <input
          onBlur={(e) => blurHandler(e)}
          value={email}
          onChange={(e) => emailHandler(e)}
          name="email"
          type="text"
          placeholder="Enter your email"
        />
        {phoneDirty && phoneError && (
          <div className="inputError">{phoneError}</div>
        )}
        <input
          onBlur={(e) => blurHandler(e)}
          value={phone}
          onChange={(e) => phoneHandler(e)}
          name="phone"
          type="text"
          placeholder="Enter your phone"
        />
        {selectedImage && (
          <div className="preview">
            <img src={URL.createObjectURL(selectedImage)} />
            <span onClick={removeSelectedImage}>+</span>
          </div>
        )}
        {imageDirty && imageError && (
          <div className="inputError">{imageError}</div>
        )}
        <input
          onBlur={(e) => blurHandler(e)}
          onChange={imageChange}
          type="file"
          name="image"
          accept="image/*"
          disabled={selectedImage}
        />

        <button disabled={!formValid} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
