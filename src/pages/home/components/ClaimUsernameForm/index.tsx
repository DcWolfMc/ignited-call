import { Button, TextInput, Text,  } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from "zod";
import { Form, FormAnnotation } from "./styles";
import { useRouter } from "next/router";
const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "O usuário precisa ter mínimo 3 caracteres" })
    .regex(/^([a-z\\-]+)$/i, {
      message: "O usuário pode ter apenas LETRAS e HIFENs",
    })
    .transform((username) => username.toLowerCase()),
});
type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export const ClaimUsernameForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>(
    {
        resolver: zodResolver(claimUsernameFormSchema)
    }
  );
  
  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const {username} = data
    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size={"sm"}
          prefix="ignite.com/"
          placeholder="seu-usuário"
          {...register("username")}
        />
        <Button size={"sm"} type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size={"sm"}>
          {errors.username
            ? errors.username.message
            : "Digite o nome do usuário desejado."}
        </Text>
      </FormAnnotation>
    </>
  );
};
