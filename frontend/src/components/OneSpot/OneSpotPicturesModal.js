import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Pagination } from "@mui/material";
import Grow from "@mui/material/Grow";

const OneSpotPicturesModal = ({ spots }) => {
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null)
    const closeModal = () => setShowModal(false)

    return (
        <>
            <Grow in={true}>
                <div style={{ display: "flex" }}>
                    <div className='first-image-upload-placeholder'>
                        <img onClick={(e) => { setShowModal(true); setId(0) }} style={{ height: "500px", width: "400px", padding: "2px", borderRadius: "20px", cursor: "pointer" }} src={spots?.SpotImages[0]?.url} alt="cave"></img>
                    </div>
                    <div className='first-image-upload-placeholder'>
                        <img onClick={(e) => { setShowModal(true); setId(1) }} style={{ height: "500px", width: "350px", padding: "2px", borderRadius: "20px", cursor: "pointer" }} src={spots?.SpotImages[1]?.url}></img>
                    </div>
                    <div className='second-image-upload-placeholder'>
                        <div className='second-image-upload-container'>
                            <img onClick={(e) => { setShowModal(true); setId(2) }} style={{ height: "250px", width: "253px", padding: "2px", borderRadius: "20px", cursor: "pointer" }} src={spots?.SpotImages[2]?.url}></img>
                        </div>
                        <div className='second-image-upload-container'>
                            <img onClick={(e) => { setShowModal(true); setId(3) }} style={{ height: "250px", width: "253px", padding: "2px", borderRadius: "20px", cursor: "pointer" }} src={spots?.SpotImages[3]?.url}></img>
                        </div>
                    </div>
                </div>
            </Grow>
            <Modal style={{ marginTop: "50px", display: "flex", alignItems: "center", flexDirection: "column" }} open={showModal} onClose={closeModal}>
                <>
                    <i onClick={(e) => id > 0 ? setId(id - 1) : setId(3)} style={{ fontSize: "36px", color: "#d60565", position: "relative", right: "27%", top: "45%", cursor: "pointer", backgroundColor: "white", height: "fit-content", borderRadius: "100px" }} class="fa-solid fa-circle-chevron-left" />
                    <img style={{ width: "50%", height: "85%", borderRadius: "20px" }} src={spots?.SpotImages[id]?.url} />
                    <i onClick={(e) => id < 3 ? setId(id + 1) : setId(0)} style={{ fontSize: "36px", color: "#d60565", position: "relative", left: "27%", bottom: "43.5%", cursor: "pointer", backgroundColor: "white", height: "fit-content", borderRadius: "100px" }} class="fa-solid fa-circle-chevron-right" />
                    <Pagination hideNextButton={true} hidePrevButton={true} color="secondary" sx={{ "& .Mui-selected": { backgroundColor: "#d60565", color: "white" } }} style={{ backgroundColor: "white" }} count={4} page={id + 1} onChange={(e) => setId(Number(e.target.textContent) - 1)} />
                </>
            </Modal>
        </>
    )
}
export default OneSpotPicturesModal
