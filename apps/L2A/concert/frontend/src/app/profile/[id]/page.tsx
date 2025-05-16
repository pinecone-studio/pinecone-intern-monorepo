import UserProfileContainer from './_features/ProfileNavigation';

const App = () => {
  return (
    <div data-cy="app-root">
      <UserProfileContainer orderId="12312321" />
    </div>
  );
};

export default App;
