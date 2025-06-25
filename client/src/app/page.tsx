import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">
      <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
      <ProfileCard />
      <Button className="bg-blue-500 text-white">Button</Button>
    </div>
  );
}