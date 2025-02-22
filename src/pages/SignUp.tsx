import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, Form, Input } from "antd";
import { useRegisterMutation } from "../redux/features/auth/authApi";

// Validation schema with Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  // React Hook Form Setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; email: string; password: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<{ name: string; email: string; password: string }> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Signing up...");
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const res = await register(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;
      console.log(user);
      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      toast.success("Signed up successfully!", { id: toastId, duration: 2000 });
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
        <hr className="border-t border-gray-400 my-4" />
        <p className="text-gray-600 mb-6">
          Create an account to access exclusive features on BORCELLE_MOTOBIKE.com. Order parts, gear, and accessories, manage your order history, and store addresses for faster checkout.
        </p>
      </div>
  
      <Row justify="center" align="middle" style={{ width: "100%" }}>
        <Col xs={24} sm={16} md={12} lg={8}>
          <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
            <Form.Item label="Name" validateStatus={errors.name ? "error" : ""} help={errors.name?.message}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter your name"
                    className="border border-black transition-all duration-300 hover:border-green-500"
                  />
                )}
              />
            </Form.Item>
  
            <Form.Item label="Email" validateStatus={errors.email ? "error" : ""} help={errors.email?.message}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    className="border border-black transition-all duration-300 hover:border-green-500"
                  />
                )}
              />
            </Form.Item>
  
            <Form.Item label="Password" validateStatus={errors.password ? "error" : ""} help={errors.password?.message}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="Enter your password"
                    className="border border-black transition-all duration-300 hover:border-green-500"
                  />
                )}
              />
            </Form.Item>
  
            <Form.Item>
              <Button className="bg-secondaryColor"
                style={{
                  color: "#212121",
                  border: "1px solid black",
                  transition: "border 0.3s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.border = "1px solid orange")}
                onMouseOut={(e) => (e.currentTarget.style.border = "1px solid black")}
                type="default"
                htmlType="submit"
                block
              >
                Sign Up
              </Button>
            </Form.Item>

          </Form>
          <p className="text-gray-700 text-center mt-4">
  Already have an account?{" "}
  <Link to="/login" className="text-orange-500 hover:text-orange-700 font-semibold transition-all duration-300">
    Sign in here
  </Link>
</p>

        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
