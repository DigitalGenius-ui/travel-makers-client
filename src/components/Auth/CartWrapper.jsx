import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import Screen from "../../utils/Screen";
import GoBack from "../../utils/GoBack";

const CardWrapper = ({ children, headText, footLink, footText }) => {
  return (
    <section className="bg-darkBlue pb-[3rem]">
      <div className="pt-[8rem]">
        <Screen>
          <GoBack />
        </Screen>
      </div>
      <Card
        w={{ base: "100%", sm: "30rem" }}
        className="!w-[90%] sm:!w-[30rem] mx-auto my-[2rem]">
        <CardHeader textAlign="center" fontWeight="bold" fontSize="1.3rem">
          {headText}
        </CardHeader>
        <CardBody>{children}</CardBody>
        <CardFooter>
          <Link className="!text-center w-full" to={footLink}>
            <Button variant="link" fontSize="xs" fontWeight="400">
              {footText}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default CardWrapper;
