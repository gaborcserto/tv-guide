import { useEffect, useState } from "react";
import axios from "axios";

const FetchingData = (urlParams) => {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	let URL = null;

	if(urlParams.dateFrom && urlParams.dateTo) {
		URL = `${process.env.REACT_APP_URL}?i_datetime_from=${urlParams.dateFrom}&i_datetime_to=${urlParams.dateTo}${urlParams.channelID}`;
	} else if(urlParams.channelID) {
		URL = `${process.env.REACT_APP_URL}?date=${urlParams.date}${urlParams.channelID}`;
	}

	//console.log(URL);
	useEffect(() => {
		if(URL !== null) {
			const doFetch = async () => {
				setLoading(true);
				try {
					const response = await axios.get(URL);
					setResponse(response.data);
				} catch (error) {
					setError(error)
					console.error("%cData Fetching Error:", "font-size: 18px", error);
				} finally {
					setLoading(false);
				}
			}

			doFetch();
		}
	}, [URL])

	return {response, error, loading};
}

export default FetchingData;