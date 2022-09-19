import { APIGatewayProxyResult } from "aws-lambda";
import { ChainLinkAdapterResult } from "src/types/Chainlink";

export const apiResponses: {
  [key: string]: (
    body: Record<string, string> | ChainLinkAdapterResult
  ) => APIGatewayProxyResult;
} = {
  _200: (body) => ({ statusCode: 200, body: JSON.stringify(body, null, 2) }),
  _400: (body) => ({ statusCode: 400, body: JSON.stringify(body, null, 2) }),
};
