import { useAuthMutation } from "@/services/auth";
import { LoginInput } from "@/types/User";
import React, { FormEvent, useState } from "react";

const LoginPage = () => {
  const [formRegister, setFormRegister] = useState<LoginInput>({
    username: "",
    password: "",
  });

  const { mutate } = useAuthMutation({ navigateTo: "/", authType: "login" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate(formRegister);
    setFormRegister({ username: "", password: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formRegister.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formRegister.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};
export default LoginPage;
