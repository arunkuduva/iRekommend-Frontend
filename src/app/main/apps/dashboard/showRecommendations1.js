import React, { Component }  from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
// import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import Toolbar from '@material-ui/core/Toolbar';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Doughnut } from 'react-chartjs-2';

import { getFilenameAndExtension } from 'app/utils';


export const  ShowRecommendations1 = ({general})  => {


    function transformText(text){
        let  finalText =''
        let atleastone = false
        let experience 
        if (text.includes('Developer'))
        {
            atleastone = true
            finalText = finalText + 'Developer'
        }
        if (text.includes('Architect'))
        {
            atleastone = true
            finalText = finalText + 'Architect'
        }
        if (atleastone){
            finalText = 'Candidate is a ' + 'Developer' + '. '
            
        }
        finalText = finalText + 'Candidate has experience on ' +  text.replaceAll('Developer,','') 
        return finalText
    }

    function extensionRemovedFileName(text){
        // console.log('extensionRemovedFileName')
        // console.log(text)
        // console.log(getFilenameAndExtension(text))

       return text.replaceAll('.'+getFilenameAndExtension(text)[1],'') 

    }
                return (
                    <div>
                 {general['Relevancy_Score'] > 0 && general['Common Skills'] && general['Common Personas'] ? 
                    <div className="p-24 md:flex max-w-2xl">
                        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">

                            <FuseAnimateGroup
                                    enter={{
                                        animation: 'transition.slideUpBigIn'
                                    }}
                                >

                        <Card className="w-full mb-16 rounded-8 shadow">
                            <AppBar position="static" elevation={0}>
                                <Toolbar className="px-8">
                                    <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                       <a href="https://ai.irekommend.com/login" target="_blank">{extensionRemovedFileName(general.Resume_Name)}</a>
                                    </Typography>

                                    <Button size="small" aria-label="Add to favorites" color="inherit">
									<Icon className="text-16" >
										like
									</Icon>
                                    
									<Typography className="normal-case mx-4">Like</Typography>
									<Typography className="normal-case">(109)</Typography>
								    </Button>

                                    <Button aria-label="Share" color="inherit">
									<Icon className="text-16" color="white">
										share
									</Icon>
									<Typography className="normal-case mx-4">Share</Typography>
									<Typography className="normal-case">(10)</Typography>
								</Button>


                                <Button aria-label="Share" color="inherit">
									<Icon className="text-16" color="white">
										email
									</Icon>
									<Typography className="normal-case mx-4">email</Typography>
									<Typography className="normal-case">(10)</Typography>
								</Button>


                                </Toolbar>
                            </AppBar>

                            <CardContent>
                                {/* <div className="mb-24">
                                    <Typography className="font-bold mb-4 text-15">File Name</Typography>
                                    <Typography>{general.Resume_Name}</Typography>
                                </div> */}

                                {/* <div className="mb-24">
                                    <Typography className="font-bold mb-4 text-15">Relevacy Score</Typography>
                                    <Typography>{general.Relevancy_Score}</Typography>
                                </div> */}

                                <div className="mb-24">
                                    <Typography className="font-bold mb-4 text-15">Why this Candidate?</Typography>

                                    {/* {general.locations.map(location => (
                                        <div className="flex items-center" key={location}>
                                            <Typography>{location}</Typography>
                                            <Icon className="text-16 mx-4" color="action">
                                                location_on
                                            </Icon>
                                         </div>
                                    ))} */}

                                    {/* <Typography>Candidate is a {general['Common Personas']} with experience in  {general['Common Personas']}. Candidate has following skill(s) : {general['Common Skills']} </Typography> */}
                                    
                                    <Typography>
                                            {general['Common Personas'] && transformText(general['Common Personas'])}. 
                                            {general['Common Skills'].replaceAll(/developer/ig, '') && <div>

                                                Candidate has following skill(s) : {general['Common Skills'].replaceAll(/developer/ig, '')}
                                            </div> }
                                                
                                    </Typography>
                                
                                </div>

                               {general['Years of Experience'] > 0 ? <div className="mb-24">
                                    <Typography className="font-bold mb-4 text-15">Years of Experience</Typography>
                                    <Typography>{general['Years of Experience']}</Typography>
                                </div> : <div></div>
                                } 

                                <div className="mb-24">
                                    <Typography className="font-bold mb-4 text-15">Github Link</Typography>
                                    <Typography>{general.Github_link}</Typography>
                                </div>

                                {/* <div className="h-400 w-full p-32">


                                        <Doughnut
                                            data={{
                                                labels: ['amgular','vue'],
                                                datasets: widget.mainChart.datasets[currentRange]
                                            }}
                                            options={widget.mainChart.options}
                                        />
                                </div> */}
                            </CardContent>
                        </Card>	

                            </FuseAnimateGroup>

                        </div>	
                        </div> 
                        
                        : 
                        
                        <div></div>}
                    </div>
                    
                    
                )
                    
};
