import React from 'react';

class ClientCard extends React.Component {
  render() {
    const { id, name, address, operation, image } = this.props.data;
    console.log(this.props.data);
    return (
      <div className='schedule-card'>
        <h2>{name}</h2>
        <div>
          <p>{address}</p>
        </div>
        <div>
          <p>{operation}</p>
        </div>
        <div>
          <img src={image} alt={id} />
        </div>
      </div>
    );
  }
}

export default ClientCard;
