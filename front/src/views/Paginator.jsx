import React, { useState } from 'react'

export default function Paginator({currentPage, totalPage, getPageOfPaginate}) {

    const pageNumbers = []

    for (let i = 1; i <= totalPage; i++) {
       pageNumbers.push(i) 
    }

  return (
    <div className="bootstrap-pagination">
        <nav>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={(e) => {getPageOfPaginate(currentPage - 1)}} className="page-link">Précédent</button>
                </li>
                
                {pageNumbers.map(page => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button type='button' onClick={(e) => getPageOfPaginate(page)} className="page-link">{page}</button>
                    </li>
                ))}
                                
                <li className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}>
                    <button onClick={(e) => {e.preventDefault(); getPageOfPaginate(currentPage + 1)}} className="page-link">Suivant</button>
                </li>
            </ul>
        </nav>
    </div>
  )
}
