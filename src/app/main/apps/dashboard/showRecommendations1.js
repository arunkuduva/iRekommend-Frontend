import React, { Component,useState }  from 'react';
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
import axios from 'axios'
import download from 'js-file-download';
import FileViewer from 'react-file-viewer';

import DocViewer, { DocViewerRenderers } from "react-doc-viewer";


import { Doughnut } from 'react-chartjs-2';


import { getFilenameAndExtension } from 'app/utils';


export const  ShowRecommendations1 = ({general})  => {

    const [loading, setLoading] = useState(false);
    const [showResume, setshowResume] = useState(false);

    const [DocumentURL, setDocumentURL] = useState('')
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
       //  console.log(getFilenameAndExtension(text))

       return text.replaceAll('.'+getFilenameAndExtension(text)[1],'') 

    }

    function extractFileNamefromGCURI(text){
        // console.log('extensionRemovedFileName')
        // console.log(text)
        // console.log(getFilenameAndExtension(text))

      // "2021-10-19 03:14:05|Alexander_Mills.resume.2019.pdf"
        console.log(text.replaceAll('gs://irekommend-sai-resumes/irekommend-sai-resumes/' ,''))
       return text.replaceAll('gs://irekommend-sai-resumes/irekommend-sai-resumes/' ,'') 

    }

    function onError(e) {
    console.log(e );
    }

    function resumeDownload(){
        setLoading(true)
        axios( 'https://us-central1-jobsage-sai-ui-firebase-001.cloudfunctions.net/downloadResumefromGC', {
            method: "POST",
            responseType: "blob",
            data : {fileName : extractFileNamefromGCURI(general['GS_URI_Actual_Resume_Location'] ),
                     }
    })
        .then(resp => {

                download(resp.data,general['Resume_Name']);
                setLoading(false)
        })
        .catch(err => {
          console.log('error in downloading remote file')
           console.log(err)
        });
    }

    function viewResume  (){
        setLoading(true)
        
        axios( 'https://us-central1-jobsage-sai-ui-firebase-001.cloudfunctions.net/downloadResumefromGC', {
            method: "POST",
            responseType: "blob",
            data : {fileName : extractFileNamefromGCURI(general['GS_URI_Actual_Resume_Location'] ),
                     }
      //Force to receive data in a Blob Format
    })
        // axios.post('https://us-central1-jobsage-sai-ui-firebase-001.cloudfunctions.net/downloadResumefromGC', 
        // {fileName : extractFileNamefromGCURI(general['GS_URI_Actual_Resume_Location'] ),
        //  responseType: 'blob',
        // })
        .then(resp => {

              //  download(resp.data,general['Resume_Name']);
                
                 const file = new Blob([resp.data], {
                                       type: "application/pdf"
                                                    });
                // //Build a URL from the file
                 const fileURL = URL.createObjectURL(file);
                 setDocumentURL(fileURL)
                 setshowResume(!showResume)
                // //Open the URL on new Window
               //  window.open(fileURL);
            //this.setState({status: ''});

            setLoading(false)
        })
        .catch(err => {
          console.log('error in downloading remote file')
           console.log(err)
        });
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
                                       {/* <a href="https://ai.irekommend.com/login" target="_blank">{extensionRemovedFileName(general.Resume_Name)}</a> */}
                                                    <Button size="small"  aria-label="Add to favorites" color="inherit">
                                                   
                                                       {general.candidate_name && general.candidate_name != 'None' ? general.candidate_name : extensionRemovedFileName(general.Resume_Name)}
                                                   
                                                    </Button>
                                                    {general['GS_URI_Actual_Resume_Location'] && 
                                                    <div>
                                                        <Button size="small" onClick = {resumeDownload} aria-label="Add to favorites" color="inherit">
                                                        <Icon className="text-16 mx-4" color="inherit">
										            	downloading
										                </Icon>
                                                        DOWNLOAD RESUME
                                                    </Button>
                                                    <Button size="small" onClick = {viewResume} aria-label="Add to favorites" color="inherit">
                                                        <Icon className="text-16 mx-4" color="inherit">
                                                            view
										                </Icon>
                                                        {showResume ?  'Hide Resume' : 'View Resume' }
                                                    </Button>
                                                    </div>}
                                                    
                                                    
                                                    {
                                                        general.is_Open_in_LinkedIn == '-1' ? 
                                                        
                                                        <div>
                                                            <Button size="large"  color="green" backgroundColor = "white">
                                                                <Icon className="text-16 mx-4" color="inherit">
                                                                correct
                                                                </Icon>
                                                                Ready To Work
                                                            </Button>
                                                        </div>
                                                        

                                                        : 
                                                        <div></div>

                                                    }
                                                    {
                                                      loading &&  
                                                    <Icon className="text-16 mx-4" color="inherit">
										            	spinner
										            </Icon>
                                                    }
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <CardContent>
                                
                                {showResume && 
                                // <DocViewer 
                                // //sandbox="allow-same-origin allow-scripts allow-popups allow-forms" 
                                // pluginRenderers={DocViewerRenderers} 
                                // documents={[{uri: require( './elasticsearch.pdf')}]} 
                                // config={{
                                //         header: {
                                //             disableHeader: false,
                                //             disableFileName: false,
                                //             retainURLParams: false
                                //         }}}
                                // />
                                <div style={{ height: '500px' }}>
                                <FileViewer
                                    fileType={getFilenameAndExtension(general.Resume_Name)[1]}
                                // filePath={require( './ArunPremSkillSet.pdf')}
                                    filePath = {DocumentURL}
                                   // errorComponent={CustomErrorComponent}
                                    onError={onError}
                                />
                                </div>
                                }

                                <div className="mb-24">
                                    <Typography className="font-bold mb-4 text-15">Why this Candidate?</Typography>

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

                                {
                                    general.Github_link
                                        && 
                                        <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Github Link</Typography>
                                        <Typography>{general.Github_link}</Typography>
                                </div>
                                }

                                {
                                    general.LinkedIn_link && general.LinkedIn_link != 'None' 
                                        && 
                                        <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">LinkedIn Link</Typography>
                                        <Typography>{general.LinkedIn_link}</Typography>
                                </div>
                                }

                                {
                                <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Current Employment Details</Typography>
                                        {general.current_company && <Typography>Current Company: {general.current_company}</Typography>}
                                        {general.DOJ_current_company && <Typography>Date of recent Join: {general.DOJ_current_company}</Typography>}
                                        {general.job_title_current && <Typography>Job Title in current/previous Company: {general.job_title_current}</Typography>}
                                        {general.work_experience_details && <Typography>Work Experience: {general.work_experience_details}</Typography>}
                                </div>
                                }

                                { general.education_details && general.education_details!= 'None' &&
                                <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Education Details</Typography>
                                        <Typography>Education Details: {general.education_details}</Typography>
                                </div>
                                }

                            <div className="flex-row"> 
                                                <div className="p-2">        {
                                                        general.candidate_location &&  <div className="mb-24">
                                                    <Typography className="font-bold mb-4 text-15">Locations</Typography>
                                                    <div className="flex items-center" >
                                                            <Typography>{general.candidate_location}</Typography>
                                                            <Icon className="text-16 mx-4" color="action">
                                                                location_on
                                                            </Icon>
                                                        </div>
                                                    </div>
                                                    }

                                                    {
                                                        general.location_preference &&  
                                                    <div className="mb-24">
                                                    <Typography className="font-bold mb-4 text-15">Location Preference</Typography>
                                                    <div className="flex items-center" >
                                                            <Typography>{general.location_preference}</Typography>
                                                            <Icon className="text-16 mx-4" color="action">
                                                                location_on
                                                            </Icon>
                                                        </div>
                                                    </div>
                                                    }   
                                                    </div> 
                            
                                
                            <div className="p-2">
                                {general.candidate_phone_no &&
                                    <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Contact</Typography>
                                    <div className="flex items-center" >
										
										<Icon className="text-16 mx-4" color="action">
											phone
										</Icon>
                                        <Typography>{general.candidate_phone_no}</Typography>
									</div>

                                    <div className="flex items-center" >
										
										<Icon className="text-16 mx-4" color="action">
											email
										</Icon>

                                        <Typography>{general.candidate_email_id}</Typography>
									</div>

								</div>
                                }
                            </div>
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
