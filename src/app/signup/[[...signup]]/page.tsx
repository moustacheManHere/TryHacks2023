import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <>
        <div className="flex justify-center p-12">
            <SignUp />
        </div>
    </>
  )
}

export default SignUpPage