import { useAuthMutation } from "@/services/auth";
import { RegisterInput } from "@/types/User";
import React, { FormEvent, useState } from "react";

const RegisterPage = () => {
  const [formRegister, setFormRegister] = useState<RegisterInput>({
    username: "",
    email: "",
    password: "",
  });

  const { mutate } = useAuthMutation({ navigateTo: "/", authType: "register" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate(formRegister);
    setFormRegister({ username: "", email: "", password: "" });
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formRegister.email}
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

      <button type="submit">Register</button>
    </form>
  );
};
export default RegisterPage;
