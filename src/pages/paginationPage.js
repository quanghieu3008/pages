import React, { useEffect, useState } from 'react';
import callApiGetDetail from '../fetchAPI/upDataFile'


function PaginationPage(props) {
    
    const { pagination, onPageChange,dataPageToDo } = props
    const { page, limit, totalRow } = pagination
  
    const [usersDetail, setUsersDetail] = useState("");
    let totalPages = Math.ceil(usersDetail / limit)
    // console.log(props,"=====================",usersDetail,"okeeeeeeee",totalPages,page);
    function handlePageChange(newPage) {
        if (onPageChange) {
            onPageChange(newPage)
        }

    }
    useEffect(() => {
        getTotalPage();

    }, []);
    const getTotalPage = (data) => {

        callApiGetDetail()
            .then(data => {
                setUsersDetail(data.count)
            
            });
     
    }
    return (
        <div>
            <button
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}>
                Prev
            </button>
            <button
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}>
                Next
        </button>
        </div>
    );

}

export default PaginationPage;