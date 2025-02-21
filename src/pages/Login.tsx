import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Form, Input } from "antd";

// Validation schema with Yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Logging in...");
    try {
      const userInfo = {
        id: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;
      console.log(user);
      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      toast.success("Logged in successfully!", { id: toastId, duration: 2000 });
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          <Form.Item label="Email" validateStatus={errors.email ? "error" : ""} help={errors.email?.message}>
            <Input
              {...register("email")}
              placeholder="Enter your email"
              style={{
                border: "1px solid black",
                transition: "border 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.border = "1px solid green")}
              onMouseOut={(e) => (e.currentTarget.style.border = "1px solid black")}
            />
          </Form.Item>

          <Form.Item label="Password" validateStatus={errors.password ? "error" : ""} help={errors.password?.message}>
            <Input.Password
              {...register("password")}
              placeholder="Enter your password"
              style={{
                border: "1px solid black",
                transition: "border 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.border = "1px solid green")}
              onMouseOut={(e) => (e.currentTarget.style.border = "1px solid black")}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className=""
              style={{
                color: "#212121",
                border: "1px solid black",
                transition: "border 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.border = "1px solid green")}
              onMouseOut={(e) => (e.currentTarget.style.border = "1px solid black")}
              type="default"
              htmlType="submit"
              block
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
