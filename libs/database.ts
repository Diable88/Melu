import { createClient } from "@supabase/supabase-js"
import type { MenuItem, Order, Table } from "./types" // Assuming types are declared in a separate file

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database helper functions
export const db = {
  // Menu Items
  async getMenuItems() {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("isAvailable", true)
      .order("category", { ascending: true })

    if (error) throw error
    return data
  },

  async getMenuItemById(id: string) {
    const { data, error } = await supabase.from("menu_items").select("*").eq("id", id).single()

    if (error) throw error
    return data
  },

  async createMenuItem(item: Omit<MenuItem, "id" | "createdAt" | "updatedAt">) {
    const { data, error } = await supabase
      .from("menu_items")
      .insert([
        {
          ...item,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateMenuItem(id: string, updates: Partial<MenuItem>) {
    const { data, error } = await supabase
      .from("menu_items")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteMenuItem(id: string) {
    const { error } = await supabase.from("menu_items").delete().eq("id", id)

    if (error) throw error
  },

  // Orders
  async getOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          *,
          menu_items (*)
        )
      `)
      .order("orderTime", { ascending: false })

    if (error) throw error
    return data
  },

  async createOrder(order: Omit<Order, "id" | "orderTime">) {
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          ...order,
          order_time: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateOrderStatus(id: string, status: Order["status"]) {
    const { data, error } = await supabase
      .from("orders")
      .update({
        status,
        completed_at: status === "completed" ? new Date().toISOString() : null,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Tables
  async getTables() {
    const { data, error } = await supabase.from("tables").select("*").order("tableNumber", { ascending: true })

    if (error) throw error
    return data
  },

  async updateTableStatus(id: string, status: Table["status"]) {
    const { data, error } = await supabase.from("tables").update({ status }).eq("id", id).select().single()

    if (error) throw error
    return data
  },
}
