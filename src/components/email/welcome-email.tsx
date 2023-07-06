import * as React from "react"
import { getBaseUrl } from "@/trpc/shared"
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

export const WelcomeEmail = ({
  username = "newuser",
  company = "Ada AI",
  jwt,
}: WelcomeEmailProps) => {
  const previewText = `Welcome to ${company}, ${username}!`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="my-10 mx-auto p-5 w-[465px]">
            <Section className="mt-8">
              <Img
                src={`${baseUrl}/logo.png`}
                width="96"
                height="27"
                alt="Logo"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">
              Welcome to <strong>{company}</strong>, {username}!
            </Heading>
            <Text className="text-sm">Hello {username},</Text>
            <Text className="text-sm">
              We&apos;re excited to have you onboard at{" "}
              <strong>{company}</strong>. We hope you enjoy your journey with
              us. If you have any questions or need assistance, feel free to
              reach out.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                pX={20}
                pY={12}
                className="bg-[#00A3FF] rounded text-white text-xs font-semibold no-underline text-center"
                href={`${baseUrl}/email/verify/${jwt}`}
              >
                Verify Email
              </Button>
            </Section>
            <Text className="text-sm">
              Cheers,
              <br />
              The {company} Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

interface WelcomeEmailProps {
  username?: string
  company?: string
  jwt: string
}

const baseUrl = getBaseUrl()

export default WelcomeEmail
