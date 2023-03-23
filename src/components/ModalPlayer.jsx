import React from "react";
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';

const Player = (props) => {
    return (
        <>
            {
                props?.trailer?.key !== undefined ?
                    <Modal
                        {...props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        className="player"
                    >
                        <Modal.Header closeButton />
                        <Modal.Body>
                            <>
                                <YouTube
                                    videoId={props?.trailer?.key}
                                    className="player"
                                    containerClassName={"youtube-container"}
                                    allowFullScreen
                                    frameBorder="0"
                                    opts={{
                                        width: "100%",
                                        height: "inherit",
                                        playerVars: {
                                            autoplay: 1,
                                            controls: 1,
                                            cc_load_policy: 0,
                                            fs: 1,
                                            iv_load_policy: 0,
                                            modestbranding: 1,
                                            rel: 0,
                                            showinfo: 0,
                                        },
                                        fullscreen: true
                                    }}
                                />
                            </>
                        </Modal.Body>
                    </Modal>
                    :
                    null
            }
        </>
    );
};

export default Player;
