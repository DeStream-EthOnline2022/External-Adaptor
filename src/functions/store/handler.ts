import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { resStore, storeData } from "./store-data";

import { ChainLinkAdapterResult } from "src/types/Chainlink";

import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import { apiResponses } from "@libs/api-response";

const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const reqId = event.requestContext.requestId;

  const res: ChainLinkAdapterResult = {
    jobRunID: reqId,
    data: resStore,
  };
  const squareId = event.queryStringParameters?.storeId;
  const res2: ChainLinkAdapterResult = {
    jobRunID: reqId,
    data: storeData[squareId],
  };
  switch (event.httpMethod) {
    case "GET":
      switch (event.path) {
        case "/stores":
          return apiResponses._200(res);
        case `/store`:
          if (squareId == null || !storeData[squareId]) {
            return apiResponses._400({
              jobRunID: reqId,
              error: "Store not found",
            });
          }

          return apiResponses._200(res2);
      }
    case "POST":
      switch (event.path) {
        case "/store":
          // @ts-ignore
          const {squareId, storeName,addressLine1,country,postalCode } = event.body;
          // const store = event.queryStringParameters?.store;
          const params = {
            squareId: squareId,
            storeName: storeName,
            addressLine1: addressLine1,
            country: country,
            postalCode
          }
          // if (store == null || !storeData[store]) {
          //   return apiResponses._400({
          //     message: `Missing store or no data for that store`,
          //   });
          // }
          return apiResponses._200({ jobRunID: reqId, data: params });
      }
  }
};

export const main = middy(lambdaHandler)
  .use(httpJsonBodyParser())
  .use(httpErrorHandler());
