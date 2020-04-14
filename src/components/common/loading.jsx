import React from "react";
import '../../public/css/loading.css'

const Loading = ({ loading, loadingOverlayDiv }) => {
	return loading && <div className={`loading ${loadingOverlayDiv ? 'loadingOverlayDiv' : ''}`}><div></div><div></div></div>
};

export default Loading;