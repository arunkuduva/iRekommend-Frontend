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
import { indexOf } from 'lodash';
import { doc } from 'prettier';


export const ShowRecommendations1 = ({ general }) => {

    const [loading, setLoading] = useState(false);
    const [showResume, setshowResume] = useState(false);
    const [DocumentURL, setDocumentURL] = useState('');
    const [ValidEmailId, setValidEmailId] = useState('');
    const [isDoc, setIsDoc] = useState(false);
    const [docsUrl, setDocsUrl] = useState('');

    const validEmail = (str) => {
        const regx = /([A-Za-z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+)/gi;;
        if (str.match(regx)) {
            let e = str.match(regx);
            return e[0]
        }
        return false;
    }

    const gitHubLink = (link) => {
        if (link.includes(',')) {
            return link.substring(0, link.indexOf(','));
        }
        return link;
    }

    useEffect(() => {
        let data = validEmail(general.candidate_email_id);
        setValidEmailId(data);

    }, [])

    // useEffect(() => {
    //     let docs = [
    //         { uri: DocumentURL }
    //     ]
    //     console.log(docs, 'check');
    //     setDocsUrl(doc);

    // }, [showResume])

    function transformText(text) {
        let finalText = ''
        if (text.includes('Developer')) {
            finalText = `Candidate is Developer`
        }
        if (text.includes('Architect')) {
            finalText = `Candidate is Architect`
        }

        if (Number(general['Years of Experience'])) {
            finalText = `${finalText} with ${general['Years of Experience']} ${Number(general['Years of Experience']) > 1 ? 'years' : 'year'} experience.`
        }
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
                console.log('deb here', resp.data)

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
            { 1==1 ? //general['Relevancy_Score'] > 0 && general['Common Skills'] && general['Common Personas'] ?
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
                                                        <Button size="small" className="ml-8" style={{ color: "#17D7A0" }}>
                                                            <Icon className="text-16 mx-4" color="inherit">
                                                                check_circle
                                                            </Icon>
                                                            Ready To Work
                                                        </Button>
                                                    </>

                                                    :
                                                    <></>

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
                                            {console.log()}
                                            <FileViewer
                                                fileType={getFilenameAndExtension(general.Resume_Name)[1]}
                                                // filePath={require( './ArunPremSkillSet.pdf')}
                                                filePath={DocumentURL}
                                                // errorComponent={CustomErrorComponent}
                                                onError={onError}
                                            />
                                            {/* <DocViewer pluginRenderers={DocViewerRenderers} documents={docsUrl} /> */}
                                        </div>
                                    }

                                    <div className="mb-24">
                                        <div className="flex" style={{marginTop: '-5px'}}>
                                            <div className="flex-none"></div>
                                            <div class="flex-grow ">
                                            </div>

                                            {
                                                general.Processed_Date && <div className="flex-none">
                                                    <Typography className="font-bold inline">Upload Date: </Typography>
                                                    <Typography className="inline">{general.Processed_Date.substring(0, general.Processed_Date.indexOf(' '))}</Typography>
                                                </div>
                                            }
                                        </div>
                                        <Typography className="font-bold mb-4 text-18">Why this Candidate?</Typography>

                                        <div className="ml-16">
                                                <Typography className="font-bold mb-8 flex-none md:block">{general['Common Personas'] && transformText(general['Common Personas'])}</Typography>

                                            {general['Common Personas'].replaceAll(/developer/ig, '') &&
                                                <>
                                                    <Typography className="font-bold inline">Candidate has experience in </Typography>
                                                    <Typography className="ml-4 font-bold inline">
                                                        {general['Common Personas'].replaceAll(/developer,/ig, '')}
                                                    </Typography>
                                                </>
                                            }
                                            {
                                                general['Common Skills'].replaceAll(/developer/ig, '') &&
                                                <Typography className="font-bold my-4">Relevant Skills for job:
                                                    <Typography className="inline pl-8 font-bold" >{general['Common Skills'].replaceAll(/developer,/ig, '')}</Typography>
                                                </Typography>

                                            }
                                            < Paper elevation={0} className="mt-16">
                                                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                    {general.current_company &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Typography className="inline font-bold">Current Company: </Typography>
                                                            <Typography className="inline font-bold">{general.current_company} </Typography>
                                                        </Grid>
                                                    }
                                                    {general.job_title_current &&
                                                        <Grid item xs={12} sm={6} md={4} >
                                                            <Typography className="inline font-bold">Job Tittle: </Typography>
                                                            <Typography className="inline font-bold">{general.job_title_current}</Typography>
                                                        </Grid>
                                                    }
                                                    {general.DOJ_current_company &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Typography className="font-bold inline">Role starting date: </Typography>
                                                            <Typography className="inline">{general.DOJ_current_company}</Typography>
                                                        </Grid>
                                                    }
                                                    {/* {general.Processed_Date &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Typography className="font-bold inline">Processing Date: </Typography>
                                                            <Typography className="inline">{general.Processed_Date.substring(0, general.Processed_Date.indexOf(' '))}</Typography>
                                                        </Grid>
                                                    } */}
                                                    {general.candidate_location &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Typography className="font-bold inline text-13">{general.candidate_location}</Typography>
                                                            <Icon className="mx-4 inline align-middle font-bold text-16" color="action">
                                                                location_on
                                                            </Icon>
                                                        </Grid>
                                                    }
                                                    {general.candidate_phone_no &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Icon className="font-bold text-16 mx-4 inline align-middle" color="action">
                                                                phone
                                                            </Icon>
                                                            <Typography className="font-bold ml-4 inline">{general.candidate_phone_no}</Typography>
                                                        </Grid>
                                                    }
                                                    {general.candidate_email_id &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Icon className="text-16 font-bold mx-4 inline align-middle" color="action">
                                                                email
                                                            </Icon>

                                                            <Typography className="inline cursor-pointer font-bold" onClick={() => {
                                                                navigator.clipboard.writeText(general.candidate_email_id);
                                                            }}>{general.candidate_email_id}</Typography>
                                                        </Grid>
                                                    }

                                                    {
                                                        general.LinkedIn_link && general.LinkedIn_link != 'None'
                                                        &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Typography className="font-bold inline cursor-pointer" onClick={() => {
                                                                window.open(general.LinkedIn_link)
                                                            }}>LinkedIn</Typography>
                                                        </Grid>
                                                    }

                                                    {
                                                        general.Github_link
                                                        &&
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Typography className="font-bold inline cursor-pointer" onClick={() => {
                                                                window.open(gitHubLink(general.Github_link))
                                                            }}>Github Link</Typography>
                                                        </Grid>
                                                    }
                                                </Grid>
                                            </Paper>
                                        </div>

                                    </div>
                                </CardContent>
                            </Card>

                        </FuseAnimateGroup>

                    </div>

                </div>

                :

                <div></div>}
        </div >


    )

};