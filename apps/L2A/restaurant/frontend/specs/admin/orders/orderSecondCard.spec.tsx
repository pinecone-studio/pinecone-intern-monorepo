import { render, screen } from "@testing-library/react";
import OrderSecondCard from "@/app/admin/orders/_components/OrderSecondCard";
import ordersData from "@/app/admin/orders/_components/orders.json";
import "@testing-library/jest-dom";
import type { Food } from "@/app/admin/orders/_components/OrderFood";

type Order = {
  table: string;
  time: string;
  status: string;
  orderNumber: string;
  items: Food[];
};

const order: Order = ordersData.orders[0];

describe("OrderSecondCard - using real JSON data", () => {
  it("renders order info from JSON", () => {
    render(<OrderSecondCard order={order} />);

    expect(screen.getByText(order.table)).toBeInTheDocument();
    expect(screen.getByText(order.orderNumber)).toBeInTheDocument();
    expect(screen.getByText(`🕒 ${order.time}`)).toBeInTheDocument();
  });

  it("displays correct total from JSON", () => {
    const total = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    render(<OrderSecondCard order={order} />);

    expect(screen.getByText(`${total.toLocaleString()}₮`)).toBeInTheDocument();
  });

  it("renders status select and 'Дэлгэрэнгүй харах' button", () => {
    render(<OrderSecondCard order={order} />);
    expect(screen.getByText("Хүлээгдэж буй")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Дэлгэрэнгүй харах" })).toBeInTheDocument();
  });
});
