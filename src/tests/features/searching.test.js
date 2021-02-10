import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import App from "../../App";

describe("Searching for people", () => {
  it("renders results on partial match", async () => {
    const { getByLabelText, getByText } = render(<App />);
    fireEvent.change(getByLabelText("Character"), { target: { value: "r2" } });
    await waitFor(() => getByText("R2-D2"));
  });

  it("allows users to paginate through results", async () => {
    const { getByLabelText, getByText, findByText } = render(<App />);
    fireEvent.change(getByLabelText("Character"), { target: { value: "r" } });
    await waitFor(() => getByText("Luke Skywalker"));

    fireEvent.click(await findByText("Next"));
    await waitFor(() => getByText("Greedo"));

    fireEvent.click(await findByText("Previous"));
    await waitFor(() => getByText("Luke Skywalker"));
  });

  it("debounces requests to the starwars api", async () => {
    const axiosSpy = jest.spyOn(axios, "get");
    const { getByLabelText, findByText } = render(<App />);
    fireEvent.change(getByLabelText("Character"), { target: { value: "r" } });
    fireEvent.change(getByLabelText("Character"), { target: { value: "r2" } });
    await findByText("R2-D2");
    expect(axiosSpy).toHaveBeenCalledTimes(1);
  });

  it("displays loading state while waiting for response", async () => {
    const { getByLabelText, getByText } = render(<App />);
    fireEvent.change(getByLabelText("Character"), { target: { value: "r" } });
    getByText("Loading...");
  });

  it("does not display loading state on page load", async () => {
    const { queryByText } = render(<App />);
    const loadingElement = queryByText("Loading...");
    expect(loadingElement).not.toBeInTheDocument();
  });
});
