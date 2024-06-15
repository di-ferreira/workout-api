// import exe from '@angablue/exe';
// import * as exe from '@angablue/exe';
const exe = require('@angablue/exe')

const build = exe({
    entry: './bin/app.js',
    out: './build/Server.exe',
    pkg: ['-C', 'GZip'], // Specify extra pkg arguments
    version: '2.4.2',
    target: 'latest-win-x64',
    // icon: './assets/icon.ico', // Application icons must be in .ico format
    properties: {
        FileDescription: 'Server Bot',
        ProductName: 'Server App',
        LegalCopyright: 'DiFerreira https://di-ferreira.github.io/',
        OriginalFilename: 'Server App.exe'
    }
});

build.then(() => console.log('Build completed!'));