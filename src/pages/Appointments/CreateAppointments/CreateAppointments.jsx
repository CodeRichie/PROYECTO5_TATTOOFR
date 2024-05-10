import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createAppointments, loginCall } from "../../../services/apiCalls";
import Header from "../../../components/Header/Header";

export const CreateAppointments = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
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
    defaultValues: {
      email: state?.email || "",
    },
    resolver: yupResolver(validationSchema)
  });


  const onSubmit = async(data) => {
    const answer = await loginCall(data);
    
    if (answer.status === 200) {
      dispatch(setUserData({token:answer.data.token, userInfo: answer.data.userInfo}))
      }
  };



  return (
    <><Header />
    <div className="registerElementsDesign">
          <h1 className="title">Crear cita</h1>
          <Container>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Cita del Dia</Form.Label>
          <Form.Control
            type="date"
            placeholder="Escriba su email..."
            {...register("email")}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escriba su Nombre.."
            {...register("password")}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>


        <div className="d-grid my-5">
          <Button variant="primary" size="lg" type="submit">
            Crear
          </Button>
        </div>
      </Form>
    </Container>
    </div></>
  );
};

