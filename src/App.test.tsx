import { render, screen, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import App from './App';
import { createAppStore } from './app/store';

describe('<App />', () => {
  let scrollIntoView = jest.fn();
  beforeEach(() => {
    HTMLElement.prototype.scrollIntoView = scrollIntoView;
  });

  it('should render 3 boards (To Do, In Progress, Done)', () => {
    render(
      <Provider store={createAppStore()}>
        <App />
      </Provider>,
    );

    screen.getByText('To Do');
    screen.getByText('In Progress');
    screen.getByText('Done');
  });

  it('should render one Add a card button to the todo board', () => {
    render(
      <Provider store={createAppStore()}>
        <App />
      </Provider>,
    );

    let addCardButtons = screen.getAllByText('Add a card');
    expect(addCardButtons.length).toBe(1);

    let [addCardButton] = addCardButtons;
    let buttonBoard = addCardButton.closest('.Board')!;
    getByText(buttonBoard as HTMLElement, 'To Do');
  });

  it('should display addCard textarea if we click on add a card and after saving it will show the card inside the board', () => {
    render(
      <Provider store={createAppStore()}>
        <App />
      </Provider>,
    );

    let addCardButton = screen.getByText('Add a card');

    userEvent.click(addCardButton);
    userEvent.type(screen.getByRole('textbox'), 'new Todo');
    userEvent.click(screen.getByText('Save'));

    screen.getByText('new Todo');
  });

  it('clicking on delete card should delete the card', () => {
    render(
      <Provider store={createAppStore()}>
        <App />
      </Provider>,
    );

    screen.getByText('Welcome Todo');

    userEvent.click(screen.getByLabelText('delete card'));

    expect(() => screen.getByText('Welcome Todo')).toThrow();
  });

  it('should edit the card after click on edit card', () => {
    document.execCommand = jest.fn();

    render(
      <Provider store={createAppStore()}>
        <App />
      </Provider>,
    );

    screen.getByText('Welcome Todo');

    userEvent.click(screen.getByLabelText('edit card'));
    expect(document.execCommand).toBeCalledTimes(1);
    userEvent.type(screen.getByText('Welcome Todo'), ' Edited{Enter}');

    screen.getByText('Welcome Todo Edited');
  });
});
