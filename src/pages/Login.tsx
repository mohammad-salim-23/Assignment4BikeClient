import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks"
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";

const Login = ()=>{
    const dispatch = useAppDispatch();
        
    const [login] = useLoginMutation();
    const onSubmit = async(data : FieldValues)=>{
        console.log(data);
        const toastId = toast.loading('Logging in');
        try{
            const userInfo = {
                id : data.userId,
                password : data.password
            };
            const res = await login(userInfo).unwrap();

            const user = verifyToken
        }
    }
}