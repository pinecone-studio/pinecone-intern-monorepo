import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

describe("OrderSecondCard", () => {
  it("opens dialog on button click", async () => {
    render(<OrderSecondCard order={order} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Дэлгэрэнгүй харах" }));
    const dialogElement = await screen.findByTestId('order-dialog');
    expect(dialogElement).toBeInTheDocument();
    expect(screen.findByText(order.orderNumber));
    expect(screen.findByText(order.table));
    expect(screen.findByText(`🕒 ${order.time}`));
  });
});
