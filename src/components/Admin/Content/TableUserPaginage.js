import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const TableUserPaginage = (props) => {
    const { listUsers } = props;
    console.log(listUsers);

    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
  
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };
  
    const currentUsers = listUsers.slice(currentPage * perPage, (currentPage + 1) * perPage);
  
  
    return (
      <>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">username</th>
              <th scope="col">email</th>
              <th scope="col">role</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers &&
              currentUsers.length > 0 &&
              currentUsers.map((item, index) => {
                return (
                  <tr key={`table-users-${index}`}>
                    <th>{index + 1}</th>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>
                      {item.roles.map((i, index) => {
                        return <div key={i.id}>{i.name} </div>;
                      })}
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => props.handleClickBtnView(item)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-warning mx-3"
                        onClick={() => props.handleClickBtnUpdate(item)}
                      >
                        Update
                      </button>
                      <button className="btn btn-danger"
                      onClick={() => props.handleClickBtnDelete(item)}
                      >Delete</button>
                    </td>
                  </tr>
                );
              })}
            {listUsers && listUsers.length === 0 && (
              <tr>
                <td colSpan={"4"}>Not found data</td>
              </tr>
            )}
          </tbody>
        </table>
        <ReactPaginate
             previousLabel={'previous'}
             nextLabel={'next'}
             breakLabel={'...'}
             pageCount={Math.ceil(listUsers.length / perPage)}
             marginPagesDisplayed={2}
             pageRangeDisplayed={5}
             onPageChange={handlePageChange}
             containerClassName={'pagination'}
             subContainerClassName={'pages pagination'}
             activeClassName={'active'}
        />
      </>
    );
  };
  
  export default TableUserPaginage;
  