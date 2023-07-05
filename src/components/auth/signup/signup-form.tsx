"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@ui/checkbox"
import { useForm } from "react-hook-form"
import * as z from "zod"

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

const FormSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "Please enter your full name.",
    }),
    email: z.string().email().min(2, {
      message: "Please enter a valid email address.",
    }),
    password: z.string().max(64).min(8, {
      message: "Please enter a password with 8-64 characters.",
    }),
    repassword: z.string().max(64).min(8, {
      message: "Please enter a password with 8-64 characters.",
    }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords do not match.",
    path: ["repassword"],
  })

export function SignupForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
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
        <Button type="submit" className="px-16 w-full">
          Create Account
        </Button>
      </form>
    </Form>
  )
}

export default SignupForm
