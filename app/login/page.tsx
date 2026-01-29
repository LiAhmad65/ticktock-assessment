import LoginForm from "@/components/login/LoginForm";
import AppIntro from "@/components/login/AppIntro";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div>
        <LoginForm />
      </div>
      <div>
        <AppIntro />
      </div>
    </div>
  );
}
