export default function Home() {

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100">
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Welcome to Medi Assist!</h1>
        <p className="text-gray-600 mb-4">Feeling lost? We got you covered.</p>
        <hr className="border-t border-gray-300 my-4" />
        <p className="text-gray-700 mb-4">
            Follow these simple steps to upload pictures of your medicine labels and view their details.
        </p>

        <div className="step mb-6">
            <h2 className="text-xl font-semibold mb-2">Step 1: Log In</h2>
            <p>
                Log in to your account or sign up if you are a new user. Make sure you have the necessary credentials.
            </p>
        </div>

        <div className="step mb-6">
            <h2 className="text-xl font-semibold mb-2">Step 2: Navigate to Upload</h2>
            <p>
                Once logged in, navigate to the add section of the app. Look for an Upload button which accepts a file input (PNG or JPG only).
            </p>
        </div>

        <div className="step mb-6">
            <h2 className="text-xl font-semibold mb-2">Step 3: Upload Medicine Labels</h2>
            <p>
                Click the Upload button and select the picture of your medicine label from your device. You can only upload one file at any given time.
            </p>
        </div>

        <div className="step mb-6">
            <h2 className="text-xl font-semibold mb-2">Step 4: View Your Uploaded Labels</h2>
            <p>
                After uploading, go to the list section to view the list of labels you have uploaded. You should see details like the medicine name and description.
            </p>
        </div>

        <div className="step mb-6">
            <h2 className="text-xl font-semibold mb-2">Step 5: Explore Details</h2>
            <p>
                Click on each label to explore more details about the medicine. You can find information such as the name, description, and any additional details provided by our system.
            </p>
        </div>

        <div className="step">
            <h2 className="text-xl font-semibold mb-2">That is It!</h2>
            <p>
                You have successfully learned how to upload and view your medicine labels. If you have any questions, feel free to contact our support team.
            </p>
        </div>
    </div>
</div>
);
}

