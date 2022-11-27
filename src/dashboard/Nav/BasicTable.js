import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
/* import './table.css'; */
/* import { IoCaretUpOutline } from 'react-icons/io5';
import { IoCaretDownOutline } from 'react-icons/io5'; */
/* import Search from './Search'; */



function BasicTable({ columnsProps, recordsProps }) {
    const columns = useMemo(() => columnsProps, [])
    const data = useMemo(() => recordsProps,)
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, setGlobalFilter, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, state, gotoPage, pageCount, setPageSize, selectedFlatRows } = useTable({
        columns: columns,
        data: data,
        
    }, useGlobalFilter, useSortBy, usePagination,(hooks) => {
    })
    const { pageIndex, pageSize } = state
    const { globalFilter } = state
    return (
        <div>
           {/*  <Search filter={globalFilter} setFilter={setGlobalFilter} /> */}
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ?  {/* <IoCaretUpOutline />  */}: {/* <IoCaretDownOutline /> */}) : ''}
                                        </span>
                                    </th>
                                ))
                            }

                        </tr>
                    ))}

                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps({style: {
                                            minWidth: cell.column.minWidth,
                                            width: cell.column.width,
                                          },})}>{cell.render('Cell')}</td>
                                    })}

                                </tr>
                            )
                        })}

                </tbody>
            </table>
          

            <div className='pagination-line'>
                <span className='pages'>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>

                <span className='gotopage'>
                    | Go to Page:{' '}
                    <input type="number" defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(pageNumber)
                        }}
                        style={{ width: '50px' }}
                    />
                </span>
                <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className='selectpage'>
                    {
                        [5, 10, 15, 25].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))
                    }
                </select>

                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className='buttonone'>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className='buttonone'>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage} className='buttonone'>Next</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
            </div>
        </div>
    )
}
export default BasicTable
