import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="bg-darkBlue h-screen grid place-items-center">
      <div className="shadow-md bg-white rounded-lg p-2 w-[30rem] text-center space-y-5 !py-8">
        <h1 className="text-9xl font-bold text-blue-700">404</h1>
        <h2 className="text-3xl font-bold">Oops! Page Not Found</h2>
        <p className="px-5 text-lg text-gray-600">
          {`The page you're looking for seems to have gone on a little adventure.
          Don't worry, we'll help you find your way back home.`}
        </p>
        <Link to={"/"} className="inline-block">
          <Button colorScheme="blue" size={"lg"}>
            Go Back Home
          </Button>
        </Link>
      </div>
    </section>
  );
}
