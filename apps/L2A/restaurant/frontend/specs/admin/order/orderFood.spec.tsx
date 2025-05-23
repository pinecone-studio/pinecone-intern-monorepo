import { render, screen } from "@testing-library/react";
import OrderFood from "@/app/admin/order/_components/FoodCard";
import orderData from "@/app/admin/order/_components/orderdata.json";

describe("OrderFood Component", () => {
  it("renders food items from JSON correctly", () => {
    const firstOrderItems = orderData.orders[0].items;
    render(<OrderFood orders={firstOrderItems} />);
    firstOrderItems.forEach((item) => {
      expect(screen.getByText(item.name));
      expect(screen.getByText(`${item.price}₮`));
      expect(
        screen.getAllByText((text) =>
          text.replace(/\s/g, "") === `${item.quantity}ш`
        )
      );
      expect(screen.getByAltText(item.name));
    });
  });
});
  
