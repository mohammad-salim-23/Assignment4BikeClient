/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Divider } from "antd";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<{ email: string; password: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (
    data
  ) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res?.data?.accessToken }));
      toast.success("Logged in successfully!", { id: toastId });
      navigate("/");
    } catch (err: any) {
      toast.error("Invalid credentials", { id: toastId });
    }
  };

  // Demo credentials
  const fillDemoUser = () => {
    setValue("email", "user@example.com");
    setValue("password", "User123@");
  };

  const fillDemoAdmin = () => {
    setValue("email", "admin@example.com");
    setValue("password", "Admin123@");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-md p-8">
        <h1 className="text-2xl font-bold text-center mb-4">
          Sign In to Your Account
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your credentials to access your dashboard
        </p>

        {/* Demo Buttons */}
        <div className="flex justify-between mb-4 gap-2">
          <Button
            type="default"
            className="!bg-white !border-2 !border-orange-300 hover:!border-orange-500 !text-orange-600 !shadow-none focus:!ring-0 focus:!outline-none"
            onClick={fillDemoUser}
            block
          >
            User credentials
          </Button>

          <Button
            type="default"
            className="!bg-white !border-2 !border-orange-400  !text-orange-700 !shadow-none focus:!ring-0 focus:!outline-none hover:border-orange-800"
            onClick={fillDemoAdmin}
            block
          >
            Admin credentials
          </Button>
        </div>

        {/* Form */}
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="!shadow-none !ring-0 focus:!outline-none focus:!border-orange-500"
                  placeholder="Enter email"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  className="!shadow-none !ring-0 focus:!outline-none focus:!border-orange-500"
                  placeholder="Enter password"
                />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="default"
              className="!bg-orange-500 hover:!bg-orange-600 !text-white font-semibold !border-none !shadow-none focus:!ring-0 focus:!outline-none"
              htmlType="submit"
              block
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <Divider>Or</Divider>
        <p className="text-center text-gray-600 mb-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-orange-500">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
