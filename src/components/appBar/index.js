import React, { Component } from 'react';
import Page from './page';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import findSuggestions from '../../redux/actions/findSuggestions'
import findResults     from '../../redux/actions/findResults';
import findCurrentItem from '../../redux/actions/findCurrentItem';

class IAppBar extends Component {  
    
    state = {  
       text:''
    }
    
    onChangeText = (text) => {
       this.setState({ text })
       this.props.findSuggestions(text);
    }

    onChangeSelection = (text) => {      
      this.setState({ text })      
      this.props.findResults(text);
      this.props.history.push('/results')
    }

    goTo = (path) => {
      this.props.history.push(path);
    }

    render() {
        const { text }  = this.state;
        const { suggestions  } = this.props;                   
        return (
           <Page
              text={text}
              suggestions={suggestions}  
              onChangeText={this.onChangeText}
              onChangeSelection={this.onChangeSelection}
              findCurrentItem={this.findCurrentItem}             
              goTo={this.goTo} 
           /> 
        );
    }
}
//conectar estado con redux
const mapStateToProps = state => {
    return{
      suggestions: state.suggestions,
    }
}
//conectar acciones con redux
const mapDispatchToProps = {
   findSuggestions,
   findCurrentItem,
   findResults
}

export default withRouter(
               connect(mapStateToProps,mapDispatchToProps)(IAppBar)
               )
