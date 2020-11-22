import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const Container = styled.div`
height: 20px;
width: 80%;
position: relative;

`;

const BaseBox = styled.div`
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 3px;
    transition: width 0.1s ease-in-out;
`;

const Background = styled(BaseBox)`
    background: grey;
    width: 100%;
`;

const Progress = styled(BaseBox)`
    background: lime;
    width: ${({ percent }) => percent}%;
    text-align:center;
    color:blue;
`;

export default class ProgressBar extends Component {
    static propTypes = {
        // id:PropTypes.string,
        percent: PropTypes.number.isRequired,
        // shopItem: PropTypes.object,
        // amount: PropTypes.number,
        // productName: PropTypes.string,
        // price : PropTypes.number,
    }
    static defaultProps = {
        percent: 0,
        // productName:'empty',
        // price:0,
        // id:'null',
    };
    render() {
        //console.log('ProgressBar.jsx-->', this.props.percent)
        return (
            <div>
                <Container>
                    <Background />
                    <Progress percent={this.props.percent}>{this.props.percent}%</Progress>
                </Container>
            </div>
        )
    }
}
