import axios from 'axios';

export function getFilenameAndExtension(pathfilename){
    const filenameextension = pathfilename.replace(/^.*[\\\/]/, '');
    const filename = filenameextension.substring(0, filenameextension.lastIndexOf('.'));
    const ext = filenameextension.split('.').pop();
  
    return [filename, ext];
}

export function emailExistence(email) {
    return new Promise((resolve, reject) => {
        axios
            .get('https://arcane-plateau-67676.herokuapp.com/email/existence', { params: { email } })
            .then(response => { 
                const isExistence = response.data;																												
                resolve(isExistence);
            }).catch((err) => {					
                resolve(false);
            })
    });	
}