import React from 'react';
import { useRouter } from 'next/router';

import ViewItem from '../../components/ViewItem';

const viewItemPage = () => {

    const router = useRouter();

    return (
    
        <ViewItem itemId={router.query.itemId} />
        
    );

}

export default viewItemPage;