import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- In-Memory Database ---
let tables = [
  { id: 1, table_number: 1, status: "Livre", capacity: 4 },
  { id: 2, table_number: 2, status: "Ocupada", capacity: 4 },
  { id: 3, table_number: 3, status: "Livre", capacity: 4 },
  { id: 4, table_number: 4, status: "Livre", capacity: 4 },
  { id: 5, table_number: 5, status: "Livre", capacity: 4 },
  { id: 6, table_number: 6, status: "Ocupada", capacity: 6 },
  { id: 7, table_number: 7, status: "Livre", capacity: 6 },
  { id: 8, table_number: 8, status: "Livre", capacity: 2 },
  { id: 9, table_number: 9, status: "Livre", capacity: 2 },
  { id: 10, table_number: 10, status: "Livre", capacity: 8 },
];

let customerTabs = [
  { id: 1, table_id: 2, client_name: "João Silva", client_phone: "123456789", status: "Aberta", opened_at: new Date().toISOString(), dynamic_waiter_tax_percent: 10 },
  { id: 2, table_id: 6, client_name: "Maria Souza", client_phone: "987654321", status: "Aberta", opened_at: new Date().toISOString(), dynamic_waiter_tax_percent: 10 },
];

let products = [
  { id: 1, name: "Coca Cola", price: 5.0, category: "Drinks", description: "Lata 350ml", print_sector_id: 1, active: true, image_url: "" },
  { id: 2, name: "Cerveja", price: 8.0, category: "Drinks", description: "Garrafa 600ml", print_sector_id: 1, active: true, image_url: "" },
  { id: 3, name: "Hambúrguer", price: 25.0, category: "Food", description: "Hambúrguer de carne com queijo", print_sector_id: 2, active: true, image_url: "" },
  { id: 4, name: "Batata Frita", price: 15.0, category: "Food", description: "Porção grande de batata frita", print_sector_id: 2, active: true, image_url: "" },
];

let orderItems = [
  { id: 1, tab_id: 1, product_id: 1, quantity: 2, unit_price: 5.0, unique_notes: "Sem gelo" },
  { id: 2, tab_id: 1, product_id: 3, quantity: 1, unit_price: 25.0, unique_notes: "" },
  { id: 3, tab_id: 2, product_id: 2, quantity: 3, unit_price: 8.0, unique_notes: "" },
];

let printSectors = [
  { id: 1, name: "Bar", ip_address: "192.168.1.10" },
  { id: 2, name: "Kitchen", ip_address: "192.168.1.11" },
];

let nextTabId = 3;
let nextOrderItemId = 4;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- API Routes ---

  // Get all tables
  app.get("/api/tables", (req, res) => {
    res.json(tables);
  });

  // Create a new table
  app.post("/api/tables", (req, res) => {
    const { table_number, capacity } = req.body;
    const newTable = {
      id: tables.length > 0 ? Math.max(...tables.map(t => t.id)) + 1 : 1,
      table_number: table_number || (tables.length > 0 ? Math.max(...tables.map(t => t.table_number)) + 1 : 1),
      status: "Livre",
      capacity: capacity || 4
    };
    tables.push(newTable);
    res.json(newTable);
  });

  // Get active tabs for a table
  app.get("/api/tables/:id/tabs", (req, res) => {
    const tableId = parseInt(req.params.id);
    const tabs = customerTabs.filter(t => t.table_id === tableId && t.status === "Aberta");
    res.json(tabs);
  });

  // Open a new tab
  app.post("/api/tabs", (req, res) => {
    const { table_id, client_name, client_phone } = req.body;
    const newTab = {
      id: nextTabId++,
      table_id,
      client_name: client_name || "Comanda Principal",
      client_phone: client_phone || "",
      status: "Aberta",
      opened_at: new Date().toISOString(),
      dynamic_waiter_tax_percent: 10
    };
    customerTabs.push(newTab);
    
    // Update table status
    const table = tables.find(t => t.id === table_id);
    if (table) table.status = "Ocupada";

    res.json(newTab);
  });

  // Get all products
  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  // Get all menu items (alias for products)
  app.get("/api/menu", (req, res) => {
    res.json(products);
  });

  // Update menu item status
  app.patch("/api/menu/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { active } = req.body;
    const product = products.find(p => p.id === id);
    if (product) {
      product.active = active;
      res.json(product);
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  });

  // Add item to tab
  app.post("/api/tabs/:id/items", (req, res) => {
    const tabId = parseInt(req.params.id);
    const { product_id, quantity, unique_notes } = req.body;
    const product = products.find(p => p.id === product_id);
    
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    const newItem = {
      id: nextOrderItemId++,
      tab_id: tabId,
      product_id,
      quantity,
      unit_price: product.price,
      unique_notes: unique_notes || ""
    };
    orderItems.push(newItem);
    res.json(newItem);
  });

  // Get tab details with items
  app.get("/api/tabs/:id", (req, res) => {
    const tabId = parseInt(req.params.id);
    const tab = customerTabs.find(t => t.id === tabId);
    if (!tab) return res.status(404).json({ error: "Comanda não encontrada" });

    const items = orderItems.filter(i => i.tab_id === tabId).map(item => {
      const product = products.find(p => p.id === item.product_id);
      return { ...item, product };
    });

    res.json({ ...tab, items });
  });

  // Update tab (e.g. tax percent)
  app.put("/api/tabs/:id", (req, res) => {
    const tabId = parseInt(req.params.id);
    const { dynamic_waiter_tax_percent } = req.body;
    const tab = customerTabs.find(t => t.id === tabId);
    if (!tab) return res.status(404).json({ error: "Comanda não encontrada" });

    if (dynamic_waiter_tax_percent !== undefined) {
      tab.dynamic_waiter_tax_percent = dynamic_waiter_tax_percent;
    }
    res.json(tab);
  });

  // Close tab
  app.post("/api/tabs/:id/close", (req, res) => {
    const tabId = parseInt(req.params.id);
    const tab = customerTabs.find(t => t.id === tabId);
    if (!tab) return res.status(404).json({ error: "Comanda não encontrada" });

    tab.status = "Fechada";

    // Check if table has other open tabs
    const otherOpenTabs = customerTabs.filter(t => t.table_id === tab.table_id && t.status === "Aberta");
    if (otherOpenTabs.length === 0) {
      const table = tables.find(t => t.id === tab.table_id);
      if (table) table.status = "Livre";
    }

    res.json(tab);
  });

  // Get all active tabs (for Admin)
  app.get("/api/active-tabs", (req, res) => {
    const activeTabs = customerTabs.filter(t => t.status === "Aberta").map(tab => {
      const table = tables.find(t => t.id === tab.table_id);
      const items = orderItems.filter(i => i.tab_id === tab.id);
      const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
      return { ...tab, table_number: table?.table_number, subtotal };
    });
    res.json(activeTabs);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
