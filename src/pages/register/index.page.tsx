import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Header, Container, Form, FormError } from "./styles";
import { useForm } from "react-hook-form";
import { ArrowRight } from "phosphor-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

export const Register = () => {
  const registerFormSchema = z.object({
    username: z
      .string()
      .min(3, { message: "O usuário precisa ter mínimo 3 caracteres" })
      .regex(/^([a-z\\-]+)$/i, {
        message: "O usuário pode ter apenas LETRAS e HIFENs",
      })
      .transform((username) => username.toLowerCase()),
    name: z
      .string()
      .min(3, { message: "O nome precisa ter mínimo 3 caracteres" }),
  });
  type RegisterFormData = z.infer<typeof registerFormSchema>;


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),

  });

  const router = useRouter()

  useEffect(()=>{
    if(router.query.username){
      setValue('username',String(router.query.username))
    }
  },[router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })
    } catch (error) {
      if(error instanceof AxiosError && error?.response?.data?.message){
        alert(error.response.data.message)
        return
      }
      console.error(error);
      
    }
  }
  return (
    <Container>
      <Header>
        <Heading as={"strong"}>Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4}></MultiStep>
      </Header>

      <Form as={"form"} onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size={"sm"}> Nome do usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuario"
            {...register("username")}
          />
          {errors.username && (
            <FormError size={"sm"}>{errors.username.message}</FormError>
          )}
        </label>
        <label>
          <Text size={"sm"}> Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register("name")} />

          {errors.name && (
            <FormError size={"sm"}>{errors.name.message}</FormError>
          )}
        </label>
        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
};
