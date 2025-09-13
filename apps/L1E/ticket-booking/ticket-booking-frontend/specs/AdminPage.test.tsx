
import "@testing-library/jest-dom" 
import AdminPage from "@/app/(main)/admin/page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("AdminPage", () => {
    it("renders the AdminHeader and TicketTab by default", () => {
        render(<AdminPage />);

        // Header хэсгийн text
        expect(screen.getByText("TICKET BOOKING")).toBeInTheDocument();

        // Ticket tab-н title (heading-г шалгана)
        expect(screen.getByRole('heading', { level: 6, name: 'Тасалбар' })).toBeInTheDocument();

        // Ticket tab-н тайлбар
        expect(screen.getByText("Идэвхитэй зарагдаж буй тасалбарууд")).toBeInTheDocument();
    });

    it("changes tab when clicking Цуцлах хүсэлт", async () => {
        render(<AdminPage />);
        const user = userEvent.setup();

        // "Цуцлах хүсэлт" товчлуур дээр дарна
        const cancelButton = screen.getByRole("button", { name: "Цуцлах хүсэлт" });
        await user.click(cancelButton);

        // TicketTab одоо харагдахгүй болсон байх ёстой (heading байхгүй эсэхээр шалгана)
        expect(screen.queryByRole('heading', { level: 6, name: 'Тасалбар' })).not.toBeInTheDocument();
    });

    it("changes back to ticket tab when clicking Тасалбар", async () => {
        render(<AdminPage />);
        const user = userEvent.setup();

        const cancelButton = screen.getByRole("button", { name: "Цуцлах хүсэлт" });
        await user.click(cancelButton);

        const ticketButton = screen.getByRole("button", { name: "Тасалбар" });
        await user.click(ticketButton);

        // Heading-тэй title дахин гарч ирсэн байх ёстой
        expect(screen.getByRole('heading', { level: 6, name: 'Тасалбар' })).toBeInTheDocument();
    });
});
