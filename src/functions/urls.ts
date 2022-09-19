let id: string;

type StoreUrls = {
  stores: "/stores";
  store: `/store/${typeof id}`;
  newStore: "/new";
};

export type Urls = StoreUrls;
