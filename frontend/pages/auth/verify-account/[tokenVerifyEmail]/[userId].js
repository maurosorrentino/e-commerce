import React from 'react';
import { useRouter } from 'next/router';

import VerifyAccount from '../../../../components/VerifyAccount';

const verifyAccountPage = () => {

    const router = useRouter();

    return (

        <VerifyAccount userId={router.query.userId} tokenVerifyEmail={router.query.tokenVerifyEmail} />

    )

}

export default verifyAccountPage;