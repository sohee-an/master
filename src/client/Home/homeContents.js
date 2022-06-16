


function HomeContents(props){
    console.log(props);
    return (
        <div className="container">
        <div className="row">
        <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + props.id + '.jpg'} width="80%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.price }</p>
    </div>
    </div>
    </div>
     
    )
}

export default HomeContents;