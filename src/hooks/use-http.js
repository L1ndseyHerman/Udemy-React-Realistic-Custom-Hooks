import { useState, useCallback } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const sendRequest = useCallback(async (requestConfig, applyData)  => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          requestConfig.url, {
              //    Sets it to the stuff if the property was passed in, or null and stuff if not.
              method: requestConfig.method ? requestConfig.method : 'GET',
              headers: requestConfig.headers ? requestConfig.headers : {},
              body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
          }
        );
  
        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        //  Assuming the data will always be in JSON format.
        const data = await response.json();

        applyData(data);

      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    }, []);

    //  If the variable and the property of the object have the same name, can write it once like so:
    return {
        isLoading,
        error,
        sendRequest
    }
};

export default useHttp;