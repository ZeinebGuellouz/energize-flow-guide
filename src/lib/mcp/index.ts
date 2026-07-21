import { defineMcp } from "@lovable.dev/mcp-js";
import getContactTool from "./tools/get-contact";
import listPricingTool from "./tools/list-pricing";
import listServicesTool from "./tools/list-services";
import listBlogArticlesTool from "./tools/list-blog-articles";

export default defineMcp({
  name: "vitafit-frejus-mcp",
  title: "VitaFit Fréjus Plage",
  version: "0.1.0",
  instructions:
    "Public read-only tools about VitaFit Fréjus Plage: EMS studio services, pricing, contact info and blog articles. Use these to answer questions about the studio.",
  tools: [getContactTool, listPricingTool, listServicesTool, listBlogArticlesTool],
});
