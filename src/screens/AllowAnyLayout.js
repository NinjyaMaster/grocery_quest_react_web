import { Outlet } from "react-router-dom"

const AllowAnyLayout = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    )
}

export default AllowAnyLayout