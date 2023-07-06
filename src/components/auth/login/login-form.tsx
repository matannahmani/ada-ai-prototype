"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@ui/checkbox"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  findLastNonAuthRoute,
  useRouterHistory,
} from "@/hooks/use-router-history"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  email: z.string().email().min(2, {
    message: "Please enter a valid email address.",
  }),
  // remember: z.boolean().default(false).optional(),
  password: z.string().max(64).min(8, {
    message: "Please enter a password with 8-64 characters.",
  }),
})

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const history = useRouterHistory()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const router = useRouter()

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    let res: Awaited<ReturnType<typeof signIn>>
    try {
      res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        // remember: data.remember ? "true" : "false",
      })
    } catch (err) {
      console.error("Email or password is incorrect.")
    } finally {
      setIsLoading(false)
    }
    if (!res?.error) {
      toast({
        variant: "success",
        title: "Login Successfully.",
        description: "Your account has been logged in.",
      })
      const lastRoute = findLastNonAuthRoute(history)
      if (lastRoute) {
        router.refresh()
        router.push(lastRoute)
      } else router.push(`/`)
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "email or password is incorrect.",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium leading-none text-netural-700">
                Enter your email address
              </FormLabel>
              <FormControl>
                <Input
                  className="rounded-full"
                  placeholder="lorem@im-ada.ai"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium leading-none text-netural-700">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  className="rounded-full"
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className="flex flex-wrap items-center justify-center gap-2 space-y-2">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    // @ts-expect-error zodResolver doesn't support boolean default values
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none ">
                  <FormLabel className="text-sm font-medium leading-none text-netural-700">
                    Remember me
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div> */}
        <div className="flex mt-2 flex-wrap items-center justify-center gap-2 space-y-2">
          <Button type="submit" className="px-16">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm
