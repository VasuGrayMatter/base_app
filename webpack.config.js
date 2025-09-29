const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  mode: 'production',
  output: { 
    publicPath: 'auto',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  resolve: { extensions: ['.js', '.jsx'] },
  module: { 
    rules: [
      { 
        test: /\.jsx?$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ 
      }, 
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ] 
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'base_app',
      filename: 'remoteEntry.js',
      remotes: {
        mfe_food: 'mfe_food@https://mic1.netlify.app/remoteEntry.js',
        mfe_events: 'mfe_events@https://mic2.netlify.app/remoteEntry.js',
        mfe_cab: 'mfe_cab@https://mic3.netlify.app/remoteEntry.js',
        mfe_hotel: 'mfe_hotel@https://mic4.netlify.app/remoteEntry.js',
        mfe_cart: 'mfe_cart@https://mic5.netlify.app/remoteEntry.js'
      },
      exposes: {
        './CartSlice': './src/redux/cartSlice.js',
        './UserSlice': './src/redux/userSlice.js',
        './ReduxStore': './src/redux/store.js'
      },
      shared: { 
        react: { 
          singleton: true, 
          requiredVersion: false,
          eager: false
        }, 
        'react-dom': { 
          singleton: true, 
          requiredVersion: false,
          eager: false
        }, 
        'react-redux': { 
          singleton: true, 
          requiredVersion: false,
          eager: false
        }, 
        '@reduxjs/toolkit': { 
          singleton: true, 
          requiredVersion: false,
          eager: false
        } 
      }
    }),
    new HtmlWebpackPlugin({ 
      template: path.resolve(__dirname, 'public', 'index.html'),
      // Add these for better standalone support
      minify: true,
      inject: true
    })
  ],
  
  // Add optimization for better standalone builds
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  }
};
