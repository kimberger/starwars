import { useCallback, useEffect, useState } from "react";
import debounce from "debounce";
import axios from "axios";

const useGet = ({ initialLoading = false } = {}) => {
  const [url, updateUrl] = useState();
  const [loading, updateLoading] = useState(initialLoading);
  const [responses, updateResponses] = useState([]);

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
    getAll(url);
  }, [url, getAll]);

  return [
    {
      loading,
      responses,
    },
    updateUrl,
  ];
};

export default useGet;
