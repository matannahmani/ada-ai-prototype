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

const FormSchema = z.object({
  email: z.string().email().min(2, {
    message: "Please enter a valid email address.",
  }),
  remember: z.boolean().default(false).optional(),
  password: z.string().max(64).min(8, {
    message: "Please enter a password with 8-64 characters.",
  }),
})

export function LoginForm() {
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
        <div className="flex flex-wrap items-center justify-center gap-2 space-y-2">
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
          <Button type="submit" className="px-16">
            Login
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm
