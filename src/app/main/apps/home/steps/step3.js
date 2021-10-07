import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import MobileDetect from "mobile-detect";

import Card from "./components/card";
import Image from "./components/image";
import Carousel from "react-multi-carousel";
import CarouselWithCustomDots from "./components/carousel-with-custom-dots";
import "./components/style.css";
import "react-multi-carousel/lib/styles.css";

class App extends Component {
  static getInitialProps({ req }) {
    let userAgent;
    let deviceType;
    if (req) {
      userAgent = req.headers["user-agent"];
    } else {
      userAgent = navigator.userAgent;
    }
    const md = new MobileDetect(userAgent);
    if (md.tablet()) {
      deviceType = "tablet";
    } else if (md.mobile()) {
      deviceType = "mobile";
    } else {
      deviceType = "desktop";
    }
    return { deviceType };
  }

  state = { isMoving: false };

  render() {
    const { classes } = this.props;
    const images = [
      "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    ];
    const texts = [
      "Appending currency sign to a purchase form in your e-commerce site using plain JavaScript.",
      "Fixing CSS load order/style.chunk.css incorrect in Nextjs",
      "React Carousel with Server Side Rendering Support – Part 1",
      "React Carousel with Server Side Rendering Support – Part 2",
      "Flutter Xcode couldn’t find any iOS App Development provisioning profiles"
    ];
    const fakerData = Array(12)
      .fill(0)
      .map((item, index) => {
        return {
          image: images[index],
          headline: "w3js -> web front-end studio",
          description: texts[index] || texts[0]
        };
      });
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1
      }
    };
    return (
      <div className={classes.root}>
        <Typography className={classes.title} variant="h6" color="grey">
          <a target="_blank" href="https://w3js.com/">
            A Carousel supports multiple items and server-side rendering
          </a>
        </Typography>
        <Typography className={classes.title} variant="p" color="grey">
          <a target="_blank" href="https://w3js.com/">
            This is the server-side rendering demo of the libiary, try to
            disable the JavaScript in your browser, you will still see our
            Carousel renders nicely
          </a>
        </Typography>
        <Carousel
          /*
          swipeable={false}
          draggable={false}
          */
          responsive={responsive}
          ssr
          infinite={false}
          beforeChange={() => this.setState({ isMoving: true })}
          afterChange={() => this.setState({ isMoving: false })}
          containerClass="first-carousel-container container"
          deviceType={this.props.deviceType}
        >
          {fakerData.map(card => {
            return <Card isMoving={this.state.isMoving} {...card} />;
          })}
        </Carousel>

        <Carousel
          /*
          swipeable={false}
          draggable={false}
          */
          responsive={responsive}
          ssr
          showDots
          infinite
          containerClass="container-with-dots"
          itemClass="image-item"
          deviceType={this.props.deviceType}
        >
          {fakerData.slice(0, 5).map(card => {
            return <Image url={card.image} alt={card.headline} />;
          })}
        </Carousel>
        <CarouselWithCustomDots deviceType={this.props.deviceType} />
      </div>
    );
  }
}

const styles = () => ({
  root: {
    textAlign: "center"
  },
  title: {
    maxWidth: 400,
    margin: "auto",
    marginTop: 10
  }
});

export default withStyles(styles)(App);

// import React from 'react';
// import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
// import {mockData} from './mockData'

// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';


// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 5
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1
//   }
// };

// import { Card, Button, CardGroup , Carousel} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';



// export default function App() {
//   return (<Carousel>
//                        {    [
//                     'Primary',
//                     'Secondary',
//                     'Success',
//                     'Danger',
//                     'Warning',
//                     'Info',
//                     'Light',
//                     'Dark',
//                     'Primary',
//                     'Secondary',
//                     'Success',
//                     'Danger',
//                     'Warning',
//                     'Info',
//                     'Light',
//                     'Dark',
//                     ].map((variant, idx) => (
//                          <Carousel.Item>
//                                     <Card
//                                         bg={variant.toLowerCase()}
//                                         key={idx}
//                                         text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
//                                         style={{ background: "#eee",  padding: "20px",  margin: "20px" , width: '18rem' , boxSizing: 'border-box'}}
//                                         className="mb-2"
//                                     >
//                                         <Card.Header>Header</Card.Header>
//                                         <Card.Body>
//                                         <Card.Title>{variant} Card Title </Card.Title>
//                                         <Card.Text>
//                                             Some quick example text to build on the card title and make up the bulk
//                                             of the card's content.
//                                         </Card.Text>
//                                         </Card.Body>
//                                     </Card>
//                          </Carousel.Item>
                    
//                     ))}

//   </Carousel>
// )};


;

// function App() {
//   return (
//     <Card style={{ width: '18rem' }}>
//       <Card.Img variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
//       <Card.Body>
//         <Card.Title>Card Title</Card.Title>
//         <Card.Text>
//           Some Custom text one can write here
//         </Card.Text>
//         <Button variant="primary">Go somewhere</Button>
//       </Card.Body>
//     </Card>
//   );
// }



// const rows: GridRowsProp = [
//   { id: 1, col1: 'Hello', col2: 'World' },
//   { id: 2, col1: 'XGrid', col2: 'is Awesome' },
//   { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
// ];

// const rows: GridRowsProp =mockData['data'];


// const columns: GridColDef[] = [
//   { field: 'Job_ID', headerName: 'Job_ID', width: 150 },
//   { field: 'Resume_name', headerName: 'Resume_name', width: 150 },
//   {field: 'Relevancy_Score',headerName: 'Relevancy_Score', width: 150},
//   {field: 'Common_personas',headerName: 'Common_personas', width: 150},
//   {field: 'Common_skills',headerName: 'Common_skills', width: 150},
//   {field: 'Years_of_Exp',headerName: 'Years_of_Exp', width: 150},
  
// ];

// export default function App() {

//     console.log(JSON.stringify(mockData))
//   return (
//     <div style={{ height: 300, width: '100%' }}>
//       <DataGrid rows={rows} />
//     </div>
//   );
// }

// export default function App() {

//     console.log('mockdata')    

// console.log(JSON.stringify(mockData))    
//   return (
//     <div style={{ height: 300, width: '100%' }}>
//       <DataGrid rows={rows} columns={columns} />
//     </div>
//   );
// }