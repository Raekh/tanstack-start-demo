import { createMiddleware, json } from "@tanstack/react-start";

const loggingMiddleWare = createMiddleware()
  .client(async ({ next }) => {
    console.log("Client middleware");

    return next({
      sendContext: {
        somethingFromTheClient: { hello: "world" },
      },
    });
  })
  .server(async ({ next, context }) => {
    console.log(
      "Server here, logging something from the client: ",
      context.somethingFromTheClient.hello,
    );

    return next({
      context: {
        theAnswer: 42 as const,
      },
    });
  });

export const userRequiredMiddleware = createMiddleware()
  .middleware([loggingMiddleWare])
  .server(async ({ next, context }) => {
    if (!context.somethingFromTheClient) {
      throw json({ message: "Something went wrong" }, { status: 401 });
    }

    console.log("The answer is ", context.theAnswer);

    return next({
      context: {
        theAnswer: context.theAnswer,
      },
    });
  });
