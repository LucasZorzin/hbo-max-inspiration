import React from "react";

const Loader = ({ loading }) => {
    return (
        <>
            {
                loading === true ?
                    <div id="loader" className="d-flex justify-content-center">
                        <img src='/img/logo.webp' alt="HBO MAX" width={170} height={'auto'} />
                    </div>
                    :
                    loading === '404' ?
                        <div id="loader404" className="d-flex justify-content-center" />
                        :
                        null
            }
        </>
    );
}

export default Loader;