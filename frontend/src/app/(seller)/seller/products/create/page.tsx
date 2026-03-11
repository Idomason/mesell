"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "@refinedev/react-hook-form";

export default function CreateProduct() {
  const {
    control,
    handleSubmit,
    refineCore: { onFinish, formLoading }, // Extract onFinish from refineCore
    ...formMethods
  } = useForm({
    refineCoreProps: {
      resource: "products",
      action: "create",
    },
  });

  return (
    <Form handleSubmit={handleSubmit} control={control} {...formMethods}>
      <form
        onSubmit={handleSubmit(onFinish)} // Refine's onFinish matches the signature expected by handleSubmit
        className="space-y-4"
      >
        {/* ... your FormFields */}

        <Button type="submit" disabled={formLoading}>
          {formLoading ? "Saving..." : "Save Product"}
        </Button>
      </form>
    </Form>
  );
}
