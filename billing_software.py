import tkinter as tk
from tkinter import ttk, messagebox
from datetime import datetime
import os

# Product list with accurate price (from design)
products = {
    "101": ("Laptop", 95000),
    "102": ("Mouse", 799),
    "103": ("Keyboard", 1199),
    "104": ("Monitor", 10500),
    "105": ("Pen Drive", 1699),
    "106": ("Printer", 35000),
    "107": ("MIVI", 3500),
}

cart = []

def update_product_info(event=None):
    code = code_entry.get().strip()
    if code in products:
        name_entry.config(state="normal")
        price_entry.config(state="normal")
        name_entry.delete(0, tk.END)
        price_entry.delete(0, tk.END)
        name_entry.insert(0, products[code][0])
        price_entry.insert(0, str(products[code][1]))
        name_entry.config(state="readonly")
        price_entry.config(state="readonly")
    else:
        name_entry.config(state="normal")
        price_entry.config(state="normal")
        name_entry.delete(0, tk.END)
        price_entry.delete(0, tk.END)
        name_entry.config(state="readonly")
        price_entry.config(state="readonly")

def add_item():
    code = code_entry.get().strip()
    qty_val = qty_entry.get().strip()

    if code not in products:
        messagebox.showerror("Error", "Invalid Product Code!")
        return

    try:
        qty = int(qty_val)
        if qty <= 0:
            raise ValueError
        item, price = products[code]
        total = price * qty
        cart.append((code, item, price, qty, total))
        tree.insert("", "end", values=(code, item, price, qty, total))
        clear_entries()
    except ValueError:
        messagebox.showerror("Error", "Enter valid quantity!")

def clear_entries():
    code_entry.delete(0, tk.END)
    qty_entry.delete(0, tk.END)
    name_entry.config(state="normal")
    price_entry.config(state="normal")
    name_entry.delete(0, tk.END)
    price_entry.delete(0, tk.END)
    name_entry.config(state="readonly")
    price_entry.config(state="readonly")

def clear_all():
    global cart
    cart = []
    for item in tree.get_children():
        tree.delete(item)
    clear_entries()
    bill_text.delete("1.0", tk.END)

def generate_bill():
    if not cart:
        messagebox.showwarning("Empty", "Please add items!")
        return

    sub_total = sum(item[4] for item in cart)
    gst = sub_total * 0.18
    grand_total = sub_total + gst
    date_str = datetime.now().strftime("%d-%m-%Y %H:%M:%S")

    bill = f"{'----- GLOBAL WORLD COMPUTER -----':^50}\n"
    bill += f"{'Date: ' + date_str:^50}\n"
    bill += "-" * 50 + "\n"
    bill += f"{'Code':<6}{'Item':<16}{'Price':<8}{'Qty':<6}{'Total':<10}\n"
    bill += "-" * 50 + "\n"

    for c, itm, pr, qt, tot in cart:
        bill += f"{c:<6}{itm:<16}{pr:<8}{qt:<6}{tot:<10}\n"

    bill += "-" * 50 + "\n"
    bill += f"{'Sub Total':>25} : ₹ {sub_total:>10,.2f}\n"
    bill += f"{'GST (18%)':>25} : ₹ {gst:>10,.2f}\n"
    bill += f"{'Grand Total':>25} : ₹ {grand_total:>10,.2f}\n"
    bill += "-" * 50 + "\n"
    bill += f"{'Thank you for shopping!':^50}\n"

    bill_text.delete("1.0", tk.END)
    bill_text.insert(tk.END, bill)

def save_bill():
    content = bill_text.get("1.0", tk.END).strip()
    if not content:
        messagebox.showwarning("Warning", "Generate bill first before saving!")
        return
    filename = f"Bill_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
    messagebox.showinfo("Saved", f"Bill saved successfully as {filename}")

# --- GUI Setup ---
root = tk.Tk()
root.title("Billing_Software - Sudhir_React")
root.geometry("980x740")
root.configure(bg="#f0f4f8")

# Header Frame
header_frame = tk.Frame(root, bg="#f0f4f8")
header_frame.pack(fill="x", padx=20, pady=10)

title_lbl = tk.Label(header_frame, text="🛒 Billing Software ", font=("Helvetica", 22, "bold"), fg="#1e3a8a", bg="#f0f4f8")
title_lbl.pack(anchor="w")
sub_lbl = tk.Label(header_frame, text="Sudhir_React", font=("Helvetica", 13, "bold"), fg="#2563eb", bg="#f0f4f8")
sub_lbl.pack(anchor="w")

