import { useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
    const [showModal, setShowModal] = useState(false)

    function handleToggleModal() {
        setShowModal(!showModal)
    }
    return (
        <>
            <Main />
            {/* Show sidebar if useState is set to false */}
            {showModal && (
                <SideBar handleToggleModal={handleToggleModal} />
            )}
            {/* handleToggleModal is passed down as a prop to Footer */}
            <Footer handleToggleModal={handleToggleModal} />
        </>
    )
}

export default App
