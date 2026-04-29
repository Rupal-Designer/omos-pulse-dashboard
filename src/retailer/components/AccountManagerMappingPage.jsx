import React from 'react';
import { UploadPage } from '../../ui';

export default function AccountManagerMappingPage() {
  return (
    <UploadPage
      fileName="merchant_account_manager_mapping.xlsx"
      fileDesc="Excel template with sample data. Get the template file with the correct format and structure"
      howItWorksBullets={[
        'Click on "Download all advertiser details" link to download account manager details for all advertisers',
        'Update the account manager for the advertisers you want to update',
        'Save the file',
        'Upload the file back to apply changes.',
      ]}
    />
  );
}
