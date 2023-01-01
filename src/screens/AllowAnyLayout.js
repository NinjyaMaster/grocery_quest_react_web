import { Outlet } from 'react-router-dom';

function AllowAnyLayout() {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
}

export default AllowAnyLayout;
