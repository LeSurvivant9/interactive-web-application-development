import { BackgroundBeams } from "@/components/ui/background-beams";
import RegisterForm from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center relative overflow-hidden py-12">
      <div className="relative z-10 w-full flex items-center justify-center">
        <RegisterForm />
      </div>
      <BackgroundBeams className="z-0" />
    </div>
  );
}
