import React from 'react';
import { UploadPage } from '../../ui';

export default function AttributionOverridesPage() {
  return (
    <UploadPage
      fileName="seller_attribution_overrides.xlsx"
      fileDesc="Excel template with sample data. Get the template file with the correct format and structure"
      howItWorksBullets={[
        'Click on the "Download file for all advertisers".',
        'This file will contain attribution window setting for all your advertisers.',
        'Change the attribution window for advertisers you want to update.',
        'Save your file and upload it back to the platform.',
      ]}
    />
  );
}
