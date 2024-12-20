"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"

export function Header() {
  return (
    <div className=" p-4 border-b">
      <div className="container flex justify-between items-center">
        <div className="mx-4">AI ThumbTer</div>

        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link href="/create">Create Test</Link>
          </SignedIn>
          <SignedOut>
            <Link href="/about">About</Link>
            <Link href="/pricing">Pricing</Link>
          </SignedOut>
        </div>

        <div className="flex items-center space-x-4">
          <SignedIn>
            <UserButton/>
          </SignedIn>
          <SignedOut>
            <SignInButton/>
          </SignedOut>
          <ModeToggle/>
        </div>
        
      </div>
    </div>
  )
}