import { useEffect, useState } from 'react';
import PaginationComp from '../components/Pagination';

export default function Home() {

  const pageNumberLimit = 5;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

  useEffect(()=>{
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`)
    .then((response) => response.json())
    .then((data) => { 
      setData(data); 
      setLoading(false);
    });

  },[currentPage]);


  const onPageChange= (pageNumber)=>{
    setCurrentPage(pageNumber);
  }
  const onPrevClick = ()=>{
      if((currentPage-1) % pageNumberLimit === 0){
          setMaxPageLimit(maxPageLimit - pageNumberLimit);
          setMinPageLimit(minPageLimit - pageNumberLimit);
      }
      setCurrentPage(prev=> prev-1);
  }

  const onNextClick = ()=>{
      if(currentPage+1 > maxPageLimit){
          setMaxPageLimit(maxPageLimit + pageNumberLimit);
          setMinPageLimit(minPageLimit + pageNumberLimit);
      }
      setCurrentPage(prev=>prev+1);
    }

    const paginationAttributes = {
      currentPage,
      maxPageLimit,
      minPageLimit,
      response: data,
    };

    return(
      <div className='container mt-5'>
          <h2>Passenger List</h2>
          {!loading ? <PaginationComp {...paginationAttributes} 
                            onPrevClick={onPrevClick} 
                            onNextClick={onNextClick}
                            onPageChange={onPageChange}/>
          : <div> Loading... </div>
          }
      </div>
  )
}
