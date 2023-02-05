import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as ItemPageService from "../services/ItemPageService.js";
import * as ListPageService from "../services/ListPageService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addItem = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const id = urlParts[2];
  await ItemPageService.inputItem(id, name);
  return requestUtils.redirectTo(`/lists/${id}`);
};

const collect = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const id = urlParts[2];
  const ItemID = urlParts[4];
  await ItemPageService.collected(ItemID);
  return requestUtils.redirectTo(`/lists/${id}`);
};

const viewItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const id = urlParts[2];
  const data = {
    ListName: await ListPageService.findbyIDList(id),
    ItemsInList: await ItemPageService.findbyIDItem(id),
  };
  return new Response(await renderFile("ItemPage.eta", data), responseDetails);
};

export { addItem, collect, viewItem };
