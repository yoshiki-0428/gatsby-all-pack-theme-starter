import React from "react";
import AdSense from 'react-adsense';
import { useSiteSecretData } from "../../hooks/";

const Adsense = () => {
  const config = useSiteSecretData();
  return (
      <div>
        <AdSense.Google
            client={config.googleAdsnseClientId}
            slot={config.googleAdsnseClientSlot}
            format="rectangle"
        />
      </div>
  )
};
export default Adsense;
