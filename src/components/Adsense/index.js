import React from "react";
import AdSense from 'react-adsense';
import { useSiteSecretData } from "../../hooks/";

const Adsense = () => {
  const config = useSiteSecretData();
  return config.googleAdsnseClientId ? (
      <div>
        <AdSense.Google
            client={config.googleAdsnseClientId}
            slot={config.googleAdsnseClientSlot}
            format="rectangle"
        />
      </div>
  ) : null;
};
export default Adsense;
