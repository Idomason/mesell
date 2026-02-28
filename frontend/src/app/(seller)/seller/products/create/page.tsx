
"use client";

import { useForm } from "@refinedev/react-hook-form";

export default function CreateProduct() {
  const { refineCore: { onFinish }, register, handleSubmit } = useForm({
    resource: "products",
  });

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <input {...register("name")} placeholder="Name" />
      <button type="submit">Save</button>
    </form>
  );
}