import { render, screen } from "@testing-library/react";
import OrderMainCard from "@/app/admin/order/_components/OrderMainCard";
import ordersData from "@/app/admin/order/_components/orders.json";
import "@testing-library/jest-dom";
import type { Food } from "@/app/admin/order/_components/OrderFood";

type Order = {
  table: string;
  time: string;
  status: string;
  orderNumber: string;
  items: Food[];
};

const order: Order = ordersData.orders[0];

describe("OrderMainCard - JSON data", () => {
  it("renders correct order info from JSON", () => {
    render(<OrderMainCard order={order} />);
    expect(screen.getByText(order.table)).toBeInTheDocument();
    expect(screen.getByText(order.orderNumber)).toBeInTheDocument();
    expect(screen.getByText(`🕒 ${order.time}`)).toBeInTheDocument();
  });

  it("displays correct total from JSON items", () => {
    const total = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    render(<OrderMainCard order={order} />);
    expect(screen.getByText(`${total.toLocaleString()}₮`)).toBeInTheDocument();
  });

  it("renders status select and save button", () => {
    render(<OrderMainCard order={order} />);
    expect(screen.getByText("Хүлээгдэж буй")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Хадгалах" })).toBeInTheDocument();
  });
});
