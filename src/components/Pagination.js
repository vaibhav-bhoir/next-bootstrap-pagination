import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination'

const PaginationComp = (props) => {

    const { currentPage, maxPageLimit, minPageLimit, onPrevClick, onNextClick, onPageChange} = props;
    // const totalPages = props.response.totalPages-1;
    const totalPages = 10;
    const data = props.response;

    // build page numbers list based on total number of pages
    const pages = [];
    for(let i=1 ; i<=totalPages; i++){
        pages.push(i);
    }

    const pageNumbers = pages.map(page => {
        if(page <= maxPageLimit  && page > minPageLimit) {
            return(
                <Pagination.Item key={page} id={page} onClick={(e) => onPageChange(Number(e.target.id))} 
                    active={currentPage===page ? 'active' : null}>
                    {page}
                </Pagination.Item>
            );
        }else{
            return null;
        }
    });

    // page ellipses
    let pageIncrementEllipses = null;
    if(pages.length > maxPageLimit){
        pageIncrementEllipses = <Pagination.Ellipsis onClick={onNextClick}>&hellip;</Pagination.Ellipsis>
    }
    let pageDecremenEllipses = null;
    if(minPageLimit >=1){
        pageDecremenEllipses = <Pagination.Ellipsis onClick={onPrevClick}>&hellip;</Pagination.Ellipsis> 
    }

    const renderData = (data)=>{
        return(
            <ListGroup >
                {data.map((d, i)=> 
                    <ListGroup.Item as="li" key={i}><span>{d.id}. </span>{d.title}</ListGroup.Item>)
                }
            </ListGroup>
        )
    }


    return (
        <div className="main">
            <div className="mainData">
                {renderData(data)}
            </div>
            <Pagination className="mt-3"> 
            <Pagination.Prev onClick={onPrevClick} disabled={currentPage === pages[0]}>Prev</Pagination.Prev>
            {pageDecremenEllipses}
            {pageNumbers}
            {pageIncrementEllipses}
            <Pagination.Next onClick={onNextClick} disabled={currentPage === pages[pages.length-1]}>Next</Pagination.Next>
            </Pagination>
        </div>
    )
}

export default PaginationComp