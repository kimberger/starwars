import { renderWithRouter } from "../helpers";
import App from "../../App";

describe("Viewing a character", () => {
  it("displays the films they have been in", async () => {
    const { findByText } = renderWithRouter(<App />, { route: "/character/3" });
    await findByText("33BBY");
    await findByText("A New Hope");
  });
});
