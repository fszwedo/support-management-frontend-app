import { render, fireEvent } from "@testing-library/react";
import ReportingQueryModals from "../../components/Reporting/ReportingQueryModals";
import { ReportingQuery } from "../../components/Reporting/Reporting";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import { TextField, Button } from "@material-ui/core";

const mockSelectedQuery: ReportingQuery = {
  name: "query type 1",
  description: "query type 1 description",
};

const mockCloseHandler = jest.fn();

jest.mock("axios");

describe("ReportingQueryModals", () => {
  it("should display the modal with the correct title", () => {
    const { getByText } = render(
      <ReportingQueryModals
        selectedQuery={mockSelectedQuery}
        closeHandler={mockCloseHandler}
      />
    );
    const title = getByText("query type 1 Report");
    expect(title).toBeInTheDocument();
  });

  it("should not submit the form if any field is empty", () => {
    const { getByTestId } = render(
      <Modal>
        <>
          <TextField
            required
            type="string"
            label="Enter Account ID"
            value=""
            inputProps={{ "data-testid": "account-id-input" }}
          />
          <Button
            variant="contained"
            size="small"
            type="submit"
            id="submit-button"
            data-testid="submit-button"
          >
            Send me email
          </Button>
        </>
      </Modal>
    );

    const accountIdInput = getByTestId("account-id-input");
    fireEvent.change(accountIdInput, { target: { value: "" } });

    const sendEmailButton = getByTestId("submit-button");
    fireEvent.click(sendEmailButton);

    expect(axios.post).not.toHaveBeenCalled();
  });
});
