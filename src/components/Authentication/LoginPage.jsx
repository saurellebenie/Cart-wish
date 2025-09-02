import React, { use, useState } from "react";
import "./LoginPage.css";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { getUser, login } from "../../services/userService";
import { Navigate, useLocation } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Enter valid email adress" }).min(1),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [formErrors, setFormErrors] = useState("");
  const location = useLocation();

  const onSubmit = async (data) => {
    try {
      await login(data);
      // redirect and refresh to home page after login
      const { state } = location;
      window.location = state ? state.form : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFormErrors(error.response.data.message);
      }
    }
  };
  if (getUser()) {
    return <Navigate to="/" />;
  }

  return (
    <section className="align_center form_page">
      <form
        action=""
        className="authentication_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name=""
              id="email"
              className="form_text_input"
              placeholder="Enter Your Email"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form_text_input"
              placeholder="Enter Your Phone Password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          {formErrors && <em className="form_error">{formErrors}</em>}

          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
