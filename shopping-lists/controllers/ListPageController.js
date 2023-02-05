import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as ListPageService from "../services/ListPageService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  await ListPageService.input(name);
  return requestUtils.redirectTo("/lists");
};

const viewList = async (request) => {
  const data = {
    lists: await ListPageService.fetch_all(),
  };
  return new Response(await renderFile("ListPage.eta", data), responseDetails);
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const DeactivateID = urlParts[2];
  await ListPageService.deactivate(DeactivateID);
  return requestUtils.redirectTo("/lists");
};

export { addList, deactivateList, viewList };
