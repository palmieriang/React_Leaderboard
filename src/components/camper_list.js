import React from 'react';

import CamperListItem from './camper_list_item';

// const CamperList = (props) => {
//     const campers = props.campers;
//     return (
//         <div>Hello</div>
//     );
// }

const CamperList = ({ campers }) => {

    const Items = campers.map((camper, index) => {
        return <CamperListItem key={index} camper={camper} number={index + 1} />
    });

    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Last 30 days</th>
                    <th>All time points</th>
                </tr>
            </thead>
            <tbody>
                {Items}
            </tbody>
        </table>
    );
}

export default CamperList;
