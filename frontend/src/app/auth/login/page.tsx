import { BackgroundBeams } from "@/components/ui/background-beams";
import LoginForm from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center relative overflow-hidden">
      <div className="relative z-10 w-full flex items-center justify-center">
        <LoginForm />
      </div>
      <BackgroundBeams className="z-0" />
    </div>
  );
}
