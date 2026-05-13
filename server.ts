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
  { id: 1, table_id: 2, client_name: "João Silva", client_phone: "123456789", people_count: 2, status: "Aberta", opened_at: new Date().toISOString(), dynamic_waiter_tax_percent: 10, waiter_id: 1 },
  { id: 2, table_id: 6, client_name: "Maria Souza", client_phone: "987654321", people_count: 4, status: "Aberta", opened_at: new Date().toISOString(), dynamic_waiter_tax_percent: 10, waiter_id: 1 },
  { id: 3, table_id: 1, client_name: "Carlos", client_phone: "", people_count: 2, status: "Fechada", opened_at: new Date(Date.now() - 86400000).toISOString(), closed_at: new Date(Date.now() - 80000000).toISOString(), dynamic_waiter_tax_percent: 10, payment_method: "Cartão", total: 150.0, waiter_id: 1 },
  { id: 4, table_id: 3, client_name: "Ana", client_phone: "", people_count: 3, status: "Fechada", opened_at: new Date().toISOString(), closed_at: new Date().toISOString(), dynamic_waiter_tax_percent: 10, payment_method: "PIX", total: 220.0, waiter_id: 1 },
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

let customers = [
  { id: 1, name: "Carlos Funcionário", phone: "11988888888", type: "employee", balance: 0 },
  { id: 2, name: "Ana Cliente", phone: "11977777777", type: "customer", balance: 50.0 },
];

let fiadoTransactions = [
  { id: 1, customer_id: 2, amount: 50.0, type: "charge", date: new Date().toISOString(), description: "Pedido Balcão" }
];

let waiters = [
  { id: 1, name: "João Silva", cpf: "111.111.111-11", phone: "(11) 99999-9999", email: "joao@email.com", username: "joao", password: "123", commission_rate: 10, active: true },
];

