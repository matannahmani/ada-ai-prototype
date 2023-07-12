import { env } from "@/env.mjs"
import { render } from "@react-email/render"
import { createTransport } from "nodemailer"

import { WelcomeEmail } from "@/components/email/welcome-email"

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "hello@im-ada.ai",
    clientId: env.EMAIL_CLIENT_ID,
    clientSecret: env.EMAIL_CLIENT_SECRET,
    refreshToken: env.EMAIL_REFRESH_TOKEN,
    accessToken: env.EMAIL_ACCESS_TOKEN,
  },
})

const sendVerifyEmail = async ({
  email,
  token,
  name,
}: {
  email: string
  name: string
  token: string
}) => {
  const emailHtml = render(WelcomeEmail({ jwt: token, username: name }))

  const options = {
    from: "hi@im-ada.ai",
    to: email,
    subject: "Welcome to Ada",
    html: emailHtml,
  }

  await transporter.sendMail(options)
}

export { transporter, sendVerifyEmail }
