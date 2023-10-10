import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";

export const SignInComponent = () => {
    return (
        <SignedOut>
            <SignInButton mode="modal">
                <button className="mx-4 relative group text-black">Sign In</button>
            </SignInButton>
        </SignedOut>
    )
}

export const SignUpComponent = () => {
    return (
        <SignedOut>
            <SignUpButton mode="modal">
                <button className="mx-4 relative group text-black">Sign Up</button>
            </SignUpButton>
        </SignedOut>
    )
}

export const SignOutComponent = () => {
    return (
        <SignedIn>
            <SignOutButton>
                <button className="mx-4 relative group text-black">Sign Out</button>
            </SignOutButton>
        </SignedIn>
    )
}