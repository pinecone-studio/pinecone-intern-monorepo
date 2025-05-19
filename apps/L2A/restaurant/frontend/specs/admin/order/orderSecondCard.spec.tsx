import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderSecondCard from "@/app/admin/order/_components/OrderSecondCard";
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

describe("OrderSecondCard", () => {
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

  it("opens dialog on button click", async () => {
    render(<OrderSecondCard order={order} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Дэлгэрэнгүй харах" }));

    expect(document.querySelector('[data-cy="order-dialog"]'));
    expect(screen.findByText(order.orderNumber));
    expect(screen.findByText(order.table));
    expect(screen.findByText(`🕒 ${order.time}`));
  });
});
