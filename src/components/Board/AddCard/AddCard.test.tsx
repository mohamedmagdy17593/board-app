import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import AddCard from './AddCard';

describe('<AddCard />', () => {
  let scrollIntoView = jest.fn();
  beforeEach(() => {
    HTMLElement.prototype.scrollIntoView = scrollIntoView;
  });

  it('should render a text area with save and close button', () => {
    render(<AddCard onAdd={() => {}} close={() => {}} />);

    expect(() => screen.getByRole('textbox')).not.toThrow();
    expect(() => screen.getByText('Save')).not.toThrow();
    expect(() => screen.getByLabelText('close')).not.toThrow();
  });

  it('should scroll to text area to be in the view', () => {
    render(<AddCard onAdd={() => {}} close={() => {}} />);

    expect(scrollIntoView).toBeCalledTimes(1);
  });

  it('should call close prop if we click on close button', () => {
    let close = jest.fn();

    render(<AddCard onAdd={() => {}} close={close} />);

    userEvent.click(screen.getByLabelText('close'));

    expect(close).toBeCalledTimes(1);
  });

  it('should call close prop if we click outside the Add card component container', () => {
    let close = jest.fn();

    render(<AddCard onAdd={() => {}} close={close} />);

    userEvent.click(document.body);

    expect(close).toBeCalledTimes(1);
  });

  it('should call onAdd prop with the text area content when clicking on Save button', () => {
    let onAdd = jest.fn();

    render(<AddCard onAdd={onAdd} close={() => {}} />);

    userEvent.type(screen.getByRole('textbox'), 'Some text');
    userEvent.click(screen.getByText('Save'));

    expect(onAdd).toBeCalledTimes(1);
    expect(onAdd).toBeCalledWith('Some text');
  });
});
