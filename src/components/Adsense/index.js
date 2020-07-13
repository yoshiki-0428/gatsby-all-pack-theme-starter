import React from "react";
import AdSense from 'react-adsense';

// TODO env
const Adsense = () => (
    <div>
      <AdSense.Google
          client="ca-pub-10752010519143941"
          slot="1075201051914394"
          format="rectangle"
      />
    </div>
);
export default Adsense;
