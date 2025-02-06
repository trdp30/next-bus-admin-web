// import { Link } from 'react-router';

import { Email, Password } from '@containers/Auth/types';
import AuthContext from '@contexts/AuthContext';
import { Button } from 'app/components/base/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'app/components/base/ui/card';
import { Input } from 'app/components/base/ui/input';
import { Label } from 'app/components/base/ui/label';
import { useContext } from 'react';
import { triggerToast } from './Notification';

export function LoginForm() {
  const { triggerEmailPasswordLogin, triggerGoogleLogin } = useContext(AuthContext);
  const handleSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    if (email === '' || password === '') {
      triggerToast({
        variant: 'warning',
        message: {
          title: 'Login error',
          summary: 'Email and password are required',
        },
      });
      return;
    }
    await triggerEmailPasswordLogin({ email: email as Email, password: password as Password });
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmission}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/* <Link to="/login" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full" onClick={triggerGoogleLogin}>
            Login with Google
          </Button>
        </form>
        {/* <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/login" className="underline">
            Sign up
          </Link>
        </div> */}
      </CardContent>
    </Card>
  );
}
