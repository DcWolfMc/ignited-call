import { Heading, Text } from "@ignite-ui/react";
import Image from "next/image";
import { Container, Hero, Preview } from "./styles";
import previewImage from "../../assets/app-preview.png";
import { ClaimUsernameForm } from "./components/ClaimUsernameForm";

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size={"4xl"} as={"h1"}>
          Agendamento descomplicado
        </Heading>
        <Text size={"lg"}>
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>

        <ClaimUsernameForm/>
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          height={440}
          quality={100}
          priority
          alt="Calendário simbolizando a aplicação"
        />
      </Preview>
    </Container>
  );
}
