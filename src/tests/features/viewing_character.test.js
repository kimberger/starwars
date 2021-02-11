import { waitFor } from "@testing-library/react";
import { renderWithRouter } from "../helpers";
import App from "../../App";

describe("Viewing a character", () => {
  it("displays the films they have been in", async () => {
    const { getByText } = renderWithRouter(<App />, { route: "/character/3" });
    await waitFor(() => getByText("A New Hope"));
  });
});
