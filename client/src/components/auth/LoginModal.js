import React, { useState, useEffect } from "react";
import {
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from "../../redux/types";

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const [localMsg, setLocalMsg] = useState("");
  const [form, setValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { errorMsg } = useSelector((state) => state.auth);
  useEffect(() => {
    try {
      setLocalMsg(errorMsg);
    } catch (e) {
      console.log(e);
    }
  }, [errorMsg]);

  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST,
    });
    setModal(!modal);
    console.log('toggle')
  };

  const onChange = (e) => {
    //console.log('change1')
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    console.log('submit')
    e.preventDefault();
    const { email, password } = form;
    const user = { email, password };
    console.log(user);
    dispatch({
//      console.log('dispatch');
      type: LOGIN_REQUEST,
      payload: user,
    });
    console.log('dispatch');
  };
  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Login</ModalHeader>
        <ModalBody>
          {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
