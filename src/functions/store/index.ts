import { newStoreSchema } from "./schema";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "store",
        request: {
          schemas: {
            "application/json": newStoreSchema,
          },
        },
      },
    },
    {
      http: {
        method: "get",
        path: "stores",
        cors: true,
      },
    },
    {
      http: {
        method: "get",
        path: "store",
        cors: true,
      },
    },
  ],
};
