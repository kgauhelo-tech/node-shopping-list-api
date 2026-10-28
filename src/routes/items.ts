import { IncomingMessage, ServerResponse } from "http";

import {
  getItems,
  getItemById,
  addItem,
  deleteItem,
  updateItem,
} from "../controllers/items";

// endpoint http://localhost:3000/items

export const itemsRoute = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/items")) {
    const parts = req.url.split("/");

    const id = parts[2];

    if (req.method === "GET" && !id) {
      try {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(getItems()));
      } catch (error) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Items not found" }));
      }
      return;
    }

    if (req.method === "GET" && id) {
      try {
        const item = getItemById(id);
        res.writeHead(item ? 200 : 404, { "content-type": "application/json" });
        res.end(JSON.stringify(item || { message: "Not Found" }));
      } catch (error) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Item not found" }));
      }
      return;
    }

    if (req.method === "POST") {
      try {
        let body = "";
        req.on("data", (chunk) => {
          // adds chunks to the body gradually build the body
          body += chunk.toString();
        });
        req.on("end", () => {
          const { name, status, quantity } = JSON.parse(body);
          const newItem = addItem(name, status, quantity);
          res.writeHead(201, { "content-type": "application/json" });
          res.end(JSON.stringify(newItem));
        });
      } catch (error) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Unable to save item" }));
      }

      return;
    }

    // circle back to these two
    if (req.method === "PUT") {
      try {
      } catch (error) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Item not found" }));
      }
    }

    if (req.method === "DELETE") {
      try {
        const item = deleteItem(id);
        res.writeHead(item ? 204 : 404, { "content-type": "application/json" });
        res.end(JSON.stringify(item || { message: "item Deleted" }));
      } catch (error) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Unable to delete item" }));
      }
    }
  }

  res.writeHead(405, { "content-type": "application/json" });
  res.end(JSON.stringify({ error: "Method Not Allowed" }));
};
