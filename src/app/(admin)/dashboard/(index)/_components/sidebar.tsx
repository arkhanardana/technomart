"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Tag,
  Building,
  Home,
  MapPin,
  Package,
  Package2,
  ShoppingCart,
  Users2,
  Menu,
  Rabbit,
} from "lucide-react";
import FormLogout from "./form-logout";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {!isOpen && (
        <button
          onClick={handleOpenSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-600 text-white shadow-lg sm:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 sm:hidden"
          onClick={handleCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 flex-col border-r border-gray-200 bg-white shadow-sm transition-transform duration-300 ease-in-out sm:flex ${
          isOpen ? "flex translate-x-0" : "hidden -translate-x-full sm:translate-x-0"
        }`}
      >
        <nav className="flex flex-col gap-2 px-4 py-6">
          <Link
            href="#"
            className="flex h-12 items-center gap-3 rounded-lg bg-blue-600 px-4 text-white"
            onClick={handleCloseSidebar}
          >
            <Package2 className="h-5 w-5" />
            <span className="text-base font-semibold">Techno Mart</span>
          </Link>

          <div className="w-full h-px bg-gray-200 my-3" />

          <Link
            href="#"
            className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            onClick={handleCloseSidebar}
          >
            <Home className="h-5 w-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>

          <Link
            href="/dashboard/categories"
            className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            onClick={handleCloseSidebar}
          >
            <Tag className="h-5 w-5" />
            <span className="text-sm font-medium">Categories</span>
          </Link>

          <Link
            href="/dashboard/locations"
            className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            onClick={handleCloseSidebar}
          >
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Locations</span>
          </Link>

          <Link
            href="/dashboard/brands"
            className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            onClick={handleCloseSidebar}
          >
            <Building className="h-5 w-5" />
            <span className="text-sm font-medium">Brands</span>
          </Link>

          <Link
            href="/dashboard/products"
            className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            onClick={handleCloseSidebar}
          >
            <Package className="h-5 w-5" />
            <span className="text-sm font-medium">Products</span>
          </Link>

          <Link
            href="/dashboard/orders"
            className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            onClick={handleCloseSidebar}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="text-sm font-medium">Orders</span>
          </Link>

          <Link
            href="/dashboard/customers"
            className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            onClick={handleCloseSidebar}
          >
            <Users2 className="h-5 w-5" />
            <span className="text-sm font-medium">Customers</span>
          </Link>
        </nav>
        <FormLogout />
      </aside>
    </>
  );
}
