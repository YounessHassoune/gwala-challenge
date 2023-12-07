import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginType, loginSchema } from "../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

export const LoginForm = () => {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginType) => {
    console.log(values);
    // setLoading(true);
    // const { email, password } = values;
    // const user: SignInResponse | undefined = await signIn("credentials", {
    //   redirect: false,
    //   email,
    //   password,
    // });
    // setLoading(false);
    // if (user && user.ok) {
    //   router.push("/dashboard");
    // } else {
    //   toast({
    //     variant: "destructive",
    //     description: "email address or password is incorrect.",
    //   });
    // }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-right">
          <Link to="/auth/reset-password" className="font-bold">
            Forgot password?
          </Link>
        </p>
        <Button
          className="w-full"
          type="submit"
          // disabled={isLoading}
        >
          {/* {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />} */}
          login
        </Button>
        <p className="text-center">
          I don't have an account?{" "}
          <Link to="/auth/register" className="font-bold">
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
};
