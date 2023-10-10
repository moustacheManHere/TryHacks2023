import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <>
        <div className="flex justify-center p-12">
            <SignIn />
        </div>
    </>
  )
}

export default SignInPage