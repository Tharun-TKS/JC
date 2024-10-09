import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container">
            <h1 className="privacy-policy-header">Privacy Policy</h1>
            <p className="privacy-policy-text">
                This website is owned, hosted, and operated by "JC Creations" (hereinafter referred to as "JC Creations"). Unless explicitly stated otherwise, all content featured or displayed on the website, including but not limited to photographic images, text, graphics, website layout, sound, illustrations, software, trade dress, trademarks, and their arrangement ("JC Creations Content"), is the property of JC Creations, its affiliates, subsidiaries, licensors, contributors, or third-party image partners.
            </p>
            <p className="privacy-policy-text">
                By using the website, you agree to:
            </p>
            <ul className="privacy-policy-list">
                <li>
                    Provide accurate, current, and complete information about yourself as prompted by any registration forms on the website ("Registration Data").
                </li>
                <li>
                    Maintain and promptly update the Registration Data and any other information you provide to JC Creations to ensure its accuracy, currency, and completeness.
                </li>
                <li>
                    Safeguard the security of your password and identification.
                </li>
                <li>
                    Notify JC Creations immediately of any unauthorized use of your account or any other security breaches.
                </li>
                <li>
                    Assume full responsibility for all activities conducted through your account.
                </li>
                <li>
                    Acknowledge and assume all risks associated with unauthorized access to the Registration Data and any other information you provide to JC Creations.
                </li>
            </ul>
            {/* <div className="loading-container">
                <CircularProgress />
            </div> */}
        </div>
    );
};

export default PrivacyPolicy;
