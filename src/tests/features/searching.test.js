import { fireEvent, waitFor } from "@testing-library/react";

import { renderWithRouter } from "../helpers";
import App from "../../App";

describe("Searching for people", () => {
  it("renders results on partial match", async () => {
    const { getByLabelText, getByText } = renderWithRouter(<App />);
    fireEvent.change(getByLabelText("Character"), { target: { value: "r2" } });
    await waitFor(() => getByText("R2-D2"));
  });

  it("allows users to paginate through results", async () => {
    const { getByLabelText, getByText, findByText } = renderWithRouter(<App />);
    fireEvent.change(getByLabelText("Character"), { target: { value: "r" } });
    await waitFor(() => getByText("Luke Skywalker"));

    fireEvent.click(await findByText("Next"));
    await waitFor(() => getByText("Greedo"));

    fireEvent.click(await findByText("Previous"));
    await waitFor(() => getByText("Luke Skywalker"));
  });

  it("allows user to view character details", async () => {
    const { getByLabelText, getByText, findByText } = renderWithRouter(<App />);
    fireEvent.change(getByLabelText("Character"), { target: { value: "r2" } });
    fireEvent.click(await findByText("R2-D2"));
    await waitFor(() => getByText("33BBY"));
  });

  it("displays loading state while waiting for response", async () => {
    const { getByLabelText, getByText } = renderWithRouter(<App />);
    fireEvent.change(getByLabelText("Character"), { target: { value: "r" } });
    getByText("Loading...");
  });

  it("does not display loading state on page load", async () => {
    const { queryByText } = renderWithRouter(<App />);
    const loadingElement = queryByText("Loading...");
    expect(loadingElement).not.toBeInTheDocument();
  });
});
