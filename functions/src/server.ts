import cors from "cors";
import type { ErrorRequestHandler } from "express";
import express from "express";
import * as Firebase from "firebase-admin";
import * as functions from "firebase-functions";
import morgan from "morgan";
import routes from "./routes";

// initialize firebase
Firebase.initializeApp();
Firebase.firestore().settings({ ignoreUndefinedProperties: true });

// create the express server
const app = express();

app.use(morgan("combined", { immediate: true }));
app.use(morgan("tiny", { immediate: false }));

// automatically allow cross-origin requests
app.use(cors({ origin: true }));

// match api routes
app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, _, res) => {
  console.log("Top level error handler");
  console.error(error);
  const errorCode = parseInt(error.statusCode);
  const errorMessage = error.publicMessage as string | undefined;
  const statusCode = errorCode >= 400 && errorCode < 512 ? errorCode : 500;
  res.status(statusCode).json({
    error: {
      statusCode,
      message: errorMessage || "An error occurred.",
    },
  });
};

app.use(errorHandler);

// Expose Express API as a single Cloud Function:
exports.v1 = functions.https.onRequest(app);
