/**
 * Inteded to be used when we are dealing with forms, wraps element within a Formprovider making form methods available within the child components
 *
 * An example would be:
 *
 * <Form formData={defaultFormdata}>
 *  <MyFormInputsComponent/>
 * </Form>
 *
 * We are then able to handle the form submiting,resetting,validating...etc within the <MyFormInputsComponent/> using the context from the formprovider
 *
 */

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { ZodSchema } from "zod";\
type FormProps<T = unknown> = {
  onSubmit?: (data: T) => void;
  children: React.ReactNode;
  formData?: T;
  schema?: ZodSchema<T>;
};
export const Form = <T,>({ children, formData, schema }: FormProps<T>) => {
  const defaultValues = formData as DefaultValues<T & FieldValues> | undefined;
  const methods = useForm<T & FieldValues>({
    defaultValues: defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
