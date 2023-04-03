import { render, fireEvent } from '@testing-library/react';
import Reporting from '../../components/Reporting/Reporting';


describe('Reporting component', () => {
  it('should render all query types', () => {
    const { getByText } = render(<Reporting />);
    expect(getByText(/Purchase Events/i)).toBeInTheDocument();
    expect(getByText(/Referrers/i)).toBeInTheDocument();
    expect(getByText(/Live Assistants/i)).toBeInTheDocument();
    expect(getByText(/Assistant starts/i)).toBeInTheDocument();
  });

  it('should open the modal when a query type is clicked', () => {
    const { getByText } = render(<Reporting />);
    const queryType = getByText(/Purchase Events/i);
    fireEvent.click(queryType);
    expect(getByText(/Purchase Events Report/i)).toBeInTheDocument();
  });
});
