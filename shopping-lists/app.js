import { serve } from "https://deno.land/std@0.120.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as MainPageController from "./controllers/MainPageController.js";
import * as ListPageController from "./controllers/ListPageController.js";
import * as ItemPageController from "./controllers/ItemPageController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await MainPageController.viewMainPage(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await ListPageController.viewList(request);
  } else if (
    url.pathname.match("lists/[0-9]+/deactivate") && request.method === "POST"
  ) {
    return await ListPageController.deactivateList(request);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await ListPageController.addList(request);
  } else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") {
    return await ItemPageController.viewItem(request);
  } else if (
    url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") &&
    request.method === "POST"
  ) {
    return await ItemPageController.collect(request);
  } else if (
    url.pathname.match("/lists/[0-9]+/items") && request.method === "POST"
  ) {
    return await ItemPageController.addItem(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });