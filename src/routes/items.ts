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
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(item));
      } catch (error) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Item not found" }));
      }
      return;
    }

    if (req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const { name, status, quantity } = JSON.parse(body);

          if (!name || typeof name !== typeof "") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Ensure that name is valid" }));
            return;
          }
          if (typeof status !== typeof true) {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Ensure that status is valid" }));
            return;
          }
          if (!quantity || typeof quantity !== typeof "") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Ensure that quantity is valid" }));
            return;
          }

          const newItem = addItem(name, status, quantity);
          res.writeHead(201, { "content-type": "application/json" });
          res.end(JSON.stringify(newItem));
        } catch (error) {
          // This now successfully catches JSON syntax errors or service errors!
          res.writeHead(400, { "content-type": "application/json" });
          res.end(JSON.stringify({ error: "Unable to save item" }));
        }
      });

      return;
    }

    if (req.method === "PUT") {
      let body = "";
      req.on("data", (chunk) => {
        // adds chunks to the body gradually build the body
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          const { id, name, status, quantity } = JSON.parse(body);
          const item = updateItem(id, name, status, quantity);
          res.writeHead(204);
          res.end();
        } catch (error) {
          res.writeHead(404, { "content-type": "application/json" });
          res.end(JSON.stringify({ error: "Item not found" }));
        }
      });
      return;
    }

    if (req.method === "DELETE") {
      try {
        const item = deleteItem(id);
        res.writeHead(204);
        res.end();
      } catch (error) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Unable to delete item" }));
      }
      return;
    }
  }

  res.writeHead(405, { "content-type": "application/json" });
  res.end(JSON.stringify({ error: "Method Not Allowed" }));
};
