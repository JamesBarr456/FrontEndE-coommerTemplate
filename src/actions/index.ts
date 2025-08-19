"use server";

import { addProductToApi, putProductToApi } from "@/services/products";
import {
  loginSchema,
  productSchema,
  profileSchema,
  registerSchema,
  seguritySchema,
} from "@/schemas";
import {
  loginUser,
  putPasswordUser,
  putUser,
  registerUser,
} from "@/services/users";

import { IProduct } from "@/interfaces/product";
import { revalidatePath } from "next/cache";

export async function loginAction(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  try {
    const res = await loginUser(validatedFields.data);
    return {
      success: true,
      token: res.token,
      userData: res.data,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function registerAction(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const formattedData = {
    first_name: data.first_name,
    last_name: data.last_name,
    dni: data.dni,
    number_phone: {
      areaCode: data["number_phone.areaCode"],
      number: data["number_phone.number"],
    },
    email: data.email,
    confirmEmail: data.confirmEmail,
    password: data.password,
    confirmPassword: data.confirmPassword,
  };
  const validatedFields = registerSchema.safeParse(formattedData);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const fullPhoneNumber = `${validatedFields.data.number_phone.areaCode}${validatedFields.data.number_phone.number}`;

  const newUser = {
    ...validatedFields.data,
    number_phone: fullPhoneNumber,
  };

  try {
    await registerUser(newUser);

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function profileAction(prevState: any, formData: FormData) {
  const userId = formData.get("userId") as string;
  const validatedFields = profileSchema.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    dni: formData.get("dni"),
    email: formData.get("email"),
    number_phone: formData.get("number_phone"),
    avatar: formData.get("avatar"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  try {
    const res = await putUser(userId, validatedFields.data);
    return {
      success: true,
      userData: res,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function securityAction(prevState: any, formData: FormData) {
  const userId = formData.get("userId") as string;
  const validatedFields = seguritySchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { confirmPassword, ...data_password } = validatedFields.data;
  try {
    const res = await putPasswordUser(userId, data_password);
    return {
      success: true,
      userData: res,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function addProductAction(prevState: any, formData: FormData) {
  const productId = formData.get("productId") as string | null;
  const isUpdating = !!productId;

  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    genre: formData.get("genre") as string,
    discount: formData.get("discount"),
    price: formData.get("price"),
    brand: {
      name: formData.get("brand.name"),
      image: formData.get("brand.image"),
    },
    description: formData.get("description"),
    sku: formData.get("sku"),
    stock: formData.get("stock"),
    images: formData.getAll("images"),
    size: formData.getAll("size").map(Number),
  });

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const productData = validatedFields.data;

  try {
    console.log(
      isUpdating ? "Updating product:" : "Creating new product:",
      productData
    );

    if (isUpdating) {
      putProductToApi(productId, productData);
    } else {
      addProductToApi(productData);
    }

    revalidatePath("/products");

    return {
      success: true,
      message: isUpdating
        ? "Product updated successfully"
        : "Product added successfully",
    };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
