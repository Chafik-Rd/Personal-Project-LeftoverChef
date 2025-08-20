import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserRound, LockKeyhole, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainBackground } from "../components/MainBackground";
export const Login = () => {
  return (
    <MainBackground className="px-6 sm:px-8 py-4 flex justify-center items-center">
      <Card className="max-w-115 w-full flex flex-col items-center text-brown-700 p-8">
        <h1 className="text-4xl font-bold mb-6">Sign in</h1>
        <form className="flex flex-col gap-4 items-center">
          <label className="max-w-75 w-full ">
            <UserRound
              size={20}
              strokeWidth={1.5}
              className="absolute my-4 ml-2"
            />
            <Input
              type="email"
              placeholder="example@bindirigu.com"
              className="peer px-8 max-w-125"
            />
          </label>
          <label className="max-w-75 w-full ">
            <LockKeyhole
              size={20}
              strokeWidth={1.5}
              className="absolute my-4 ml-2"
            />
            <Input
              type="password"
              placeholder="Password"
              className="peer px-8 max-w-125"
            />
          </label>
          <Button size="md" className="border-brown-600 text-xl w-fit">
            Login
          </Button>
        </form>
        {/* <p className="text-gray-500 mb-6">Forgot Username Password?</p>
        <div className="flex gap-3 items-center text-gray-500">
          <p>Create Your Account</p>
          <ArrowRight className="size-5" />
        </div> */}
      </Card>
    </MainBackground>
  );
};