let nextTabId = 3;
let nextOrderItemId = 4;
let nextCustomerId = 3;
let nextFiadoTransactionId = 2;
let nextWaiterId = 2;

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

  // Request table closure
  app.post("/api/tables/:id/request-closure", (req, res) => {
    const tableId = parseInt(req.params.id);
    const table = tables.find(t => t.id === tableId);
    if (!table) return res.status(404).json({ error: "Mesa não encontrada" });

    if (table.status !== "Ocupada") {
      return res.status(400).json({ error: "Mesa não está ocupada" });
    }

    table.status = "Em Fechamento";
    res.json(table);
  });

  // Cancel table closure
  app.post("/api/tables/:id/cancel-closure", (req, res) => {
    const tableId = parseInt(req.params.id);
    const table = tables.find(t => t.id === tableId);
    if (!table) return res.status(404).json({ error: "Mesa não encontrada" });

    if (table.status !== "Em Fechamento") {
      return res.status(400).json({ error: "Mesa não está em fechamento" });
    }

    table.status = "Ocupada";
    res.json(table);
  });

  // Get active tabs for a table
  app.get("/api/tables/:id/tabs", (req, res) => {
    const tableId = parseInt(req.params.id);
    const tabs = customerTabs.filter(t => t.table_id === tableId && t.status === "Aberta").map(tab => {
      const items = orderItems.filter(i => i.tab_id === tab.id).map(item => {
        const product = products.find(p => p.id === item.product_id);
        return { ...item, product };
      });
      const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
      return { ...tab, subtotal, items };
    });
    res.json(tabs);
  });

  // Open a new tab
  app.post("/api/tabs", (req, res) => {
    const { table_id, client_name, client_phone, people_count } = req.body;
    const newTab = {
      id: nextTabId++,
      table_id,
      client_name: client_name || "Comanda Principal",
      client_phone: client_phone || "",
      people_count: people_count || 1,
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

  // Create menu item
  app.post("/api/menu", (req, res) => {
    const { name, description, price, category, image_url, active, print_sector_id } = req.body;
    const newProduct = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name,
      description: description || "",
      price: parseFloat(price),
      category,
      print_sector_id: print_sector_id || 1,
      image_url: image_url || "",
      active: active !== undefined ? active : true
    };
    products.push(newProduct);
    res.json(newProduct);
  });

  // Update menu item
  app.put("/api/menu/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, price, category, image_url, active } = req.body;
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        name,
        description: description || "",
        price: parseFloat(price),
        category,
        image_url: image_url || "",
        active: active !== undefined ? active : products[productIndex].active
      };
      res.json(products[productIndex]);
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  });

  // Delete menu item
  app.delete("/api/menu/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  });

  // Add item to tab
  app.post("/api/tabs/:id/items", (req, res) => {
    const tabId = parseInt(req.params.id);
    const { product_id, quantity, unique_notes } = req.body;
    
    const tab = customerTabs.find(t => t.id === tabId);
    if (!tab) return res.status(404).json({ error: "Comanda não encontrada" });

    const table = tables.find(t => t.id === tab.table_id);
    if (table?.status === "Em Fechamento") {
      return res.status(400).json({ error: "Mesa em fechamento. Não é possível adicionar novos itens." });
    }

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
    const { payment_method, total } = req.body;
    const tab = customerTabs.find(t => t.id === tabId);
    if (!tab) return res.status(404).json({ error: "Comanda não encontrada" });

    tab.status = "Fechada";
    tab.closed_at = new Date().toISOString();
    tab.payment_method = payment_method || "Dinheiro";
    tab.total = total || 0;

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

  // --- Customers & Fiado ---
  app.get("/api/customers", (req, res) => {
    res.json(customers);
  });

  // --- Waiters ---
  app.get("/api/waiters", (req, res) => {
    res.json(waiters);
  });

  app.post("/api/waiters", (req, res) => {
    const { name, cpf, phone, email, username, password, commission_rate, active } = req.body;
    const newWaiter = {
      id: nextWaiterId++,
      name,
      cpf: cpf || "",
      phone: phone || "",
      email: email || "",
      username,
      password,
      commission_rate: commission_rate || 0,
      active: active !== undefined ? active : true
    };
    waiters.push(newWaiter);
    res.json(newWaiter);
  });

  app.put("/api/waiters/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = waiters.findIndex(w => w.id === id);
    if (index === -1) return res.status(404).json({ error: "Garçom não encontrado" });

    const { name, cpf, phone, email, username, password, commission_rate, active } = req.body;
    waiters[index] = {
      ...waiters[index],
      name: name !== undefined ? name : waiters[index].name,
      cpf: cpf !== undefined ? cpf : waiters[index].cpf,
      phone: phone !== undefined ? phone : waiters[index].phone,
      email: email !== undefined ? email : waiters[index].email,
      username: username !== undefined ? username : waiters[index].username,
      password: password !== undefined ? password : waiters[index].password,
      commission_rate: commission_rate !== undefined ? commission_rate : waiters[index].commission_rate,
      active: active !== undefined ? active : waiters[index].active
    };
    res.json(waiters[index]);
  });

  app.delete("/api/waiters/:id", (req, res) => {
    const id = parseInt(req.params.id);
    waiters = waiters.filter(w => w.id !== id);
    res.json({ success: true });
  });

  // --- Reports ---
  app.get("/api/reports/fiado", (req, res) => {
    const { start, end } = req.query;
    let filteredTransactions = fiadoTransactions;

    if (start && end) {
      const startDate = new Date(start as string);
      const endDate = new Date(end as string);
      endDate.setHours(23, 59, 59, 999);

      filteredTransactions = fiadoTransactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate >= startDate && tDate <= endDate;
      });
    }

    const data = filteredTransactions.map(t => {
      const customer = customers.find(c => c.id === t.customer_id);
      return { ...t, customer_name: customer?.name, customer_phone: customer?.phone };
    });
    res.json(data);
  });

  app.get("/api/reports/sales", (req, res) => {
    const { start, end } = req.query;
    let closedTabs = customerTabs.filter(t => t.status === "Fechada");

    if (start && end) {
      const startDate = new Date(start as string);
      const endDate = new Date(end as string);
      endDate.setHours(23, 59, 59, 999);

      closedTabs = closedTabs.filter(t => {
        if (!t.closed_at) return false;
        const tDate = new Date(t.closed_at);
        return tDate >= startDate && tDate <= endDate;
      });
    }
    
    const totalSales = closedTabs.reduce((sum, tab) => sum + (tab.total || 0), 0);
    const totalCommission = closedTabs.reduce((sum, tab) => {
      const subtotal = (tab.total || 0) / (1 + (tab.dynamic_waiter_tax_percent || 0) / 100);
      return sum + (tab.total || 0) - subtotal;
    }, 0);

    const today = new Date().toISOString().split('T')[0];
    const todaySales = customerTabs
      .filter(t => t.status === "Fechada" && t.closed_at && t.closed_at.startsWith(today))
      .reduce((sum, tab) => sum + (tab.total || 0), 0);

    res.json({
      totalSales,
      totalCommission,
      todaySales,
      tabsCount: closedTabs.length
    });
  });

  app.get("/api/reports/waiters", (req, res) => {
    const { start, end } = req.query;
    let closedTabs = customerTabs.filter(t => t.status === "Fechada" && t.waiter_id);

    if (start && end) {
      const startDate = new Date(start as string);
      const endDate = new Date(end as string);
      endDate.setHours(23, 59, 59, 999);

      closedTabs = closedTabs.filter(t => {
        if (!t.closed_at) return false;
        const tDate = new Date(t.closed_at);
        return tDate >= startDate && tDate <= endDate;
      });
    }
    
    const waiterStats = waiters.map(w => {
      const wTabs = closedTabs.filter(t => t.waiter_id === w.id);
      const sales = wTabs.reduce((sum, tab) => sum + (tab.total || 0), 0);
      const commission = wTabs.reduce((sum, tab) => {
        const subtotal = (tab.total || 0) / (1 + (tab.dynamic_waiter_tax_percent || 0) / 100);
        return sum + (tab.total || 0) - subtotal;
      }, 0);
      
      return {
        id: w.id,
        name: w.name,
        sales,
        commission,
        tabsCount: wTabs.length
      };
    });

    res.json(waiterStats);
  });

  app.post("/api/customers", (req, res) => {
    const { name, phone, type } = req.body;
    const newCustomer = {
      id: nextCustomerId++,
      name,
      phone: phone || "",
      type: type || "customer",
      balance: 0
    };
    customers.push(newCustomer);
    res.json(newCustomer);
  });

  // Counter Order (Balcão)
  app.post("/api/orders/counter", (req, res) => {
    const { items, payment_method, customer_id } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Pedido vazio" });
    }

    // Calculate total
    let total = 0;
    const newItems = items.map((item: any) => {
      const product = products.find(p => p.id === item.product_id);
      if (!product) throw new Error(`Produto não encontrado: ${item.product_id}`);
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      return {
        id: nextOrderItemId++,
        product_id: product.id,
        quantity: item.quantity,
        unit_price: product.price,
        unique_notes: item.unique_notes || ""
      };
    });

    // Create a closed tab for the record
    const newTab = {
      id: nextTabId++,
      table_id: 0, // 0 for balcão
      client_name: payment_method === "Fiado" ? customers.find(c => c.id === customer_id)?.name || "Balcão" : "Balcão",
      client_phone: "",
      people_count: 1,
      status: "Fechada",
      opened_at: new Date().toISOString(),
      closed_at: new Date().toISOString(),
      dynamic_waiter_tax_percent: 0,
      payment_method,
      total
    };

    customerTabs.push(newTab);
    
    newItems.forEach((item: any) => {
      item.tab_id = newTab.id;
      orderItems.push(item);
    });

    // Handle Fiado
    if (payment_method === "Fiado" && customer_id) {
      const customer = customers.find(c => c.id === customer_id);
      if (customer) {
        customer.balance += total;
        fiadoTransactions.push({
          id: nextFiadoTransactionId++,
          customer_id,
          amount: total,
          type: "charge",
          date: new Date().toISOString(),
          description: `Pedido Balcão #${newTab.id}`
        });
      }
    }

    res.json({ success: true, tab: newTab });
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
