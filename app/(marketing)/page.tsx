import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src='/diary-image.jpg' fill alt="diary-image" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          하루에 한 편, 당신의 이야기를 들려주세요.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
            <SignUpButton mode="modal" afterSignInUrl="/diary" afterSignUpUrl="/diary">
                <Button size='lg' variant='rose' className="w-full">
                  무료로 시작하기
                </Button>
              </SignUpButton>
              <SignInButton mode="modal" afterSignInUrl="/diary" afterSignUpUrl="/diary">
                <Button size='lg' variant='primaryOutline' className="w-full">
                  이미 계정이 있어요
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size='lg' variant='rose'
              className="w-full" asChild>
                <Link href='/diary'>
                  계속하기
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
