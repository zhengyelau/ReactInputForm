import React, { useState, useEffect, useRef } from "react";

// import package
import emailjs from "@emailjs/browser";
import { FormProvider, useForm } from "react-hook-form";
import { Row, Col, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

// import component
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import Textarea from "./components/Textarea/Textarea";

// import helpers
import { postRequest } from "./helpers/axiosClient";

// import style
import "./sass/App.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [image, setImage] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const form = useRef();
  const fileUploadRef = useRef();

  useEffect(() => {
    if (image.length < 1) return;

    const newImageUrls = [];
    image.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [image]);

  const methods = useForm({
    shouldFocusError: true,
    mode: "all",
  });

  const {
    handleSubmit,
    getValues,
    reset,
    formState: { isValid },
  } = methods;

  // function to reset all form fields
  const resetFormFields = () => {
    reset({
      first_name: "",
      last_name: "",
      small_description: "",
      email: "",
    });
    setImage([]);
    setImageURLs([]);
    toast("Successfully submit", { type: "success" });
  }

  // function to submit form value fill in by user
  const onSubmit = () => {
    // Using EmailJS to send email
    emailjs
    .sendForm(
      "service_ljfrjgn",
      "template_l74157q",
      form.current,
      "QXDib08DXxv54Eqdn"
    )
    .then(
      (result) => {},
      (error) => {}
    );

    // value that need to post
    const payload = {
      first_name: getValues("first_name"),
      last_name: getValues("last_name"),
      small_description: getValues("small_description"),
      email: getValues("email"),
      image: imageURLs,
    };

    // posting payload to endpoint
    postRequest(
      "https://ad6c79c3-c187-4c9c-806f-2dc09054b1c4.mock.pstmn.io",
      payload
    )
      .then(() => {
        resetFormFields();
      })
      .catch(() => toast("Something wrong", { type: "error" }));
  };

  // function to keep the upload image and display it to user
  const onImageChange = (e) => {
    setImage((img) => [...img, ...e.target.files]);
  };

  // function to remove selected image by user
  const removeImage = (index) => {
    image.splice(index, 1);
    setImage(image);

    const newImageUrls = [];
    image.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  };

  return (
    <div className="App">
      <Container className="bg-white rounded pl-5 pr-5 pb-5 pt-3">
        <h3 className="text-black pb-3">Simple Form</h3>
        <FormProvider {...methods}>
          <form ref={form} onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col lg={6} md={6} sm={6}>
                <Input
                  type="text"
                  label="First Name"
                  field_id="first_name"
                  mandatory
                />
              </Col>
              <Col lg={6} md={6} sm={6}>
                <Input
                  type="text"
                  label="Last Name"
                  field_id="last_name"
                  mandatory
                />
              </Col>
            </Row>

            <Row className="pt-4 pb-2">
              <Col lg={12} md={12} sm={12}>
                <Textarea
                  name="small_description"
                  placeholder="Small Description"
                  label="Small Description"
                  required
                />
              </Col>
            </Row>

            <Row className="pt-5">
              <Col lg={12} md={12} sm={12}>
                <Input
                  type="email"
                  label="Email Address"
                  field_id="email"
                  errorMessage="Invalid Email"
                  validationPattern={
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  }
                  mandatory
                />
              </Col>
            </Row>

            <ToastContainer />

            <Row className="pt-4">
              <Col lg={6} md={6} sm={6} />
              <Col lg={6} md={6} sm={6} className="mt-3 mt-sm-0">
                <div className="d-flex justify-content-between align-items-center pl-5">
                  <Button
                    label={"add image"}
                    variant="primary"
                    type="button"
                    className="form-btn"
                    onClick={() => fileUploadRef.current.click()}
                  />

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={onImageChange}
                    className="d-none"
                    ref={fileUploadRef}
                  />

                  <Button
                    label={"Save"}
                    variant="primary"
                    type="submit"
                    className="form-btn"
                    disabled={!isValid}
                  />
                </div>
              </Col>
            </Row>

            <Row className="pt-4">
              {imageURLs.map((img, index) => (
                <Col lg={6} md={6} sm={6} key={img}>
                  <img
                    src={img}
                    width="250px"
                    height="250px"
                    style={{ textAlign: "left" }}
                  />
                  <Button
                    variant="link"
                    label="remove"
                    className="p-0 pt-2 text-danger"
                    onClick={() => removeImage(index)}
                  />
                </Col>
              ))}
            </Row>
          </form>
        </FormProvider>
      </Container>
    </div>
  );
}

export default App;
