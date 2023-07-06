"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SignupSchema } from "@/shared/zod/account/signup-schema"
import { api, isTRPCClientError } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import type z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
  })

  async function onSubmit(data: z.infer<typeof SignupSchema>) {
    setIsLoading(true)
    try {
      const res = await api.account.signup.mutate(data)
      toast({
        variant: "success",
        title: "Account created Successfully.",
        description: "Your account has been created, redirecting you to login.",
      })
      void router.replace(`/login`)
    } catch (cause) {
      if (isTRPCClientError(cause)) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: cause.message,
        })
      } else
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium leading-none text-netural-700">
                Enter your full name
              </FormLabel>
              <FormControl>
                <Input
                  className="rounded-full"
                  placeholder="John Doe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                Enter your Password
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
        <FormField
          control={form.control}
          name="repassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium leading-none text-netural-700">
                Confirm your Password
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
        <Button disabled={isLoading} type="submit" className="px-16 w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Account
        </Button>
      </form>
    </Form>
  )
}

export default SignupForm
