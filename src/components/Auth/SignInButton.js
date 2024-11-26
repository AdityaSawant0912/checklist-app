import { signInAction } from '@/actions';
export default function SignInButton() {
  return (
    <form action={signInAction}>
      <button type="submit">Signin with Google</button>
    </form>
  );
}
