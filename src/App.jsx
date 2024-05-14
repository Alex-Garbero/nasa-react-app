import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)
	
    function handleToggleModal() {
		setShowModal(!showModal)
    }
	// useEffect with a dependency array [] and a funciton () => {} to be executed upon satisfying the array
	useEffect(() => {
		async function fetchAPIData() {
			const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
			const url = 'https://api.nasa.gov/planetary/apod'+ `?api_key=${NASA_KEY}`

			// Data caching
			const today = (new Date()).toDateString()
			// Create key based on today's date
			const localKey = `NASA-${today}`
			// If already visited local storage, access data from cache
			if (localStorage.getItem(localKey)) {
				// Parse JSON saved in local storage
				const apiData = JSON.parse(localStorage.getItem(localKey))
				setData(apiData)
				console.log('Fetched from cache today')
				return
			}
			// If today key does not work, clear local storage
			localStorage.clear()

			try {
				const res = await fetch(url)
				const apiData = await res.json()
				localStorage.setItem(localKey, JSON.stringify(apiData))
				setData(apiData)
				console.log('Fetched from API today')
			} catch (err) {
				console.log(err.message)
			}
		}
		fetchAPIData()
	}, [])

    return (
        <>
			{/* If the data is true, load Main */}
			{/* Main must also have access to the data for the image to load */}
            {data ? ( <Main data={data} /> ): (
				<div className="loadingState">
					<i className="fa-solid fa-gear"></i>
				</div>
			)}
            {/* Show sidebar if useState is set to false */}
            {showModal && (
                <SideBar data={data} handleToggleModal={handleToggleModal} />
            )}
            {/* handleToggleModal is passed down as a prop to Footer */}
            {data && (
				<Footer data={data} handleToggleModal={handleToggleModal} />
			)}
        </>
    )
}

export default App
