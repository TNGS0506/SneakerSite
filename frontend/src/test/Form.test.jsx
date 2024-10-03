import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Form from "../components/Form";
import { describe, expect, test } from "vitest";

describe("Form Component", () => {
  const renderComponent = (route = "/api/token", method = "Login") => {
    return render(
      <MemoryRouter>
        <Form route={route} method={method} />
      </MemoryRouter>
    );
  };

  test("renders form with username and password inputs and submit button", () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Нэвтрэх/i)).toBeInTheDocument();
  });
});
