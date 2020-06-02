import React from "react";
import { toast } from "react-toastify";
import _ from "lodash";

import api from "../Services/api";

const useFetch = (path, defaultData) => {
  const [data, setData] = React.useState(null);
  const [refetchFlag, setRefetchFlag] = React.useState(false);
  const refetch = () => setRefetchFlag(!refetchFlag);
  React.useEffect(() => {
    (async function () {
      try {
        const response = await api.get(path);
        response && setData(response.data);
      } catch (ex) {
        toast.error(_.get(ex, "response.data.message") || "Sorry, something went wrong");
      }
    })();
  }, [path, refetchFlag]);

  if (defaultData) {
    return data || defaultData;
  }

  return { data, refetch };
};

export default useFetch;