date_lbl = tk.Label(header_frame, text=f"Date & Time\n{datetime.now().strftime('%d-%m-%Y %H:%M:%S')}", 
                    font=("Helvetica", 10, "bold"), fg="#334155", bg="#f0f4f8", justify="right")
date_lbl.place(relx=1.0, rely=0.1, anchor="ne")

# Main Container
main_frame = tk.Frame(root, bg="#f0f4f8")
main_frame.pack(fill="both", expand=True, padx=20, pady=5)

# Left Column (Inputs, Table, Bill Preview)
left_frame = tk.Frame(main_frame, bg="#f0f4f8")
left_frame.pack(side="left", fill="both", expand=True, padx=(0, 15))

# Product Details Section
prod_frame = tk.LabelFrame(left_frame, text="Product Details", font=("Helvetica", 11, "bold"), bg="#ffffff", padx=10, pady=10)
prod_frame.pack(fill="x", pady=(0, 10))

tk.Label(prod_frame, text="Product Code:", font=("Helvetica", 10), bg="#ffffff").grid(row=0, column=0, sticky="w", pady=4)
code_entry = tk.Entry(prod_frame, font=("Helvetica", 10), width=28)
code_entry.grid(row=0, column=1, pady=4, padx=10)
code_entry.bind("<KeyRelease>", update_product_info)

tk.Label(prod_frame, text="Product Name:", font=("Helvetica", 10), bg="#ffffff").grid(row=1, column=0, sticky="w", pady=4)
name_entry = tk.Entry(prod_frame, font=("Helvetica", 10), width=28, state="readonly")
name_entry.grid(row=1, column=1, pady=4, padx=10)

tk.Label(prod_frame, text="Price (₹):", font=("Helvetica", 10), bg="#ffffff").grid(row=2, column=0, sticky="w", pady=4)
price_entry = tk.Entry(prod_frame, font=("Helvetica", 10), width=28, state="readonly")
price_entry.grid(row=2, column=1, pady=4, padx=10)

tk.Label(prod_frame, text="Quantity:", font=("Helvetica", 10), bg="#ffffff").grid(row=3, column=0, sticky="w", pady=4)
qty_entry = tk.Entry(prod_frame, font=("Helvetica", 10), width=28)
qty_entry.grid(row=3, column=1, pady=4, padx=10)

# Treeview / Table
cols = ("Code", "Item Name", "Price (₹)", "Quantity", "Total (₹)")
tree = ttk.Treeview(left_frame, columns=cols, show="headings", height=5)
for col in cols:
    tree.heading(col, text=col)
    tree.column(col, anchor="center", width=100)
tree.column("Item Name", width=140, anchor="w")
tree.pack(fill="x", pady=(0, 10))

# Bill Preview Section
tk.Label(left_frame, text="Bill Preview", font=("Helvetica", 11, "bold"), bg="#f0f4f8", anchor="w").pack(fill="x")
bill_text = tk.Text(left_frame, font=("Courier", 9), height=14, bg="#ffffff", relief="solid", bd=1)
bill_text.pack(fill="both", expand=True, pady=5)

# Right Column (Buttons)
right_frame = tk.Frame(main_frame, bg="#f0f4f8", width=180)
right_frame.pack(side="right", fill="y")

btn_font = ("Helvetica", 10, "bold")

tk.Button(right_frame, text="Add Item", font=btn_font, bg="#16a34a", fg="white", width=16, height=2, relief="flat", command=add_item).pack(pady=4)
tk.Button(right_frame, text="Generate Bill", font=btn_font, bg="#2563eb", fg="white", width=16, height=2, relief="flat", command=generate_bill).pack(pady=4)
tk.Button(right_frame, text="Clear All", font=btn_font, bg="#ef4444", fg="white", width=16, height=2, relief="flat", command=clear_all).pack(pady=4)
tk.Button(right_frame, text="Exit", font=btn_font, bg="#9333ea", fg="white", width=16, height=2, relief="flat", command=root.quit).pack(pady=4)

tk.Label(right_frame, text="", bg="#f0f4f8", height=2).pack() # Spacer

tk.Button(right_frame, text="💾 Save Bill (TXT)", font=btn_font, bg="#f59e0b", fg="white", width=16, height=2, relief="flat", command=save_bill).pack(pady=4)
tk.Button(right_frame, text="🖨 Print Bill", font=btn_font, bg="#0284c7", fg="white", width=16, height=2, relief="flat", command=save_bill).pack(pady=4)
tk.Button(right_frame, text="📄 New Bill", font=btn_font, bg="#059669", fg="white", width=16, height=2, relief="flat", command=clear_all).pack(pady=4)

root.mainloop()