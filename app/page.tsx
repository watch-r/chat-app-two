import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main>
            <Button>Click Me</Button>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                ratione eveniet tenetur quam rerum voluptas dolore qui soluta
                commodi explicabo!InCapable
            </p>
            <ToggleTheme />
            {/* <RegisterForm /> */}
            {/* <LoginForm /> */}
        </main>
    );
}
