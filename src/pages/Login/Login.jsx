import { useNavigate } from "react-router-dom";

import { registerNewUserCall } from "../../services/apiCalls";
import "./Login.css";
import Header from "../../components/Header/Header";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


export const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Formato de email inválido")
      .required("Email es obligatorio"),
    password: Yup.string()
      .required("Password es obligatorio"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors}
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async(data) => {
      const answer = await registerNewUserCall(data);
      console.log(answer)

      if (answer.data.email) {
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
  };

  return (
    <><Header />
    <div className="registerElementsDesign">
          <h1 className="title">CREA UNA CUENTA</h1>
          <h2 className="description">¿Eres nuevo? Regístrate y reserva tu primera cita.</h2>
          <Container>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Escriba su email..."
            {...register("email")}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escriba su password..."
            {...register("password")}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPasswordConfirmation">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Confirme su password..."
            {...register("passwordConfirmation")}
            isInvalid={!!errors.passwordConfirmation}
          />
          <Form.Control.Feedback type="invalid">
            {errors.passwordConfirmation?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid my-5">
          <Button variant="primary" size="lg" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </Container>
    </div></>
  );
};