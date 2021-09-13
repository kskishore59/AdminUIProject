import { Component } from "react";

import UserDetails from "../UserList";

import ReactPaginate from 'react-paginate';

import Paginate from '../PaginateObj'

import "./index.css";

class AdminUi extends Component {
  state = { usersList: [], searchInput: "", limit:10, offset: 0, setPageNumber: 0 };
  
  

  componentDidMount() {
    this.getUsersList();
  }

  getUsersList = async () => {
    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const updatedData = data.map((each) => ({
      id: each.id,
      name: each.name,
      email: each.email,
      role: each.role,
      isChecked: false,
    }));
    if (response.ok === true) {
      this.setState({ usersList: updatedData });
    }
  };

  onSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  onDeleteUser = (id) => {
    const { usersList } = this.state;
    const updated = usersList.filter((each) => each.id !== id);

    this.setState({ usersList: updated });
  };

  onChangePage = (number) => {
      console.log(number)
    this.setState({setPageNumber: number, offset: number * 10})
  }

  onSelectAll = () => {
      
  }

  


  render() {
    const { usersList, searchInput, limit, offset, } = this.state;

    console.log(offset)
    


    const updatedList = usersList.filter(
      (each) =>
        each.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        each.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        each.role.toLowerCase().includes(searchInput.toLowerCase())
    );

    const updatedInfo = updatedList.slice(offset , limit+offset);
    
    const pageCount = Math.ceil(usersList.length / limit)

    return (
      <div className="main-container">
        <input
          type="search"
          placeholder="Search by name email or role"
          className="input-container"
          onChange={this.onSearchInput}
        />
        <li className="admin-list-container">
          <input type="checkbox" className="checkbox-input" onChange={this.onSelectAll} />
          <p className="admin-para">Name</p>
          <p className="admin-para">Email</p>
          <p className="role-para">Role</p>
          <p className="action-para">Actions</p>
        </li>
        {updatedInfo.map((each) => (
          <UserDetails
            key={each.id}
            details={each}
            onDeleteUser={this.onDeleteUser}
          />
        ))}

         <Paginate pageCount={pageCount} onChangePage={this.onChangePage}/>
       
      </div>
    );
  }
}

export default AdminUi;
