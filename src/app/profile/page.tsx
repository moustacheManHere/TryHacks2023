import { UserProfile } from "@clerk/nextjs"

const page = () => {
  return (
    <>
        <div className="flex justify-center">
            <UserProfile />
        </div>
    </>
  )
}

export default page