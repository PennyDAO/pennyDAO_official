import React from 'react';
import { useParams } from "react-router-dom";

const ProposalDetails = ({location}) => {

    const { proposal_id } = useParams();

    return (
        <div className='dashboardContainer'>
            {proposal_id}
        </div>
    )
}

export default ProposalDetails;