export default function Footer(props) {
	// Destructure out functions
	const { showModal, handleToggleModal } = props

    return (
        <footer>
            <div className="bgGradient"></div>
            <div>
                <h2>The Brutal Martian Landscape</h2>
                <h1>APOD Project</h1>
            </div>
            <button onClick = {handleToggleModal}>
                <i className="fa-solid fa-circle-info"></i>
            </button>
        </footer>
    )
}
