import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import retailLogo from "@/assets/retail.png";
import React, { useState } from "react";
import type {LoginProps} from "@/service/AuthService.ts";
import { login } from "@/service/AuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<LoginProps>({
        email: "",
        password: ""
    });

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await login(data);
            navigate("/dashboard");
            // Optionally, redirect or show success toast here
        } catch (e) {
            console.error(e);
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="w-full max-w-md bg-card shadow-xl rounded-xl p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <img src={retailLogo} alt="Retail Logo" className="h-16 w-16 mb-2" />
          <h1 className="text-2xl font-bold text-primary">Sign in to your account</h1>
          <p className="text-muted-foreground text-sm">Welcome back! Please enter your details.</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-foreground">Email</label>
            <Input id="email" type="email" placeholder="you@gmail.com" required autoFocus onChange={onChangeHandler} value={data.email} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-foreground">Password</label>
            <Input id="password" type="password" placeholder="••••••••" required onChange={onChangeHandler} value={data.password} />
          </div>
          <Button type="submit" className="mt-2 w-full">Sign In</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

