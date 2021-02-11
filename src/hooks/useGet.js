import { useCallback, useEffect, useState } from "react";
import debounce from "debounce";
import axios from "axios";

const useGet = ({ initialLoading = false } = {}) => {
  const [url, updateUrl] = useState();
  const [loading, updateLoading] = useState(initialLoading);
  const [response, updateResponse] = useState({});
  const [responses, updateResponses] = useState([]);

  const get = useCallback(
    debounce(async (url) => {
      const response = await axios.get(url);
      updateLoading(false);
      updateResponse(response.data);
    }, 500),
    []
  );

  const getAll = useCallback(
    debounce(async (urls) => {
      const responses = await Promise.all(
        urls.map(async (url) => await axios.get(url))
      );

      updateLoading(false);
      updateResponses(responses.map(({ data }) => data));
    }, 500),
    []
  );

  useEffect(() => {
    if (url === undefined) return;
    updateLoading(true);

    if (typeof url === "string") return get(url);
    getAll(url);
  }, [url, get, getAll]);

  return [
    {
      loading,
      response,
      responses,
    },
    updateUrl,
  ];
};

export default useGet;
