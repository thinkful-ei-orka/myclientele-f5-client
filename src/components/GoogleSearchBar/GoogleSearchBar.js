import React from 'react'
import './GoogleSearchBar.scss'
 
class GoogleSearchBar extends React.Component {
 
 render() {
   return (
     <form onSubmit={e => this.props.handleSearch(e)}>
       <input type="search" name='search' placeholder='Search' aria-label='Search for clients' onChange={e => this.props.handleChange(e)} />
       <button className='search-button btn' type='submit'>Search</button>
     </form>
   )
 }
}
 
 
export default GoogleSearchBar;

