import { render, screen } from "@testing-library/react";
import App from "./App";

const option = ["1 day ago", "7 days ago", "30 days ago"];

test("renders device last reported", () => {
  render(<App />);
  const linkElement = screen.getByText(/Devices last reported/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders Dropdown Skeleton", () => {
  render(<App />);
  const dropdownSkeletonElement = screen.getByTestId("dropSkeleton");
  expect(dropdownSkeletonElement).toBeInTheDocument();
});

test("renders Text Skeleton", () => {
  render(<App />);
  const textSkeletonElement = screen.queryAllByTestId("skeletonText");
  expect(textSkeletonElement[0]).toBeInTheDocument();
});

test("renders Dropdown", () => {
  render(<App />);
  const dropdownElement = screen.queryByTestId("dropDown");
  expect(dropdownElement).not.toBeInTheDocument();
});

test("renders MeterChart", () => {
  render(<App />);
  const meterchartElement = screen.queryByTestId("meterchart");
  expect(meterchartElement).not.toBeInTheDocument();
});
