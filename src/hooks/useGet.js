import { useCallback, useEffect, useState } from "react";
import debounce from "debounce";
import axios from "axios";

const useGet = ({ initialLoading = false } = {}) => {
  const [url, updateUrl] = useState();
  const [loading, updateLoading] = useState(initialLoading);
  const [response, updateResponse] = useState({});

  const get = useCallback(
    debounce(async (url) => {
      const response = await axios.get(url);
      updateLoading(false);
      updateResponse(response.data);
    }, 500),
    []
  );

  useEffect(() => {
    if (url === undefined) return;
    updateLoading(true);
    get(url);
  }, [url, get]);

  return [
    {
      loading,
      response,
    },
    updateUrl,
  ];
};

export default useGet;
