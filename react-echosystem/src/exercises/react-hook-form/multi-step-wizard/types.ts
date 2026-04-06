export type FormValues = {
  // step1
  email: string;
  password: string;
  passwordConfirm: string;
  // step2
  fullName: string;
  birthday: string;
  gender: "male" | "female" | "other" | "";
  // step3
  zip: string;
  prefecture: string;
  city: string;
  street: string;
};

export const defaultValues: FormValues = {
  email: "",
  password: "",
  passwordConfirm: "",
  fullName: "",
  birthday: "",
  gender: "",
  zip: "",
  prefecture: "",
  city: "",
  street: "",
};
