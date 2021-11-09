import React, { Component, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import download from 'js-file-download';
import FileViewer from 'react-file-viewer';

import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import { Doughnut } from 'react-chartjs-2';
import { getFilenameAndExtension } from 'app/utils';


export const ShowRecommendations1 = ({ general }) => {

    const [loading, setLoading] = useState(false);
    const [showResume, setshowResume] = useState(false);
    const [DocumentURL, setDocumentURL] = useState('');
    const [ValidEmailId, setValidEmailId]= useState('');
    const validEmail=(str)=>{
        const regx= /([A-Za-z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+)/gi;;
        if(str.match(regx)){
            let e=str.match(regx);
            return e[0]
        }
        return false;
    }
    useEffect(()=>{
        let data=validEmail(general.candidate_email_id);
        setValidEmailId(data);

    },[])
    function transformText(text) {
        let finalText = ''
        let atleastone = false
        let experience
        if (text.includes('Developer')) {
            atleastone = true
            finalText = finalText + 'Developer'
        }
        if (text.includes('Architect')) {
            atleastone = true
            finalText = finalText + 'Architect'
        }
        if (atleastone) {
            finalText = 'Candidate is ' + 'Developer' + ' with '

        }
        finalText = `${finalText} ${general['Years of Experience']} ${Number(general['Years of Experience']) > 1 ? 'years' : 'year'} experience.`
        return finalText
    }

    function extensionRemovedFileName(text) {
        // console.log('extensionRemovedFileName')
        // console.log(text)
        //  console.log(getFilenameAndExtension(text))

        return text.replaceAll('.' + getFilenameAndExtension(text)[1], '')

    }

    function extractFileNamefromGCURI(text) {
        // console.log('extensionRemovedFileName')
        // console.log(text)
        // console.log(getFilenameAndExtension(text))

        // "2021-10-19 03:14:05|Alexander_Mills.resume.2019.pdf"
        console.log(text.replaceAll('gs://irekommend-sai-resumes/irekommend-sai-resumes/', ''))
        return text.replaceAll('gs://irekommend-sai-resumes/irekommend-sai-resumes/', '')

    }

    function onError(e) {
        console.log(e);
    }

    function resumeDownload() {
        setLoading(true)
        axios('https://us-central1-jobsage-sai-ui-firebase-001.cloudfunctions.net/downloadResumefromGC', {
            method: "POST",
            responseType: "blob",
            data: {
                fileName: extractFileNamefromGCURI(general['GS_URI_Actual_Resume_Location']),
            }
        })
            .then(resp => {

                download(resp.data, general['Resume_Name']);
                setLoading(false)
            })
            .catch(err => {
                console.log('error in downloading remote file')
                console.log(err)
            });
    }

    function viewResume() {
        setLoading(true)

        axios('https://us-central1-jobsage-sai-ui-firebase-001.cloudfunctions.net/downloadResumefromGC', {
            method: "POST",
            responseType: "blob",
            data: {
                fileName: extractFileNamefromGCURI(general['GS_URI_Actual_Resume_Location']),
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
                                            <Button size="small" aria-label="Add to favorites" color="inherit">

                                                {general.candidate_name && general.candidate_name != 'None' ? general.candidate_name : extensionRemovedFileName(general.Resume_Name)}

                                            </Button>

                                            <Button size="small" onClick={resumeDownload} aria-label="Add to favorites" color="inherit">
                                                <Icon className="text-16 mx-4" color="inherit">
                                                    downloading
                                                </Icon>
                                                DOWNLOAD RESUME
                                            </Button>
                                            <Button size="small" onClick={viewResume} aria-label="Add to favorites" color="inherit">
                                                <Icon className="text-16 mx-4" color="inherit">
                                                    view
                                                </Icon>
                                                {showResume ? 'Hide Resume' : 'View Resume'}
                                            </Button>
                                            {
                                                general.is_Open_in_LinkedIn == '1' ?

                                                    <>
                                                        <Button size="small" className="ml-8" style={{color:"#17D7A0"}}>
                                                            <Icon className="text-16 mx-4" color="inherit">
                                                            check_circle
                                                            </Icon>
                                                            Ready To Work
                                                        </Button>
                                                    </>

                                                    :
                                                    <>
                                                        <Button size="small" className="ml-8" style={{color:"#FFF9B6"}}>
                                                            <Icon className="text-16 mx-4" color="inherit">
                                                            error_outline
                                                            </Icon>
                                                            Unready To Work
                                                        </Button>
                                                    </>


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
                                                filePath={DocumentURL}
                                                // errorComponent={CustomErrorComponent}
                                                onError={onError}
                                            />
                                        </div>
                                    }

                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-18">Why this Candidate?</Typography>

                                        <div className="ml-16">
                                            <Typography className="font-bold">{general['Common Personas'] && transformText(general['Common Personas'])}</Typography>
                                            {general['Common Skills'].replaceAll(/developer/ig, '') &&
                                                <div>
                                                    <Typography className="font-bold inline">Candidate has experience in </Typography>
                                                    <Typography className="ml-4 text-18 inline">
                                                        {general['Common Skills'].replaceAll(/developer/ig, '')}
                                                    </Typography>
                                                    <Typography className="font-bold">Relevant Skills for job: {general['Common Skills'].replaceAll(/developer/ig, '')}</Typography>
                                                </div>
                                            }
                                            <Paper elevation={0} className="mt-16">
                                                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                    {general.current_company &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Typography className="font-bold inline">Current Company: </Typography>
                                                            <Typography className="inline">{general.current_company} </Typography>
                                                        </Grid>
                                                    }
                                                    {general.job_title_current &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Typography className="font-bold inline">Job Tittle: </Typography>
                                                            <Typography className="inline">{general.job_title_current}</Typography>
                                                        </Grid>
                                                    }
                                                    {general.DOJ_current_company &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Typography className="font-bold inline">Role starting date: </Typography>
                                                            <Typography className="inline">{general.DOJ_current_company}</Typography>
                                                        </Grid>
                                                    }
                                                    {general.Processed_Date &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Typography className="font-bold inline">Processing Date: </Typography>
                                                            <Typography className="inline">{general.Processed_Date}</Typography>
                                                        </Grid>
                                                    }
                                                    {general.candidate_location &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Typography className="inline">{general.candidate_location}</Typography>
                                                            <Icon className="text-16 mx-4 inline align-middle" color="action">
                                                                location_on
                                                            </Icon>
                                                        </Grid>
                                                    }
                                                    {general.candidate_phone_no &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Icon className="text-16 mx-4 inline align-middle" color="action">
                                                                phone
                                                            </Icon>
                                                            <Typography className="ml-4 inline">{general.candidate_phone_no}</Typography>
                                                        </Grid>
                                                    }
                                                    {ValidEmailId &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Icon className="text-16 mx-4 inline align-middle" color="action">
                                                                email
                                                            </Icon>

                                                            <Typography className="inline">{ValidEmailId}</Typography>
                                                        </Grid>
                                                    }

                                                    {
                                                        general.LinkedIn_link && general.LinkedIn_link != 'None'
                                                        &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Typography className="font-bold inline">linkedIn: </Typography>
                                                            <a href={general.LinkedIn_link} target="_blank" rel="noreferrer noopener">
                                                                <Typography className="inline">{general.LinkedIn_link}</Typography>
                                                            </a>
                                                        </Grid>
                                                    }

                                                    {
                                                        general.Github_link
                                                        &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Typography className="font-bold inline">Github Link: </Typography>
                                                            <a href={general.Github_link} target="_blank" rel="noreferrer noopener">
                                                                <Typography className="inline">{general.Github_link}</Typography>
                                                            </a>
                                                        </Grid>
                                                    }
                                                </Grid>
                                            </Paper>
                                        </div>

                                    </div>

                                    {/* {general['Years of Experience'] > 0 ? <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Years of Experience</Typography>
                                        <Typography>{general['Years of Experience']}</Typography>
                                    </div> : <div></div>
                                    } */}

                                    {/* {
                                        general.Github_link
                                        &&
                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Github Link</Typography>
                                            <Typography>{general.Github_link}</Typography>
                                        </div>
                                    } */}

                                    {/* {
                                        general.LinkedIn_link && general.LinkedIn_link != 'None'
                                        &&
                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">LinkedIn Link</Typography>
                                            <Typography>{general.LinkedIn_link}</Typography>
                                        </div>
                                    } */}

                                    {/* {
                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Current Employment Details</Typography>
                                            {general.current_company && <Typography>Current Company: {general.current_company}</Typography>}
                                            {general.DOJ_current_company && <Typography>Date of recent Join: {general.DOJ_current_company}</Typography>}
                                            {general.job_title_current && <Typography>Job Title in current/previous Company: {general.job_title_current}</Typography>}
                                            {general.work_experience_details && <Typography>Work Experience: {general.work_experience_details}</Typography>}
                                        </div>
                                    } */}

                                    {/* {general.education_details && general.education_details != 'None' &&
                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Education Details</Typography>
                                            <Typography>Education Details: {general.education_details}</Typography>
                                        </div>
                                    } */}

                                    {/* <div className="flex-row">
                                        <div className="p-2">        {
                                            general.candidate_location && <div className="mb-24">
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
                                    </div> */}
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
