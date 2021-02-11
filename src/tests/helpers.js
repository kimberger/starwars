import { render } from "@testing-library/react";
import {
  LocationProvider,
  createHistory,
  createMemorySource,
} from "@reach/router";

export const renderWithRouter = (
  ui,
  { route = "/", history = createHistory(createMemorySource(route)) } = {}
) => {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history,
  };
};
