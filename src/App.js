import React, { useRef } from "react";

// import package
import { FormProvider, useForm } from "react-hook-form";
import { Row, Col, Container } from "react-bootstrap";

// import component
import Input from "./components/Input/Input";

// import style
import "./sass/App.scss";

function App() {
  const form = useRef();

  const methods = useForm({
    shouldFocusError: true,
    mode: "all",
  });

  const { handleSubmit } = methods;

  // function to submit form value fill in by user
  const onSubmit = () => {};

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
          </form>
        </FormProvider>
      </Container>
    </div>
  );
}

export default App;
