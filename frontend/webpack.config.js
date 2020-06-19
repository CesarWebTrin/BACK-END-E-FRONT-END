const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer:{
        contentBase: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                exclude:  /node_modules/,
                use:[
                    {loader: 'style-loader'}, // recolher o css loader interpretado e injetar no html
                    {loader: 'css-loader'},// vai conseguir ler o arquivo css e importar esses arquivos lá dentro
                ]
            },
            {
                test: /.*\.(gif|png|jpe?g)$/i,
                use:{
                    loader: 'file-loader',
                }            
            }
        ]
    },
};