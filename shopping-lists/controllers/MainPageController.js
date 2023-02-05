import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as MainPageService from "../services/MainPageService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewMainPage = async () => {
  const data = {
    list_count: await MainPageService.count_lists(),
    item_count: await MainPageService.count_items(),
  };
  return new Response(await renderFile("MainPage.eta", data), responseDetails);
};

export { viewMainPage };
