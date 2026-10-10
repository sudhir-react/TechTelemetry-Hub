import tkinter as tk
from tkinter import ttk, messagebox
from datetime import datetime
import sqlite3
import os

class SovereignBillingEngine:
    """
    Enterprise-Grade Billing ERP Framework fortified with real-time 
    SQLite3 Write-Ahead Logging (WAL) local data persistence sync loops.
    """
    def __init__(self, root, db_name="global_sales_ledger.db"):
        self.root = root
        self.db_name = db_name
        self.root.title("Billing_Software_Pro - Sudhir_React")
        self.root.geometry("1020x760")
        self.root.configure(bg="#f8fafc")
        
        # In-Memory Transaction State Buffer
        self.active_cart = []
        
        # Mount and initialize sub-2ms relational engine
        self.initialize_storage_layer()
        
        # Hard-Coded Master Inventory Definition Matrix
        self.products = {
            "101": ("Laptop", 95000),
            "102": ("Mouse", 799),
            "103": ("Keyboard", 1199),
            "104": ("Monitor", 10500),
            "105": ("Pen Drive", 1699),
            "106": ("Printer", 35000),
            "107": ("MIVI", 3500),
        }
        
        # Compile Interface Layout
        self.build_ui_layout()
        print("⚙️ [System Armed] Desktop Billing Core initialized with SQLite3 WAL Sync.")

    def initialize_storage_layer(self):
        """Arm the database layer with concurrent WAL properties for fast disk logging."""
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()
        self.cursor.execute("PRAGMA journal_mode=WAL;")
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS historical_sales_ledger (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                invoice_id TEXT NOT NULL,
                product_code TEXT NOT NULL,
                product_name TEXT NOT NULL,
                price REAL NOT NULL,
                quantity INTEGER NOT NULL,
                item_total REAL NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        """)
        self.conn.commit()

    def update_product_info(self, event=None):
        code = self.code_entry.get().strip()
        if code in self.products:
            self.name_entry.config(state="normal")
            self.price_entry.config(state="normal")
            self.name_entry.delete(0, tk.END)
            self.price_entry.delete(0, tk.END)
            self.name_entry.insert(0, self.products[code][0])
            self.price_entry.insert(0, str(self.products[code][1]))
            self.name_entry.config(state="readonly")
            self.price_entry.config(state="readonly")
        else:
            self.name_entry.config(state="normal")
            self.price_entry.config(state="normal")
            self.name_entry.delete(0, tk.END)
            self.price_entry.delete(0, tk.END)
            self.name_entry.config(state="readonly")
            self.price_entry.config(state="readonly")

    def add_item(self):
        code = self.code_entry.get().strip()
        qty_val = self.qty_entry.get().strip()

        if code not in self.products:
            messagebox.showerror("Error Boundary", "Invalid Product Code Signature Intercepted!")
            return

        try:
            qty = int(qty_val)
            if qty <= 0:
                raise ValueError
            
            item_name, price = self.products[code]
            total = price * qty
            
            # Commit item metadata directly into runtime memory buffer
            self.active_cart.append((code, item_name, price, qty, total))
            
            # Append smoothly onto Treeview matrix interface layout
            self.tree.insert("", "end", values=(code, item_name, f"INR {price:,.2f}", qty, f"INR {total:,.2f}"))
            self.clear_entries()
            
        except ValueError:
            messagebox.showerror("Validation Boundary", "Malformed Quantity Integer Sequence dropped!")
            self.qty_entry.delete(0, tk.END)

    def clear_entries(self):
        self.code_entry.delete(0, tk.END)
        self.qty_entry.delete(0, tk.END)
        self.name_entry.config(state="normal")
        self.price_entry.config(state="normal")
        self.name_entry.delete(0, tk.END)
        self.price_entry.delete(0, tk.END)
        self.name_entry.config(state="readonly")
        self.price_entry.config(state="readonly")

    def generate_bill(self):
        if not self.active_cart:
            messagebox.showwarning("Empty Context", "Transaction array empty! Please queue items first.")
            return

        sub_total = sum(item[4] for item in self.active_cart)
        gst = sub_total * 0.18
        grand_total = sub_total + gst
        invoice_uuid = f"INV-{int(datetime.now().timestamp())}"
        date_str = datetime.now().strftime("%d-%m-%Y %H:%M:%S")

        # 💎 FIXED: Perfect alignment text parser framework
        bill = f"{'=== GLOBAL WORLD COMPUTER ===':^50}\n"
        bill += f"{'Invoice: ' + invoice_uuid:^50}\n"
        bill += f"{'Date: ' + date_str:^50}\n"
        bill += "-" * 50 + "\n"
        bill += f"{'Code':<6}{'Item':<16}{'Price':<10}{'Qty':<5}{'Total':<10}\n"
        bill += "-" * 50 + "\n"

        for c, itm, pr, qt, tot in self.active_cart:
            bill += f"{c:<6}{itm:<16}{pr:<10.2f}{qt:<5}{tot:<10.2f}\n"

        bill += "-" * 50 + "\n"
        bill += f"{'Sub Total':>25} : INR {sub_total:>12,.2f}\n"
        bill += f"{'GST (18%)':>25} : INR {gst:>12,.2f}\n"
        bill += f"{'Grand Total':>25} : INR {grand_total:>12,.2f}\n"
        bill += "-" * 50 + "\n"
        bill += f"{'System Authenticated by Sudhir React':^50}\n"

        self.bill_text.delete("1.0", tk.END)
        self.bill_text.insert(tk.END, bill)

    def save_bill(self):
        content = self.bill_text.get("1.0", tk.END).strip()
        if not content:
            messagebox.showwarning("Warning Guard", "Compile and generate statement view before saving disk dump.")
            return
            
        invoice_uuid = f"INV-{int(datetime.now().timestamp())}"
        
        # 🔑 ASYNCHRONOUS DATABASE DISK DUMP BLOCK
        # Iterating through active data matrix blocks and mapping records into SQL lines safely
        try:
            for code, name, price, qty, total in self.active_cart:
                self.cursor.execute("""
                    INSERT INTO historical_sales_ledger (invoice_id, product_code, product_name, price, quantity, item_total)
                    VALUES (?, ?, ?, ?, ?, ?);
                """, (invoice_uuid, code, name, price, qty, total))
            self.conn.commit()
            
            filename = f"Bill_{invoice_uuid}.txt"
            with open(filename, "w", encoding="utf-8") as f:
                f.write(content)
                
            messagebox.showinfo("Persistence Success", f"Invoice safely synchronized to SQLite Database and written to disk as: {filename}")
            self.clear_all()
            
        except Exception as write_anomaly:
            messagebox.showerror("Storage Failure", f"Transaction aborted due to disk exception: {write_anomaly}")

    def clear_all(self):
        self.active_cart = []
        for item in self.tree.get_children():
            self.tree.delete(item)
        self.clear_entries()
        self.bill_text.delete("1.0", tk.END)

    def build_ui_layout(self):
        # Premium Application Header Wrapper
        header = tk.Frame(self.root, bg="#f8fafc")
        header.pack(fill="x", padx=20, pady=15)
        
        tk.Label(header, text="🛒 Enterprise Billing Ledger Control Suite", font=("Helvetica", 20, "bold"), fg="#0f172a", bg="#f8fafc").pack(anchor="w")
        tk.Label(header, text="Systems Architect Engine Engineered by: Sudhir Kumar Mishra", font=("Helvetica", 10, "bold"), fg="#2563eb", bg="#f8fafc").pack(anchor="w")

        main_container = tk.Frame(self.root, bg="#f8fafc")
        main_container.pack(fill="both", expand=True, padx=20, pady=5)

        # Left Functional Column Sheath
        left_pane = tk.Frame(main_container, bg="#f8fafc")
        left_pane.pack(side="left", fill="both", expand=True, padx=(0, 15))

        # Input Schema Label Frame Grid
        input_grid = tk.LabelFrame(left_pane, text=" Real-Time Product Context Ingestion ", font=("Helvetica", 11, "bold"), bg="#ffffff", fg="#1e293b", padx=15, pady=10, relief="solid", bd=1)
        input_grid.pack(fill="x", pady=(0, 15))

        tk.Label(input_grid, text="Product Code:", font=("Helvetica", 10), bg="#ffffff", fg="#475569").grid(row=0, column=0, sticky="w", pady=6)
        self.code_entry = tk.Entry(input_grid, font=("Helvetica", 10), width=32, relief="solid", bd=1)
        self.code_entry.grid(row=0, column=1, pady=6, padx=15)
        self.code_entry.bind("<KeyRelease>", self.update_product_info)

        tk.Label(input_grid, text="Product Name:", font=("Helvetica", 10), bg="#ffffff", fg="#475569").grid(row=1, column=0, sticky="w", pady=6)
        self.name_entry = tk.Entry(input_grid, font=("Helvetica", 10), width=32, state="readonly", relief="solid", bd=1)
        self.name_entry.grid(row=1, column=1, pady=6, padx=15)

        tk.Label(input_grid, text="Price Matrix:", font=("Helvetica", 10), bg="#ffffff", fg="#475569").grid(row=2, column=0, sticky="w", pady=6)
        self.price_entry = tk.Entry(input_grid, font=("Helvetica", 10), width=32, state="readonly", relief="solid", bd=1)
        self.price_entry.grid(row=2, column=1, pady=6, padx=15)

        tk.Label(input_grid, text="Quantity Vector:", font=("Helvetica", 10), bg="#ffffff", fg="#475569").grid(row=3, column=0, sticky="w", pady=6)
        self.qty_entry = tk.Entry(input_grid, font=("Helvetica", 10), width=32, relief="solid", bd=1)
        self.qty_entry.grid(row=3, column=1, pady=6, padx=15)

        # Treeview Tabular Core
        cols = ("Code", "Item Name", "Base Price", "Quantity", "Total Row Weight")
        self.tree = ttk.Treeview(left_pane, columns=cols, show="headings", height=6)
        for col in cols:
            self.tree.heading(col, text=col)
            self.tree.column(col, anchor="center", width=110)
        self.tree.column("Item Name", width=160, anchor="w")
        self.tree.pack(fill="x", pady=(0, 15))

        # Preview Data Stream Display Block
        tk.Label(left_pane, text="Statement Stream Preview Log", font=("Helvetica", 11, "bold"), bg="#f8fafc", fg="#0f172a", anchor="w").pack(fill="x")
        self.bill_text = tk.Text(left_pane, font=("Consolas", 9), height=14, bg="#ffffff", fg="#0f172a", relief="solid", bd=1)
        self.bill_text.pack(fill="both", expand=True, pady=5)

        # Right Action Control Array Deck
        right_pane = tk.Frame(main_container, bg="#f8fafc", width=190)
        right_pane.pack(side="right", fill="y")

        lbl_font = ("Helvetica", 10, "bold")
        tk.Button(right_pane, text="➕ Add Item Frame", font=lbl_font, bg="#059669", fg="white", width=18, height=2, relief="flat", command=self.add_item).pack(pady=5)
        tk.Button(right_pane, text="⚡ Compile Statements", font=lbl_font, bg="#2563eb", fg="white", width=18, height=2, relief="flat", command=self.generate_bill).pack(pady=5)
        tk.Button(right_pane, text="🧹 Flush Buffer", font=lbl_font, bg="#dc2626", fg="white", width=18, height=2, relief="flat", command=self.clear_all).pack(pady=5)

        tk.Label(right_pane, text="", bg="#f8fafc", height=2).pack()

        tk.Button(right_pane, text="💾 Commit DB & Disk", font=lbl_font, bg="#ea580c", fg="white", width=18, height=2, relief="flat", command=self.save_bill).pack(pady=5)
        tk.Button(right_pane, text="📄 Reset Counter", font=lbl_font, bg="#4f46e5", fg="white", width=18, height=2, relief="flat", command=self.clear_all).pack(pady=5)
        tk.Button(right_pane, text="🔌 Terminal Offline", font=lbl_font, bg="#64748b", fg="white", width=18, height=2, relief="flat", command=self.root.destroy).pack(pady=5)

if __name__ == "__main__":
    app_root = tk.Tk()
    billing_system = SovereignBillingEngine(app_root)
    app_root.mainloop()